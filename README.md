# VS Code Markdown View

- 基于 VS Code 默认 Markdown 样式
- VS Code Markdown 字体设置对本插件有效
- 可预览 HTML（Markdown 样式对 HTML 内容生效）

## 安装

从代码打包安装：

```bash
pnpm install
```

```bash
pnpm vsce package --no-dependencies
```

在 VS Code 扩展面板菜单中选择“从 VSIX 安装...”。

## 扩展语法

Todo List:

```markdown
- [x] Do something
- [ ] Do something else
```

GitHub 提示框:

```markdown
> [!NOTE]
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]
> Crucial information necessary for users to succeed.

> [!WARNING]
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.
```

正则表达式可视化:

<pre>
<code>
```regulex
.*[^=](?==)
```
</code>
</pre>

## Libraries

- [unified](https://github.com/unifiedjs/unified)
- [reamrk](https://github.com/remarkjs)
- [rehype](https://github.com/rehypejs)
- [highlight.js](https://github.com/highlightjs/highlight.js)
- [regulex](https://github.com/CJex/regulex)
- [katex](https://github.com/KaTeX/KaTeX)
