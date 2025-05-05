// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { debounce } from "lodash"
import rehypeKatex from "rehype-katex"
import rehypeRaw from "rehype-raw"
import rehypeStringify from "rehype-stringify"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"
import vscode from "vscode"
import rehypeImage from "./plugin/rehype-image.mjs"
import remarkAlert from "./plugin/remark-alert.mjs"
import remarkHighlight from "./plugin/remark-highlight.mjs"
import remarkRegulex from "./plugin/remark-regulex.mjs"

// VS Code Default Markdown CSS
const cssPathUri = vscode.extensions.getExtension(
  "vscode.markdown-language-features"
)?.extensionUri

let template = `
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" type="text/css" href="{{markdownStyle}}">
  <link rel="stylesheet" type="text/css" href="{{extraStyle}}">
  <link rel="stylesheet" type="text/css" href="{{highlightStyle}}">
  <link rel="stylesheet" type="text/css" href="{{katexStyle}}">
  <script type="text/javascript" src="{{regulexLib}}"></script>
  <style>
    :root {
      --markdown-font-family: {{markdown-font}};
      --markdown-font-size: {{markdown-font-size}};
      --markdown-line-height: {{markdown-line-height}};
    }
  </style>
</head>
<body class="scrollBeyondLastLine">
<div class="markdown-body">
  {{markdown}}
</div>
<script>
window.addEventListener("DOMContentLoaded", () => {
  let parse = require("regulex").parse
  let visualize = require("regulex").visualize
  let Raphael = require("regulex").Raphael

  document.querySelectorAll(".regulex")?.forEach((e) => {
    try {
      let re = new RegExp(e.getAttribute("data-value"))
      let paper = Raphael(e.id, 0, 0)
      visualize(parse(re.source), getRegexFlags(re), paper)
    } catch (err) {
      e.innerHTML = err.message
    }
  })
})

function getRegexFlags(re) {
  let flags = ""
  flags += re.ignoreCase ? "i" : ""
  flags += re.global ? "g" : ""
  flags += re.multiline ? "m" : ""
  return flags
}
</script>
</body>
</html>
`

const separator = process.platform === "win32" ? "\\" : "/"
let currentFileName = ""
let panel: vscode.WebviewPanel | null = null

function markdownCompiler(): any {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkAlert)
    .use(remarkRegulex)
    .use(remarkHighlight)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeImage, { panel: panel! })
    .use(rehypeKatex)
    .use(rehypeStringify)
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  if (vscode.window.activeTextEditor?.document.languageId !== "markdown") {
    return
  }

  const disposable = vscode.commands.registerCommand(
    "markdown-view.preview",
    () => {
      start(context)
    }
  )

  context.subscriptions.push(disposable)
  start(context)
}

// This method is called when your extension is deactivated
export function deactivate() {}

function start(context: vscode.ExtensionContext) {
  if (panel === null) {
    createMarkdownView(context)
  }

  render(context)
  initEvent(context)
}

function initEvent(context: vscode.ExtensionContext) {
  vscode.workspace.onDidChangeTextDocument(
    debounce((e: vscode.TextDocumentChangeEvent) => {
      const ext = e.document.fileName.split(".").pop()
      if (ext === "md" || ext === "html") {
        render(context)
      }
    }, 300)
  )
  vscode.window.onDidChangeActiveTextEditor((editor) => {
    if (
      editor !== undefined &&
      currentFileName !== editor.document.fileName &&
      editor.document.languageId === "markdown"
    ) {
      if (panel === null) {
        createMarkdownView(context)
      }

      render(context)
      currentFileName = editor.document.fileName
    }
  })
}

function createMarkdownView(context: vscode.ExtensionContext) {
  panel = vscode.window.createWebviewPanel(
    "liveHTMLPreviewer",
    vscode.l10n.t("Preview {fileName}", {
      fileName: vscode.window.activeTextEditor?.document.fileName
        .split(separator)
        .pop()
    }),
    { viewColumn: vscode.ViewColumn.Beside, preserveFocus: true },
    {
      enableScripts: true,
      retainContextWhenHidden: true,
      localResourceRoots: [
        vscode.workspace.workspaceFolders![0].uri,
        context.extensionUri,
        cssPathUri!
      ]
    }
  )

  panel.iconPath = {
    light: vscode.Uri.joinPath(context.extensionUri, "media/preview-light.svg"),
    dark: vscode.Uri.joinPath(context.extensionUri, "media/preview-dark.svg")
  }

  panel.onDidDispose(
    () => {
      panel = null
    },
    null,
    context.subscriptions
  )
}

// 渲染 Markdown
async function render(context: vscode.ExtensionContext) {
  panel!.title = vscode.l10n.t("Preview {fileName}", {
    fileName: vscode.window.activeTextEditor?.document.fileName
      .split(separator)
      .pop()!
  })

  const ext = vscode.window.activeTextEditor?.document.fileName
    .split(separator)
    .pop()
    ?.split(".")
    .pop()

  // 读取 VS Code 内置 Markdown 配置
  const { fontFamily, fontSize, lineHeight } =
    vscode.workspace.getConfiguration("markdown.preview")

  const markdownStyle = panel!.webview.asWebviewUri(
    vscode.Uri.joinPath(cssPathUri!, "media/markdown.css")
  )
  const extraStyle = panel!.webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, "media/markdown.css")
  )
  const highlightStyle = panel!.webview.asWebviewUri(
    vscode.Uri.joinPath(cssPathUri!, "media/highlight.css")
  )
  const katexStyle = panel!.webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, "dist/assets/katex.min.css")
  )
  const regulexLib = panel!.webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, "dist/lib/regulex.js")
  )

  let content = ""

  if (ext === "md") {
    content = String(
      await markdownCompiler().process(
        vscode.window.activeTextEditor!.document.getText()
      )
    )
  }

  if (ext === "html") {
    // HTML 文档直接显示内容
    content = vscode.window.activeTextEditor!.document.getText()
  }

  panel!.webview.html = template
    .replace("{{markdown-font}}", fontFamily)
    .replace("{{markdown-font-size}}", fontSize)
    .replace("{{markdown-line-height}}", lineHeight)
    .replace("{{markdownStyle}}", markdownStyle.toString())
    .replace("{{extraStyle}}", extraStyle.toString())
    .replace("{{highlightStyle}}", highlightStyle.toString())
    .replace("{{katexStyle}}", katexStyle.toString())
    .replace("{{regulexLib}}", regulexLib.toString())
    .replace("{{markdown}}", content)
}
