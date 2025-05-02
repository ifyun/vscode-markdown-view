import { Root } from "hast"
import hljs, { HLJSApi, Language } from "highlight.js"
import { visit } from "unist-util-visit"

function reg(hljs: HLJSApi): Language {
  const ATTRIBUTE = {
    match: /.*[^=](?==)/,
    className: "attr"
  }

  const SECTION = {
    match: /^\[.*?\]$/,
    className: "built_in"
  }

  const COMMENT = {
    begin: /;/,
    end: /$/,
    className: "comment"
  }

  return {
    contains: [ATTRIBUTE, SECTION, COMMENT, hljs.QUOTE_STRING_MODE]
  }
}

hljs.registerLanguage("reg", reg)

export default function remarkHighlight() {
  return function (tree: Root) {
    visit(tree, "code", (node: any) => {
      if (
        !node.lang ||
        node.lang === "text" ||
        node.lang === "math" ||
        node.lang === "regulex"
      ) {
        return
      }

      try {
        const result = hljs.highlight(node.value, {
          language: node.lang
        })

        node.type = "html"
        node.value = `<pre><code class="hljs language-${node.lang}">${result.value}</code></pre>`
      } catch {
        return
      }
    })
  }
}
