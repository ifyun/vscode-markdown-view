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
import template from "./template.html?raw"

type Message = {
  command: string
  link: string
}

// VS Code Default Markdown CSS
const cssPathUri = vscode.extensions.getExtension(
  "vscode.markdown-language-features"
)?.extensionUri

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
export function deactivate() {
  panel?.dispose()
}

function start(context: vscode.ExtensionContext) {
  if (panel === null) {
    createMarkdownView(context)
  }

  render(context)
  initEvent(context)
}

// 注册事件
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
    { viewColumn: vscode.ViewColumn.Two, preserveFocus: true },
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

  panel.webview.onDidReceiveMessage(
    async (message: Message) => {
      if (message.command === "open") {
        const uri = vscode.Uri.parse("file:" + message.link)
        await vscode.commands.executeCommand("vscode.open", uri)
      }
    },
    null,
    context.subscriptions
  )

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
  const filePath =
    vscode.window.activeTextEditor?.document.fileName.split(separator)
  const fileName = filePath?.pop()
  const directory = filePath?.join("/")
  const ext = fileName?.split(".").pop()

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

  panel!.title = vscode.l10n.t("Preview {fileName}", { fileName })
  panel!.webview.html = template
    .replace("{{directory}}", directory!)
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
