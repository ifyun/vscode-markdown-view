const context = require("esbuild").context
const copy = require("esbuild-plugin-copy").copy
const raw = require("esbuild-raw-plugin").raw

const production = process.argv.includes("--production")
const watch = process.argv.includes("--watch")

/**
 * @type {import('esbuild').Plugin}
 */
const esbuildProblemMatcherPlugin = {
  name: "esbuild-problem-matcher",

  setup(build) {
    build.onStart(() => {
      console.log("[watch] build started")
    })
    build.onEnd((result) => {
      result.errors.forEach(({ text, location }) => {
        console.error(`✘ [ERROR] ${text}`)
        console.error(
          `    ${location.file}:${location.line}:${location.column}:`
        )
      })
      console.log("[watch] build finished")
    })
  }
}

async function main() {
  const ctx = await context({
    entryPoints: ["src/extension.mts"],
    bundle: true,
    format: "cjs",
    minify: production,
    sourcemap: !production,
    sourcesContent: false,
    platform: "node",
    outfile: "dist/extension.js",
    external: ["vscode"],
    logLevel: "silent",
    plugins: [
      esbuildProblemMatcherPlugin,
      raw(),
      copy({
        assets: [
          {
            from: ["node_modules/katex/dist/fonts/*"],
            to: ["assets/fonts"]
          },
          {
            from: ["node_modules/katex/dist/katex.min.css"],
            to: ["assets"]
          },
          {
            from: ["lib/*.js"],
            to: ["lib"]
          }
        ]
      })
    ]
  })
  if (watch) {
    await ctx.watch()
  } else {
    await ctx.rebuild()
    await ctx.dispose()
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
