import { Root } from "hast"
import { visit } from "unist-util-visit"

export default function () {
  return function (tree: Root) {
    visit(tree, "code", (node: any) => {
      if (!node.lang || node.lang !== "regulex") {
        return
      }

      node.type = "html"
      node.value = `<div id="regulex-${node.position.start.line}" class="regulex" data-value="${node.value}"></div>`
    })
  }
}
