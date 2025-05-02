import { Root } from "hast"
import path from "path"
import { visit } from "unist-util-visit"
import vscode from "vscode"

type Options = {
  panel: vscode.WebviewPanel
}

const separator = process.platform === "win32" ? "\\" : "/"

export default function rehypeImage(options: Options) {
  return function (tree: Root) {
    visit(tree, "element", (node) => {
      if (node.tagName !== "img") {
        return
      }

      const url = node.properties.src as string

      if (
        url.startsWith("http://") ||
        url.startsWith("https://") ||
        url.startsWith("/")
      ) {
        return
      }

      const filePath = vscode.window.activeTextEditor?.document.fileName!
      const folder = filePath.substring(0, filePath.lastIndexOf(separator))
      const imgPath = options.panel.webview.asWebviewUri(
        vscode.Uri.file(path.join(folder, url))
      )

      node.properties.src = imgPath.toString()
    })
  }
}
