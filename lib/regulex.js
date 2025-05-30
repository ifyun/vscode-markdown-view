var requirejs, require, define
if (
  ((function (t) {
    function e(t, e) {
      return v.call(t, e)
    }
    function r(t, e) {
      var r,
        n,
        a,
        i,
        s,
        o,
        c,
        h,
        u,
        l,
        f,
        p = e && e.split("/"),
        d = g.map,
        m = (d && d["*"]) || {}
      if (t && "." === t.charAt(0))
        if (e) {
          for (
            p = p.slice(0, p.length - 1),
              t = t.split("/"),
              s = t.length - 1,
              g.nodeIdCompat && y.test(t[s]) && (t[s] = t[s].replace(y, "")),
              t = p.concat(t),
              u = 0;
            u < t.length;
            u += 1
          )
            if ("." === (f = t[u])) t.splice(u, 1), (u -= 1)
            else if (".." === f) {
              if (1 === u && (".." === t[2] || ".." === t[0])) break
              u > 0 && (t.splice(u - 1, 2), (u -= 2))
            }
          t = t.join("/")
        } else 0 === t.indexOf("./") && (t = t.substring(2))
      if ((p || m) && d) {
        for (r = t.split("/"), u = r.length; u > 0; u -= 1) {
          if (((n = r.slice(0, u).join("/")), p))
            for (l = p.length; l > 0; l -= 1)
              if ((a = d[p.slice(0, l).join("/")]) && (a = a[n])) {
                ;(i = a), (o = u)
                break
              }
          if (i) break
          !c && m && m[n] && ((c = m[n]), (h = u))
        }
        !i && c && ((i = c), (o = h)),
          i && (r.splice(0, o, i), (t = r.join("/")))
      }
      return t
    }
    function n(e, r) {
      return function () {
        var n = x.call(arguments, 0)
        return (
          "string" != typeof n[0] && 1 === n.length && n.push(null),
          u.apply(t, n.concat([e, r]))
        )
      }
    }
    function a(t) {
      return function (e) {
        return r(e, t)
      }
    }
    function i(t) {
      return function (e) {
        p[t] = e
      }
    }
    function s(r) {
      if (e(d, r)) {
        var n = d[r]
        delete d[r], (m[r] = !0), h.apply(t, n)
      }
      if (!e(p, r) && !e(m, r)) throw new Error("No " + r)
      return p[r]
    }
    function o(t) {
      var e,
        r = t ? t.indexOf("!") : -1
      return (
        r > -1 && ((e = t.substring(0, r)), (t = t.substring(r + 1, t.length))),
        [e, t]
      )
    }
    function c(t) {
      return function () {
        return (g && g.config && g.config[t]) || {}
      }
    }
    var h,
      u,
      l,
      f,
      p = {},
      d = {},
      g = {},
      m = {},
      v = Object.prototype.hasOwnProperty,
      x = [].slice,
      y = /\.js$/
    ;(l = function (t, e) {
      var n,
        i = o(t),
        c = i[0]
      return (
        (t = i[1]),
        c && ((c = r(c, e)), (n = s(c))),
        c
          ? (t = n && n.normalize ? n.normalize(t, a(e)) : r(t, e))
          : ((t = r(t, e)),
            (i = o(t)),
            (c = i[0]),
            (t = i[1]),
            c && (n = s(c))),
        { f: c ? c + "!" + t : t, n: t, pr: c, p: n }
      )
    }),
      (f = {
        require: function (t) {
          return n(t)
        },
        exports: function (t) {
          var e = p[t]
          return void 0 !== e ? e : (p[t] = {})
        },
        module: function (t) {
          return { id: t, uri: "", exports: p[t], config: c(t) }
        }
      }),
      (h = function (r, a, o, c) {
        var h,
          u,
          g,
          v,
          x,
          y,
          b = [],
          _ = typeof o
        if (((c = c || r), "undefined" === _ || "function" === _)) {
          for (
            a = !a.length && o.length ? ["require", "exports", "module"] : a,
              x = 0;
            x < a.length;
            x += 1
          )
            if (((v = l(a[x], c)), "require" === (u = v.f))) b[x] = f.require(r)
            else if ("exports" === u) (b[x] = f.exports(r)), (y = !0)
            else if ("module" === u) h = b[x] = f.module(r)
            else if (e(p, u) || e(d, u) || e(m, u)) b[x] = s(u)
            else {
              if (!v.p) throw new Error(r + " missing " + u)
              v.p.load(v.n, n(c, !0), i(u), {}), (b[x] = p[u])
            }
          ;(g = o ? o.apply(p[r], b) : void 0),
            r &&
              (h && h.exports !== t && h.exports !== p[r]
                ? (p[r] = h.exports)
                : (g === t && y) || (p[r] = g))
        } else r && (p[r] = o)
      }),
      (requirejs =
        require =
        u =
          function (e, r, n, a, i) {
            if ("string" == typeof e) return f[e] ? f[e](r) : s(l(e, r).f)
            if (!e.splice) {
              if (((g = e), g.deps && u(g.deps, g.callback), !r)) return
              r.splice ? ((e = r), (r = n), (n = null)) : (e = t)
            }
            return (
              (r = r || function () {}),
              "function" == typeof n && ((n = a), (a = i)),
              a
                ? h(t, e, r, n)
                : setTimeout(function () {
                    h(t, e, r, n)
                  }, 4),
              u
            )
          }),
      (u.config = function (t) {
        return u(t)
      }),
      (requirejs._defined = p),
      (define = function (t, r, n) {
        r.splice || ((n = r), (r = [])),
          e(p, t) || e(d, t) || (d[t] = [t, r, n])
      }),
      (define.amd = { jQuery: !0 })
  })(),
  define("libs/almond", function () {}),
  "function" != typeof define)
)
  var define = require("amdefine")(module)
if (
  (define("Kit", [], function () {
    function t(e, i) {
      return e._Set
        ? e
        : (i || (e = n(e)),
          (e.contains = function (t, n) {
            return !!~r(e, t, n)
          }),
          (e.indexOf = function (t, n) {
            return r(e, t, n)
          }),
          (e.toArray = function () {
            return a(e)
          }),
          (e.union = function (r) {
            r = t(r)
            for (
              var n = e.length + r.length,
                i = new e.constructor(n),
                s = 0,
                o = 0,
                c = 0;
              c < n;
              c++
            )
              e[s] === r[o]
                ? ((i[c] = e[s++]), o++, n--)
                : e[s] < r[o]
                  ? (i[c] = e[s++])
                  : (i[c] = r[o++])
            return (i.length = n), t(i.length === n ? i : a(i, n), !0)
          }),
          (e.inspect = e.toArray),
          (e._Set = !0),
          e)
    }
    function e(t, e) {
      return t < e ? E : t === e ? k : C
    }
    function r(t, r, n) {
      var a,
        i,
        s = 0,
        o = t.length,
        c = o - 1
      if (o < 1) return -1
      if (((n = n || e), 1 === o)) return n(r, t[s]) === k ? s : -1
      if (n(r, t[s]) === E || n(r, t[c]) === C) return -1
      do {
        if (((a = s + ((c - s + 1) >> 1)), (i = n(r, t[a])) === k)) return a
        i === E ? (c = a - 1) : (s = a + 1)
      } while (s <= c)
      return -1
    }
    function n(t) {
      var e = t.length
      if (e <= 1) return t
      for (var r, n, i, s = 1, o = (e / 3) | 0; s < o; ) s = 3 * s + 1
      for (; s > 0; ) {
        for (r = s; r < e; r++)
          for (n = r; n >= s && t[n] < t[n - s]; n -= s)
            (i = t[n]), (t[n] = t[n - s]), (t[n - s] = i)
        s = (s / 3) | 0
      }
      var c = t[0]
      for (r = 1, n = 1; r < e; r++) t[r] !== c && (c = t[n++] = t[r])
      return (t.length = n), t.length === n ? t : a(t, n)
    }
    function a(t, e) {
      e = void 0 === e ? t.length : e
      for (var r = new t.constructor(e), n = e; n--; ) r[n] = t[n]
      return r
    }
    function i(t) {
      for (var e, r = {}, n = 0, a = 0, i = t.length; n < i; n++)
        (e = t[n]), r.hasOwnProperty(e) || ((r[e] = 1), (t[a++] = e))
      return (t.length = a), t
    }
    function s(t) {
      var e,
        r,
        n,
        a = t.length,
        i = (1e10 * Math.random()).toString(32) + (+new Date()).toString(32)
      for (e = r = 0; e < a; e++)
        null != (n = t[e]) &&
          (n.hasOwnProperty(i) ||
            (Object.defineProperty(n, i, { value: 1, enumerable: !1 }),
            (t[r++] = n)))
      for (e = r; e--; ) t[e][i] = void 0
      return (t.length = r), t
    }
    function o(t) {
      t = t.map(function (t) {
        return t[1] ? t : t + t
      })
      var e, r, a, i, s, o
      ;(t = n(t)), (o = t.length)
      var c,
        h,
        u = Object.create(null),
        l = Object.create(null),
        f = Object.create(null)
      for (e = 0; e < o; e++)
        for (s = t[e], h = s[1], l[s[0]] = !0, f[h] = !0, r = e; r < o; r++)
          if ((c = t[r][0]) >= h) {
            c === h && (u[h] = !0)
            break
          }
      var g = n(t.join("").split("")),
        m = Object.keys(u),
        v = g[0],
        x = Object.create(null),
        y = Object.create(null)
      for (e = 0; e < o; e++) x[t[e]] = []
      if (u[v])
        for (e = 0; e < o; e++)
          if (((s = t[e]), s[0] === v)) x[s].push(v)
          else if (s[0] > v) break
      for (e = 0, i = g.length - 1; e < i; e++) {
        if (
          ((c = g[e]),
          (h = g[e + 1]),
          f[c] && (c = d(c)),
          l[h] && (h = p(h)),
          c <= h)
        )
          for (
            v = c === h ? c : c + h, r = 0;
            r < o && ((s = t[r]), !(s[0] > h));
            r++
          )
            s[0] <= c && h <= s[1] && (x[s].push(v), m.push(v))
        if (((c = g[e]), (h = g[e + 1]), u[h]))
          for (r = 0; r < o && ((s = t[r]), !(s[0] > h)); r++)
            s[0] <= h && h <= s[1] && x[s].push(h)
      }
      m = n(m)
      for (a in x) y[a[0] === a[1] ? a[0] : a] = x[a]
      return { ranges: m, map: y }
    }
    function c(t) {
      var e = String.fromCharCode(65535)
      t = o(t).ranges
      var r = []
      if (!t.length) return r
      "\0" !== t[0][0] && t.unshift(e)
      var n = t.length - 1
      return (
        (t[n][1] || t[n][0]) !== e && t.push("\0"),
        t.reduce(function (t, e) {
          var n = d(t[1] || t[0]),
            a = p(e[0])
          return n < a && r.push(n + a), n === a && r.push(n), e
        }),
        r
      )
    }
    function h(t) {
      t = t.split("")
      var e = [],
        r = [],
        n = "^" === t[0] && t.length > 1 && t.shift()
      return (
        t.forEach(function (t) {
          if ("-" == e[0] && e.length > 1) {
            if (e[1] > t)
              throw new Error(
                "Charset range out of order:" + e[1] + "-" + t + "!"
              )
            r.push(e[1] + t), e.splice(0, 2)
          } else e.unshift(t)
        }),
        (r = r.concat(e)),
        n ? c(r) : o(r).ranges
      )
    }
    function u(t) {
      if (!t.length) return []
      var e = [t[0]]
      return (
        t.reduce(function (t, r) {
          var n = e.length - 1
          return t[t.length - 1] === p(r[0])
            ? (e[n] = e[n][0] + r[r.length - 1])
            : (e.push(r), r)
        }),
        e.reduce(function (t, e) {
          return (
            2 === e.length && e[0] === p(e[1])
              ? (t.push(e[0]), t.push(e[1]))
              : t.push(e),
            t
          )
        }, [])
      )
    }
    function l(t) {
      return String.fromCharCode(t)
    }
    function f(t) {
      return t.charCodeAt(0)
    }
    function p(t) {
      return String.fromCharCode(t.charCodeAt(0) - 1)
    }
    function d(t) {
      return String.fromCharCode(t.charCodeAt(0) + 1)
    }
    function g(t, e) {
      var r = /[\x00-\x1F\x7F-\x9F]/,
        n = /[\u009F-\uFFFF]/
      return (t = t
        .split("")
        .map(function (t) {
          return !e && S.hasOwnProperty(t)
            ? S[t]
            : n.test(t)
              ? "\\u" + ("00" + f(t).toString(16).toUpperCase()).slice(-4)
              : r.test(t)
                ? "\\x" + ("0" + f(t).toString(16).toUpperCase()).slice(-2)
                : t
        })
        .join(""))
    }
    function m(t) {
      return [].concat.apply([], t)
    }
    function v(t, e) {
      return new Array(e + 1).join(t)
    }
    function x() {
      var t = _.call(arguments)
      if (w) Function.prototype.apply.apply(console.log, [console, t])
      else {
        var e = require("util")
        t.forEach(function (t) {
          console.log(
            e.inspect(t, {
              showHidden: !1,
              customInspect: !0,
              depth: 64,
              colors: !0
            })
          )
        })
      }
    }
    function y(t) {
      for (
        var e,
          r = t.toString(),
          n = /^\s+function\s+([a-zA-Z]\w+)\s*\(/gm,
          a = [];
        (e = n.exec(r));

      )
        a.push(e[1])
      for (var t, i = []; (t = a.pop()); ) i.push(t + ":" + t)
      return "{\n" + i.join(",\n") + "\n}"
    }
    var b = Array.prototype,
      _ = b.slice,
      w = (function () {
        return "[object Window]" === this.toString()
      })(),
      E = -1,
      k = 0,
      C = 1,
      S = {
        "\n": "\\n",
        "\t": "\\t",
        "\f": "\\f",
        "\r": "\\r",
        " ": " ",
        "\\": "\\\\",
        "\0": "\\0"
      }
    return {
      sortUnique: n,
      idUnique: s,
      hashUnique: i,
      Set: t,
      repeats: v,
      negate: c,
      coalesce: u,
      classify: o,
      parseCharset: h,
      chr: l,
      ord: f,
      pred: p,
      succ: d,
      toPrint: g,
      flatten2: m,
      log: x,
      isBrowser: w,
      locals: y
    }
  }),
  "function" != typeof define)
)
  var define = require("amdefine")(module)
if (
  (define("NFA", ["./Kit"], function (t) {
    function e(e) {
      e = e.compact ? c(e) : e
      var s,
        o = {},
        h = e.trans,
        u = {}
      for (s = 0, n = e.accepts.length; s < n; s++) o[e.accepts[s]] = !0
      var l
      for (s = 0, n = h.length; s < n; s++)
        (l = h[s]),
          l.charset
            ? (l.ranges =
                "string" == typeof l.charset
                  ? t.parseCharset(l.charset)
                  : l.charset)
            : (l.eMove = !0),
          l.from.forEach(function (t) {
            var e = (u[t] = u[t] || {
              eMoveStates: [],
              eMove: [],
              charMove: {},
              trans: [],
              ranges: []
            })
            l.eMove
              ? (e.eMoveStates = e.eMoveStates.concat(l.to))
              : (e.ranges = e.ranges.concat(l.ranges)),
              e.trans.push(l)
          })
      return (
        Object.keys(u).forEach(function (e) {
          var r = u[e],
            n = r.trans,
            a = r.charMove,
            i = r.eMove,
            s = r.ranges,
            o = t.classify(s),
            c = o.map
          n.forEach(function (e) {
            e.eMove
              ? e.to.forEach(function (t) {
                  i.push({
                    to: t,
                    action: e.action,
                    assert: e.assert,
                    eMove: !0
                  })
                })
              : t
                  .flatten2(
                    e.ranges.map(function (t) {
                      return c[t]
                    })
                  )
                  .forEach(function (t) {
                    ;(a[t] = a[t] || []).push(e)
                  })
          }),
            (s = t.Set(
              o.ranges.filter(function (t) {
                return !!t[1]
              })
            )),
            (r.ranges = s),
            Object.keys(a).forEach(function (t) {
              var e = a[t],
                r = []
              n.forEach(function (t) {
                t.to.forEach(function (n) {
                  ;(t.eMove || ~e.indexOf(t)) &&
                    r.push({
                      to: n,
                      action: t.action,
                      assert: t.assert,
                      eMove: t.eMove
                    })
                })
              }),
                (a[t] = r)
            }),
            delete r.trans,
            delete r.eMoveStates
        }),
        { accepts: o, router: u, input: i, assertDFA: a, accept: r }
      )
    }
    function r(t) {
      return this.accepts.hasOwnProperty(t)
    }
    function a() {
      for (
        var e, r = this.router, n = Object.keys(r), a = 0, i = n.length;
        a < i;
        a++
      ) {
        if (((e = r[n[a]]), e.eMove.length > 1))
          throw new Error(
            "DFA Assertion Fail!\nFrom state `" +
              n[a] +
              "` can goto to multi 蔚-move states!"
          )
        for (
          var s = e.charMove, o = Object.keys(s), c = 0, h = o.length;
          c < h;
          c++
        ) {
          if (1 !== s[o[c]].length)
            throw (
              (t.log(s),
              new Error(
                "DFA Assertion Fail!\nFrom state `" +
                  n[a] +
                  "` via charset `" +
                  o[c] +
                  "` can goto to multi states!"
              ))
            )
        }
        if (o.length && e.eMove.length)
          throw new Error(
            "DFA Assertion Fail!\nFrom state `" +
              n[a] +
              "` can goto extra 蔚-move state!"
          )
      }
      return !0
    }
    function i(e, r, n) {
      function a(e, r, o, c, h) {
        t: for (;;) {
          var u,
            l,
            f,
            p,
            d = i.router[o]
          if (!d) break
          var g,
            m = d.eMove,
            v = d.charMove
          r < e.length
            ? ((u = e[r]),
              (g = v.hasOwnProperty(u)
                ? v[u]
                : (l = s(d.ranges, u))
                  ? v[l]
                  : m))
            : (g = m)
          for (
            var x, y, b, _ = c.length, w = h, E = 0, k = g.length;
            E < k;
            E++
          ) {
            if (
              ((x = g[E]),
              (f = x.eMove ? 0 : 1),
              (h = w),
              c.splice(0, c.length - _),
              (_ = c.length),
              x.assert)
            ) {
              if (!1 === (y = x.assert(c, u, r, o, e))) continue
              "number" == typeof y && ((r += y), (h += y))
            }
            if (
              (x.action && (c = x.action(c, u, r, o, e) || c),
              (h = x.eMove ? h : r),
              n && t.log(u + ":" + o + ">" + x.to),
              E === k - 1)
            ) {
              ;(r += f), (o = x.to)
              continue t
            }
            if (((b = a(e, r + f, x.to, c, h)), b.acceptable)) return b
            p = b
          }
          if (p) return p
          break
        }
        return { stack: c, lastIndex: h, lastState: o, acceptable: i.accept(o) }
      }
      r = r || 0
      var i = this
      return a(e, r, "start", [], r - 1)
    }
    function s(t, e) {
      var r = t.indexOf(e, o)
      return !!~r && t[r]
    }
    function o(t, e) {
      var r = e[0]
      return t > e[1] ? 1 : t < r ? -1 : 0
    }
    function c(t) {
      t.accepts = t.accepts.split(",")
      for (var e, r, n, a, i = t.trans, s = i.length; s--; )
        (e = i[s]),
          (r = e[0].split(">")),
          (n = r[0].split(",")),
          (a = r[1].split(",")),
          (i[s] = { from: n, to: a, charset: e[1], action: e[2], assert: e[3] })
      return (t.compact = !1), t
    }
    return e
  }),
  "function" != typeof define)
)
  var define = require("amdefine")(module)
if (
  (define("parse", ["./NFA", "./Kit"], function (t, e) {
    function r() {
      var t = Object.keys(p)
        .map(function (t) {
          return t + "=" + JSON.stringify(p[t])
        })
        .join(";")
      ;(function () {
        return this
      })().eval(t)
    }
    function n(t) {
      ;(this.raw = t.raw),
        (this.tree = t.tree),
        (this.groupCount = t.groupCount)
    }
    function a(t, e) {
      d = e
      var r,
        a,
        s,
        p = i()
      ;(r = p.input(t, 0, e)),
        (a = r.stack),
        (a = v.endChoice(a)),
        (s = r.lastState)
      var g = r.acceptable && r.lastIndex === t.length - 1
      if (!g) {
        var m
        switch (s) {
          case "charsetRangeEndWithNullChar":
            m = {
              type: "CharsetRangeEndWithNullChar",
              message:
                "Charset range end with NUL char does not make sense!\nBecause [a-\\0] is not a valid range.\nAnd [\\0-\\0] should be rewritten into [\\0]."
            }
            break
          case "repeatErrorFinal":
            m = { type: "NothingRepeat", message: "Nothing to repeat!" }
            break
          case "digitFollowNullError":
            m = {
              type: "DigitFollowNullError",
              message:
                "The '\\0' represents the <NUL> char and cannot be followed by a decimal digit!"
            }
            break
          case "charsetRangeEndClass":
            m = {
              type: "CharsetRangeEndClass",
              message:
                'Charset range ends with class such as "\\w\\W\\d\\D\\s\\S" is invalid!'
            }
            break
          case "charsetOctEscape":
            m = {
              type: "DecimalEscape",
              message:
                "Decimal escape appears in charset is invalid.Because it can't be explained as  backreference.And octal escape is deprecated!"
            }
            break
          default:
            0 === s.indexOf("charset")
              ? (m = {
                  type: "UnclosedCharset",
                  message: "Unterminated character class!"
                })
              : ")" === t[r.lastIndex]
                ? (m = {
                    type: "UnmatchedParen",
                    message: "Unmatched end parenthesis!"
                  })
                : ((m = {
                    type: "UnexpectedChar",
                    message: "Unexpected char!"
                  }),
                  r.lastIndex++)
        }
        if (m)
          throw (
            ((m.lastIndex = r.lastIndex),
            (m.astStack = r.stack),
            (m.lastState = s),
            new f(m))
          )
      }
      if (a._parentGroup)
        throw new f({
          type: "UnterminatedGroup",
          message: "Unterminated group!",
          lastIndex: a._parentGroup.indices[0],
          lastState: s,
          astStack: a
        })
      if (g) {
        var x = a.groupCounter ? a.groupCounter.i : 0
        delete a.groupCounter, h(a, t, t.length), (a = o(a))
        var y = new n({ raw: t, groupCount: x, tree: a })
        return (
          y.traverse(l, CHARSET_NODE),
          y.traverse(u, ASSERT_NODE),
          c(a),
          (d = !1),
          y
        )
      }
    }
    function i() {
      return g || (g = t(E, d)), g
    }
    function s(t, e, r) {
      Object.defineProperty(t, e, {
        value: r,
        enumerable: d,
        writable: !0,
        configurable: !0
      })
    }
    function o(t) {
      return t.filter(function (t) {
        return t.type == EXACT_NODE && t.concatTemp
          ? (delete t.concatTemp, !!t.chars)
          : (t.sub
              ? (t.sub = o(t.sub))
              : t.branches && (t.branches = t.branches.map(o)),
            !0)
      })
    }
    function c(t) {
      function e(t) {
        t.sub ? c(t.sub) : t.branches && t.branches.map(c)
      }
      var r = t[0]
      e(r)
      for (var n, a = 1, i = 1, s = t.length; a < s; a++) {
        if (((n = t[a]), n.type === EXACT_NODE)) {
          if (r.type === EXACT_NODE && !r.repeat && !n.repeat) {
            ;(r.indices[1] = n.indices[1]),
              (r.raw += n.raw),
              (r.chars += n.chars)
            continue
          }
        } else e(n)
        ;(t[i++] = n), (r = n)
      }
      r && (t.length = i)
    }
    function h(t, e, r) {
      if (!t.length) return void t.push({ type: EMPTY_NODE, indices: [r, r] })
      t.reduce(function (t, r) {
        return (
          r.indices.push(t),
          (r.raw = e.slice(r.indices[0], t)),
          r.type === GROUP_NODE || (r.type === ASSERT_NODE && r.sub)
            ? h(r.sub, e, r.endParenIndex)
            : r.type === CHOICE_NODE
              ? (r.branches.reduce(function (t, r) {
                  h(r, e, t)
                  var n = r[0]
                  return (n ? n.indices[0] : t) - 1
                }, t),
                r.branches.reverse())
              : r.type === EXACT_NODE &&
                (r.concatTemp || (r.chars = r.chars || r.raw)),
          r.indices[0]
        )
      }, r),
        t.reverse()
    }
    function u(t) {
      if (t.repeat) {
        var e = t.assertionType,
          r = "Nothing to repeat! Repeat after assertion doesn't make sense!",
          n = {
            AssertLookahead: "?=",
            AssertNegativeLookahead: "?!",
            AssertLookbehind: "?<=",
            AssertNegativeLookbehind: "?<!"
          },
          a = n[e]
        if (void 0 !== a) {
          var i = "(" + a + "b)"
          r +=
            "\n/a" +
            i +
            "+/銆�/a" +
            i +
            "{1,n}/ are the same as /a" +
            i +
            "/銆俓n/a" +
            i +
            "*/銆�/a" +
            i +
            "{0,n}/銆�/a" +
            i +
            "?/ are the same as /a/銆�"
        }
        throw new f({
          type: "NothingRepeat",
          lastIndex: t.indices[1] - 1,
          message: r
        })
      }
    }
    function l(t) {
      t.ranges = e.sortUnique(
        t.ranges.map(function (t) {
          if (t[0] > t[1])
            throw new f({
              type: "OutOfOrder",
              lastIndex: t.lastIndex,
              message:
                "Range [" + t.join("-") + "] out of order in character class!"
            })
          return t.join("")
        })
      )
    }
    function f(t) {
      ;(this.name = "RegexSyntaxError"),
        (this.type = t.type),
        (this.lastIndex = t.lastIndex),
        (this.lastState = t.lastState),
        (this.astStack = t.astStack),
        (this.message = t.message),
        Object.defineProperty(this, "stack", {
          value: new Error(t.message).stack,
          enumerable: !1
        })
    }
    var p = {
      EXACT_NODE: "exact",
      CHARSET_NODE: "charset",
      CHOICE_NODE: "choice",
      GROUP_NODE: "group",
      ASSERT_NODE: "assert",
      DOT_NODE: "dot",
      BACKREF_NODE: "backref",
      EMPTY_NODE: "empty",
      AssertLookahead: "AssertLookahead",
      AssertNegativeLookahead: "AssertNegativeLookahead",
      AssertLookbehind: "AssertLookbehind",
      AssertNegativeLookbehind: "AssertNegativeLookbehind",
      AssertNonWordBoundary: "AssertNonWordBoundary",
      AssertWordBoundary: "AssertWordBoundary",
      AssertEnd: "AssertEnd",
      AssertBegin: "AssertBegin"
    }
    r(),
      (n.prototype.traverse = function (t, e) {
        function r(t, n) {
          t.forEach(function (t) {
            ;(e && t.type !== e) || n(t),
              t.sub
                ? r(t.sub, n)
                : t.branches &&
                  t.branches.forEach(function (t) {
                    r(t, n)
                  })
          })
        }
        r(this.tree, t)
      })
    var d
    ;(a.Constants = p),
      (a.exportConstants = r),
      (a.RegexSyntaxError = f),
      (a.getNFAParser = i)
    var g
    f.prototype.toString = function () {
      return this.name + " " + this.type + ":" + this.message
    }
    var m = { n: "\n", r: "\r", t: "\t", v: "\v", f: "\f" },
      v = (function () {
        function t(t, e, r) {
          var n = t[0]
          ;(!n ||
            n.type != EXACT_NODE ||
            n.repeat ||
            (n.chars && !n.concatTemp)) &&
            t.unshift({ type: EXACT_NODE, indices: [r] }),
            n && n.concatTemp && (n.chars += e)
        }
        function e(t, e, r) {
          t.unshift({ type: DOT_NODE, indices: [r] })
        }
        function r(t, e, r) {
          t.unshift({ type: EXACT_NODE, chars: "\0", indices: [r - 1] })
        }
        function n(t, e, r) {
          t.unshift({
            type: ASSERT_NODE,
            indices: [r],
            assertionType: AssertBegin
          })
        }
        function a(t, e, r, n, a) {
          t.unshift({
            type: ASSERT_NODE,
            indices: [r],
            assertionType: AssertEnd
          })
        }
        function i(t, e, r) {
          t.unshift({
            type: ASSERT_NODE,
            indices: [r - 1],
            assertionType: "b" == e ? AssertWordBoundary : AssertNonWordBoundary
          })
        }
        function o(t, e, r) {
          t[0].type !== EXACT_NODE &&
            t.unshift({ type: EXACT_NODE, indices: [r] })
        }
        function c(t, e, r) {
          s(t[0], "_commaIndex", r)
        }
        function h(t, e, r, n, a) {
          var i,
            s = t[0],
            o = a.lastIndexOf("{", r),
            c = parseInt(a.slice(o + 1, s._commaIndex || r), 10)
          if (s._commaIndex) {
            if (
              (i =
                s._commaIndex + 1 == r
                  ? 1 / 0
                  : parseInt(a.slice(s._commaIndex + 1, r), 10)) < c
            )
              throw new f({
                type: "OutOfOrder",
                lastState: n,
                lastIndex: r,
                astStack: t,
                message: "Numbers out of order in {} quantifier!"
              })
            delete s._commaIndex
          } else i = c
          s.indices[0] >= o && t.shift(), d(t, c, i, o, a)
        }
        function u(t, e, r, n, a) {
          d(t, 0, 1 / 0, r, a)
        }
        function l(t, e, r, n, a) {
          d(t, 0, 1, r, a)
        }
        function p(t, e, r, n, a) {
          d(t, 1, 1 / 0, r, a)
        }
        function d(t, e, r, n, a) {
          var i = t[0],
            o = { min: e, max: r, nonGreedy: !1, possessive: !1 },
            c = n - 1
          if (
            (i.chars && 1 === i.chars.length && (c = i.indices[0]),
            i.type === EXACT_NODE)
          ) {
            var h = {
              type: EXACT_NODE,
              repeat: o,
              chars: i.chars ? i.chars : a[c],
              indices: [c]
            }
            i.indices[0] === c && t.shift(), t.unshift(h)
          } else i.repeat = o
          s(o, "beginIndex", n - t[0].indices[0])
        }
        function g(t) {
          t[0].repeat.nonGreedy = !0
        }
        function v(t) {
          t[0].repeat.possessive = !0
        }
        function x(t, e, r) {
          t.unshift({
            concatTemp: !0,
            type: EXACT_NODE,
            chars: "",
            indices: [r]
          })
        }
        function y(t, e, r) {
          m.hasOwnProperty(e) && (e = m[e]),
            t.unshift({ type: EXACT_NODE, chars: e, indices: [r - 1] })
        }
        function b(t, e, r) {
          t.unshift({
            type: CHARSET_NODE,
            indices: [r - 1],
            chars: "",
            ranges: [],
            classes: [e],
            exclude: !1
          })
        }
        function _(t, e, r, n, a) {
          ;(e = String.fromCharCode(parseInt(a[r - 1] + e, 16))),
            t.shift(),
            t.unshift({ type: EXACT_NODE, chars: e, indices: [r - 3] })
        }
        function w(t, e, r, n, a) {
          ;(e = String.fromCharCode(parseInt(a.slice(r - 3, r + 1), 16))),
            t.shift(),
            t.unshift({ type: EXACT_NODE, chars: e, indices: [r - 5] })
        }
        function E(t, e, r) {
          var n = (t.groupCounter = t.groupCounter || { i: 0 })
          n.i++
          var a = {
            type: GROUP_NODE,
            num: n.i,
            sub: [],
            indices: [r],
            _parentStack: t
          }
          return (t = a.sub), s(t, "_parentGroup", a), (t.groupCounter = n), t
        }
        function k(t) {
          var e = t._parentGroup
          ;(e.nonCapture = !0), (e.num = void 0), t.groupCounter.i--
        }
        function C(t, e, r, n) {
          var a = t._parentGroup
          ;(a.type = ASSERT_NODE),
            (a.assertionType =
              "=" == e ? AssertLookahead : AssertNegativeLookahead),
            "groupNameStart" === n &&
              (a.assertionType =
                "=" === e ? AssertLookbehind : AssertNegativeLookbehind),
            (a.num = void 0),
            t.groupCounter.i--
        }
        function S(t) {
          var e = t._parentGroup
          ;(e.atomicGroup = !0), (e.num = void 0), t.groupCounter.i--
        }
        function B(t) {
          t._parentGroup.nameP = !0
        }
        function A(t, e, r, n, a) {
          var i = t._parentGroup
          "groupNameStart" === n
            ? (i.name = e)
            : "groupNameStartApos" === n
              ? ((i.name = e), (i.aops = !0))
              : (i.name += e)
        }
        function N(t, e, r, n, a) {
          t = O(t)
          var i = t._parentGroup
          if (!i)
            throw new f({
              type: "UnexpectedChar",
              lastIndex: r,
              lastState: n,
              astStack: t,
              message: "Unexpected end parenthesis!"
            })
          return (
            delete t._parentGroup,
            delete t.groupCounter,
            (t = i._parentStack),
            delete i._parentStack,
            t.unshift(i),
            (i.endParenIndex = r),
            t
          )
        }
        function T(t, e, r) {
          var n,
            a = []
          if (t._parentChoice)
            (n = t._parentChoice),
              n.branches.unshift(a),
              s(a, "_parentChoice", n),
              s(a, "_parentGroup", n),
              (a.groupCounter = t.groupCounter),
              delete t._parentChoice,
              delete t.groupCounter
          else {
            var i = t[t.length - 1]
            ;(n = {
              type: CHOICE_NODE,
              indices: [i ? i.indices[0] : r - 1],
              branches: []
            }),
              s(n, "_parentStack", t),
              n.branches.unshift(t.slice()),
              (t.length = 0),
              t.unshift(n),
              (a.groupCounter = t.groupCounter),
              s(a, "_parentChoice", n),
              s(a, "_parentGroup", n),
              n.branches.unshift(a)
          }
          return a
        }
        function O(t) {
          if (t._parentChoice) {
            var e = t._parentChoice
            delete t._parentChoice, delete t._parentGroup, delete t.groupCounter
            var r = e._parentStack
            return delete e._parentStack, r
          }
          return t
        }
        function R(t, e, r) {
          t.unshift({
            type: CHARSET_NODE,
            indices: [r],
            classes: [],
            ranges: [],
            chars: ""
          })
        }
        function P(t) {
          t[0].exclude = !0
        }
        function M(t, e, r) {
          t[0].chars += e
        }
        function I(t, e, r) {
          m.hasOwnProperty(e) && (e = m[e]), (t[0].chars += e)
        }
        function F(t, e, r) {
          t[0].chars += "\0"
        }
        function D(t, e) {
          t[0].classes.push(e)
        }
        function L(t, e, r, n, a) {
          var i = t[0]
          ;(e = String.fromCharCode(parseInt(i.chars.slice(-1) + e, 16))),
            (i.chars = i.chars.slice(0, -2)),
            (i.chars += e)
        }
        function z(t, e, r, n, a) {
          var i = t[0]
          ;(e = String.fromCharCode(parseInt(i.chars.slice(-3) + e, 16))),
            (i.chars = i.chars.slice(0, -4)),
            (i.chars += e)
        }
        function G(t, e, r, n, a) {
          var i = t[0],
            s = i.chars.slice(-2)
          ;(s = [s[0], e]),
            (s.lastIndex = r),
            i.ranges.push(s),
            (i.chars = i.chars.slice(0, -2))
        }
        function j(t, e) {
          m.hasOwnProperty(e) && (e = m[e]), G.apply(this, arguments)
        }
        function U(t, e, r) {
          var n = t[0],
            a = n.chars.slice(-3) + e
          n.chars = n.chars.slice(0, -3)
          var i = n.ranges.pop()
          ;(e = String.fromCharCode(parseInt(a, 16))),
            (i = [i[0], e]),
            (i.lastIndex = r),
            n.ranges.push(i)
        }
        function X(t, e, r) {
          var n = t[0],
            a = n.chars.slice(-1) + e
          n.chars = n.chars.slice(0, -1)
          var i = n.ranges.pop()
          ;(e = String.fromCharCode(parseInt(a, 16))),
            (i = [i[0], e]),
            (i.lastIndex = r),
            n.ranges.push(i)
        }
        function q(t, e, r, n) {
          var a = t[0],
            i = parseInt(e, 10),
            s = "escape" === n,
            o = t.groupCounter,
            c = (o && o.i) || 0
          if (
            (s
              ? ((a = { type: BACKREF_NODE, indices: [r - 1] }), t.unshift(a))
              : (i = parseInt(a.num + "" + i, 10)),
            i > c)
          )
            throw new f({
              type: "InvalidBackReference",
              lastIndex: r,
              astStack: t,
              lastState: n,
              message:
                "Back reference number(" +
                i +
                ") greater than current groups count(" +
                c +
                ")."
            })
          a.num = i
        }
        function H(t, e, r, n) {
          var a = t[0]
          if ("nameBackrefStartP" === n) {
            var i = t._parentGroup
            delete t._parentGroup,
              delete t.groupCounter,
              (t = i._parentStack),
              delete i._parentStack,
              (a = { type: BACKREF_NODE, indices: [r - 4] }),
              t.unshift(a),
              (a.name = ""),
              t.groupCounter.i--
          } else
            ("nameBackrefStart" !== n &&
              "nameBackrefStartAops" !== n &&
              "nameBackrefStartCub" !== n) ||
              ((a = { type: BACKREF_NODE, indices: [r - 3] }),
              t.unshift(a),
              (a.name = ""))
          if (((a.name += e), "nameBackrefStartP" === n)) return t
        }
        return {
          escapeStart: x,
          exact: t,
          dot: e,
          nullChar: r,
          assertBegin: n,
          assertEnd: a,
          assertWordBoundary: i,
          repeatnStart: o,
          repeatnComma: c,
          repeatNonGreedy: g,
          repeatPossessive: v,
          repeatnEnd: h,
          repeat1: p,
          repeat01: l,
          repeat0: u,
          charClassEscape: b,
          normalEscape: y,
          unicodeEscape: w,
          hexEscape: _,
          charClassEscape: b,
          groupStart: E,
          groupNonCapture: k,
          backref: q,
          nameBackref: H,
          groupAtomicGroup: S,
          groupToAssertion: C,
          groupEnd: N,
          groupName: A,
          groupNameP: B,
          choice: T,
          endChoice: O,
          charsetStart: R,
          charsetExclude: P,
          charsetContent: M,
          charsetNullChar: F,
          charsetClassEscape: D,
          charsetHexEscape: L,
          charsetUnicodeEscape: z,
          charsetRangeEnd: G,
          charsetNormalEscape: I,
          charsetRangeEndNormalEscape: j,
          charsetRangeEndUnicodeEscape: U,
          charsetRangeEndHexEscape: X
        }
      })(),
      x = "0-9a-fA-F",
      y =
        "repeatnStart,repeatn_1,repeatn_2,repeatnErrorStart,repeatnError_1,repeatnError_2",
      b = "hexEscape1,hexEscape2",
      _ = "unicodeEscape1,unicodeEscape2,unicodeEscape3,unicodeEscape4",
      w =
        "charsetUnicodeEscape1,charsetUnicodeEscape2,charsetUnicodeEscape3,charsetUnicodeEscape4,charsetHexEscape1,charsetHexEscape2",
      E = {
        compact: !0,
        accepts:
          "start,begin,end,repeat0,repeat1,exact,repeatn,repeat01,repeatNonGreedy,repeatPossessive,choice," +
          y +
          ",nullChar,digitBackref,nameBackrefEnd," +
          _ +
          "," +
          b,
        trans: [
          [
            "start,begin,end,exact,repeatNonGreedy,repeatPossessive,repeat0,repeat1,repeat01,groupStart,groupQualifiedStart,groupNameEnd,choice,repeatn>exact",
            "^+*?^$.|(){[\\",
            v.exact
          ],
          [
            "hexEscape1,hexEscape2,unicodeEscape1,unicodeEscape2,unicodeEscape3,unicodeEscape4>exact",
            "^+*?^$.|(){[\\0-9a-fA-F",
            v.exact
          ],
          ["nullChar>exact", "^+*?^$.|(){[\\0-9", v.exact],
          [
            y +
              ",nullChar,digitBackref,nameBackrefEnd," +
              _ +
              "," +
              b +
              ",start,begin,end,exact,repeatNonGreedy,repeatPossessive,repeat0,repeat1,repeat01,groupStart,groupQualifiedStart,groupNameEnd,choice,repeatn>exact",
            ".",
            v.dot
          ],
          [
            "start,groupStart,groupQualifiedStart,groupNameEnd,end,begin,exact,repeat0,repeat1,repeat01,repeatn,repeatNonGreedy,repeatPossessive,choice," +
              y +
              ",nullChar,digitBackref,nameBackrefEnd," +
              _ +
              "," +
              b +
              ">begin",
            "^",
            v.assertBegin
          ],
          [
            y +
              ",nullChar,digitBackref,nameBackrefEnd," +
              _ +
              "," +
              b +
              ",exact>repeatnStart",
            "{",
            v.repeatnStart
          ],
          [
            "start,begin,end,groupQualifiedStart,groupNameEnd,groupStart,repeat0,repeat1,repeatn,repeat01,repeatNonGreedy,repeatPossessive,choice>repeatnErrorStart",
            "{",
            v.exact
          ],
          ["repeatnStart>repeatn_1", "0-9", v.exact],
          ["repeatn_1>repeatn_1", "0-9", v.exact],
          ["repeatn_1>repeatn_2", ",", v.repeatnComma],
          ["repeatn_2>repeatn_2", "0-9", v.exact],
          ["repeatn_1,repeatn_2>repeatn", "}", v.repeatnEnd],
          ["repeatnStart,repeatnErrorStart>exact", "}", v.exact],
          [
            "repeatnStart,repeatnErrorStart>exact",
            "^+*?^$.|(){[\\0-9}",
            v.exact
          ],
          ["repeatnErrorStart>repeatnError_1", "0-9", v.exact],
          ["repeatnError_1>repeatnError_1", "0-9", v.exact],
          ["repeatnError_1>repeatnError_2", ",", v.exact],
          ["repeatnError_2>repeatnError_2", "0-9", v.exact],
          ["repeatnError_2,repeatnError_1>repeatErrorFinal", "}"],
          ["repeatn_1,repeatnError_1>exact", "^+*?^$.|(){[\\0-9,}", v.exact],
          ["repeatn_2,repeatnError_2>exact", "^+*?^$.|(){[\\0-9}", v.exact],
          [
            "exact," +
              y +
              ",nullChar,digitBackref,nameBackrefEnd," +
              _ +
              "," +
              b +
              ">repeat0",
            "*",
            v.repeat0
          ],
          [
            "exact," +
              y +
              ",nullChar,digitBackref,nameBackrefEnd," +
              _ +
              "," +
              b +
              ">repeat1",
            "+",
            v.repeat1
          ],
          [
            "exact," +
              y +
              ",nullChar,digitBackref,nameBackrefEnd," +
              _ +
              "," +
              b +
              ">repeat01",
            "?",
            v.repeat01
          ],
          ["choice>repeatErrorFinal", "*+?"],
          [
            "repeat0,repeat1,repeat01,repeatn>repeatNonGreedy",
            "?",
            v.repeatNonGreedy
          ],
          [
            "repeat0,repeat1,repeat01,repeatn>repeatPossessive",
            "+",
            v.repeatPossessive
          ],
          ["repeat0,repeat1,repeat01,repeatn>repeatErrorFinal", "*"],
          [
            "start,begin,end,groupStart,groupQualifiedStart,groupNameEnd,exact,repeatNonGreedy,repeatPossessive,repeat0,repeat1,repeat01,repeatn,choice," +
              y +
              ",nullChar,digitBackref,nameBackrefEnd," +
              _ +
              "," +
              b +
              ">escape",
            "\\",
            v.escapeStart
          ],
          ["escape>nullChar", "0", v.nullChar],
          ["nullChar>digitFollowNullError", "0-9"],
          ["escape>exact", "^dDwWsSux0-9bB1-9kg", v.normalEscape],
          ["escape>exact", "bB", v.assertWordBoundary],
          ["escape>exact", "dDwWsS", v.charClassEscape],
          ["escape>unicodeEscape1", "u", v.exact],
          ["unicodeEscape1>unicodeEscape2", x, v.exact],
          ["unicodeEscape2>unicodeEscape3", x, v.exact],
          ["unicodeEscape3>unicodeEscape4", x, v.exact],
          ["unicodeEscape4>exact", x, v.unicodeEscape],
          ["escape>hexEscape1", "x", v.exact],
          ["hexEscape1>hexEscape2", x, v.exact],
          ["hexEscape2>exact", x, v.hexEscape],
          ["escape>digitBackref", "1-9", v.backref],
          ["digitBackref>digitBackref", "0-9", v.backref],
          ["digitBackref>exact", "^+*?^$.|(){[\\0-9", v.exact],
          ["escape>nameBackrefK", "k"],
          ["nameBackrefK>nameBackrefStart", "<"],
          ["nameBackrefStart>nameBackref", "a-zA-Z_", v.nameBackref],
          ["nameBackref>nameBackref", "a-zA-Z_0-9", v.nameBackref],
          ["nameBackref>nameBackrefEnd", ">"],
          ["nameBackrefK>nameBackrefStartAops", "'"],
          ["nameBackrefStartAops>nameBackrefAops", "a-zA-Z_", v.nameBackref],
          ["nameBackrefAops>nameBackrefAops", "a-zA-Z_0-9", v.nameBackref],
          ["nameBackrefAops>nameBackrefEnd", "'"],
          ["escape>nameBackrefG", "g"],
          ["nameBackrefK,nameBackrefG>nameBackrefStartCub", "{"],
          ["nameBackrefStartCub>nameBackrefCub", "a-zA-Z_", v.nameBackref],
          ["nameBackrefCub>nameBackrefCub", "a-zA-Z_0-9", v.nameBackref],
          ["nameBackrefCub>nameBackrefEnd", "}"],
          ["groupNameP>nameBackrefStartP", "="],
          ["nameBackrefStartP>nameBackrefP", "a-zA-Z_", v.nameBackref],
          ["nameBackrefP>nameBackrefP", "a-zA-Z_0-9", v.nameBackref],
          ["nameBackrefP>nameBackrefEnd", ")"],
          ["nameBackrefEnd>exact", "^+*?^$.|(){[\\0-9", v.exact],
          [
            "exact,begin,end,repeat0,repeat1,repeat01,repeatn,repeatNonGreedy,repeatPossessive,start,groupStart,groupQualifiedStart,groupNameEnd,choice," +
              y +
              ",nullChar,digitBackref,nameBackrefEnd," +
              _ +
              "," +
              b +
              ">groupStart",
            "(",
            v.groupStart
          ],
          ["groupStart>groupQualify", "?"],
          ["groupQualify>groupQualifiedStart", ":", v.groupNonCapture],
          ["groupQualify>groupQualifiedStart", "=", v.groupToAssertion],
          ["groupQualify>groupQualifiedStart", "!", v.groupToAssertion],
          ["groupNameStart>groupQualifiedStart", "=", v.groupToAssertion],
          ["groupNameStart>groupQualifiedStart", "!", v.groupToAssertion],
          ["groupQualify>groupQualifiedStart", ">", v.groupAtomicGroup],
          ["groupQualify>groupNameP", "P", v.groupNameP],
          ["groupQualify,groupNameP>groupNameStart", "<"],
          ["groupNameStart>groupName", "a-zA-Z_", v.groupName],
          ["groupName>groupName", "a-zA-Z_0-9", v.groupName],
          ["groupQualify>groupNameStartApos", "'"],
          ["groupNameStartApos>groupNameApos", "a-zA-Z_", v.groupName],
          ["groupNameApos>groupNameApos", "a-zA-Z_0-9", v.groupName],
          ["groupNameApos>groupNameEnd", "'"],
          ["groupName>groupNameEnd", ">"],
          [
            y +
              ",nullChar,digitBackref,nameBackrefEnd," +
              _ +
              "," +
              b +
              ",groupStart,groupQualifiedStart,groupNameEnd,begin,end,exact,repeat1,repeat0,repeat01,repeatn,repeatNonGreedy,repeatPossessive,choice>exact",
            ")",
            v.groupEnd
          ],
          [
            "start,begin,end,groupStart,groupQualifiedStart,groupNameEnd,exact,repeat0,repeat1,repeat01,repeatn,repeatNonGreedy,repeatPossessive,choice," +
              y +
              ",nullChar,digitBackref,nameBackrefEnd," +
              _ +
              "," +
              b +
              ">choice",
            "|",
            v.choice
          ],
          [
            "start,groupStart,groupQualifiedStart,groupNameEnd,begin,exact,repeat0,repeat1,repeat01,repeatn,repeatNonGreedy,repeatPossessive,choice," +
              y +
              ",nullChar,digitBackref,nameBackrefEnd," +
              _ +
              "," +
              b +
              ">end",
            "$",
            v.assertEnd
          ],
          [
            "exact,begin,end,repeat0,repeat1,repeat01,repeatn,repeatNonGreedy,repeatPossessive,groupQualifiedStart,groupNameEnd,groupStart,start,choice," +
              y +
              ",nullChar,digitBackref,nameBackrefEnd," +
              _ +
              "," +
              b +
              ">charsetStart",
            "[",
            v.charsetStart
          ],
          ["charsetStart>charsetExclude", "^", v.charsetExclude],
          ["charsetStart>charsetContent", "^\\]^", v.charsetContent],
          ["charsetExclude>charsetContent", "^\\]", v.charsetContent],
          [
            "charsetContent,charsetClass>charsetContent",
            "^\\]-",
            v.charsetContent
          ],
          ["charsetClass>charsetContent", "-", v.charsetContent],
          [
            w +
              ",charsetStart,charsetContent,charsetNullChar,charsetClass,charsetExclude,charsetRangeEnd>charsetEscape",
            "\\"
          ],
          [
            "charsetEscape>charsetContent",
            "^dDwWsSux0-9",
            v.charsetNormalEscape
          ],
          ["charsetEscape>charsetNullChar", "0", v.charsetNullChar],
          ["charsetEscape>charsetOctEscape", "1-9"],
          ["charsetRangeEndEscape>charsetOctEscape", "1-9"],
          ["charsetNullChar>digitFollowNullError", "0-9"],
          ["charsetNullChar>charsetContent", "^0-9\\]-", v.charsetContent],
          ["charsetEscape>charsetClass", "dDwWsS", v.charsetClassEscape],
          ["charsetEscape>charsetUnicodeEscape1", "u", v.charsetContent],
          ["charsetUnicodeEscape1>charsetUnicodeEscape2", x, v.charsetContent],
          ["charsetUnicodeEscape2>charsetUnicodeEscape3", x, v.charsetContent],
          ["charsetUnicodeEscape3>charsetUnicodeEscape4", x, v.charsetContent],
          ["charsetUnicodeEscape4>charsetContent", x, v.charsetUnicodeEscape],
          ["charsetEscape>charsetHexEscape1", "x", v.charsetContent],
          ["charsetHexEscape1>charsetHexEscape2", x, v.charsetContent],
          ["charsetHexEscape2>charsetContent", x, v.charsetHexEscape],
          [w + ">charsetContent", "^\\]0-9a-fA-F-", v.charsetContent],
          [
            w + ",charsetNullChar,charsetContent>charsetRangeStart",
            "-",
            v.charsetContent
          ],
          ["charsetRangeStart>charsetRangeEnd", "^\\]", v.charsetRangeEnd],
          ["charsetRangeEnd>charsetContent", "^\\]", v.charsetContent],
          ["charsetRangeStart>charsetRangeEndEscape", "\\"],
          [
            "charsetRangeEndEscape>charsetRangeEnd",
            "^dDwWsSux0-9bB1-9kg",
            v.charsetRangeEndNormalEscape
          ],
          ["charsetRangeEndEscape>charsetRangeEndWithNullChar", "0"],
          [
            "charsetRangeEndEscape>charsetRangeEndUnicodeEscape1",
            "u",
            v.charsetRangeEnd
          ],
          [
            "charsetRangeEndUnicodeEscape1>charsetRangeEndUnicodeEscape2",
            x,
            v.charsetContent
          ],
          [
            "charsetRangeEndUnicodeEscape2>charsetRangeEndUnicodeEscape3",
            x,
            v.charsetContent
          ],
          [
            "charsetRangeEndUnicodeEscape3>charsetRangeEndUnicodeEscape4",
            x,
            v.charsetContent
          ],
          [
            "charsetRangeEndUnicodeEscape4>charsetRangeEnd",
            x,
            v.charsetRangeEndUnicodeEscape
          ],
          [
            "charsetRangeEndEscape>charsetRangeEndHexEscape1",
            "x",
            v.charsetRangeEnd
          ],
          [
            "charsetRangeEndHexEscape1>charsetRangeEndHexEscape2",
            x,
            v.charsetContent
          ],
          [
            "charsetRangeEndHexEscape2>charsetRangeEnd",
            x,
            v.charsetRangeEndHexEscape
          ],
          ["charsetRangeEndEscape>charsetRangeEndClass", "dDwWsS"],
          [
            "charsetRangeEndUnicodeEscape1,charsetRangeEndHexEscape1>charsetContent",
            "^\\]0-9a-fA-F",
            v.charsetContent
          ],
          [
            "charsetRangeEndUnicodeEscape2,charsetRangeEndUnicodeEscape3,charsetRangeEndUnicodeEscape4,charsetRangeEndHexEscape2>charsetRangeStart",
            "-",
            v.charsetContent
          ],
          [
            w +
              ",charsetRangeEndUnicodeEscape1,charsetRangeEndHexEscape1,charsetRangeEndUnicodeEscape2,charsetRangeEndUnicodeEscape3,charsetRangeEndUnicodeEscape4,charsetRangeEndHexEscape2,charsetNullChar,charsetRangeStart,charsetContent,charsetClass,charsetExclude,charsetRangeEnd>exact",
            "]"
          ]
        ]
      }
    return a
  }),
  "function" != typeof define)
)
  var define = require("amdefine")(module)
if (
  (define("RegExp", ["./parse", "./Kit", "./NFA"], function (t, e, r) {
    function n(e, r) {
      if (!(this instanceof n)) return new n(e, r)
      e += ""
      var o = {}
      "string" == typeof r
        ? ((r = r.toLowerCase()),
          ~r.indexOf("i") && (o.ignoreCase = !0),
          ~r.indexOf("m") && (o.multiline = !0),
          ~r.indexOf("g") && (o.global = !0),
          ~r.indexOf("d") && (o.debug = !0))
        : (o = r)
      var c = (this.ast = t(e))
      ;(this.source = e),
        (this.multiline = !!o.multiline),
        (this.global = !!o.global),
        (this.ignoreCase = !!o.ignoreCase),
        (this.debug = !!o.debug),
        (this.flags = ""),
        this.multiline && (this.flags += "m"),
        this.ignoreCase && (this.flags += "i"),
        this.global && (this.flags += "g"),
        p(this, [
          "source",
          "options",
          "multiline",
          "global",
          "ignoreCase",
          "flags",
          "debug"
        ])
      var h = this.ignoreCase
      c.traverse(function (t) {
        s(t, h)
      }, CHARSET_NODE),
        c.traverse(function (t) {
          a(t, h)
        }, EXACT_NODE),
        this.multiline && c.traverse(i, ASSERT_NODE)
    }
    function a(t, e) {
      var r
      ;(r = t.chars.split("")),
        (r = e
          ? r.map(function (t) {
              return /[a-z]/.test(t)
                ? [t, t.toUpperCase()]
                : /[A-Z]/.test(t)
                  ? [t, t.toLowerCase()]
                  : [t]
            })
          : r.map(function (t) {
              return [t]
            })),
        (t.explained = r)
    }
    function i(t) {
      var e = t.assertionType
      ;(e !== AssertBegin && e !== AssertEnd) || (t.multiline = !0)
    }
    function s(t, r) {
      var n = t.chars.split("")
      ;(n = n.concat(
        e.flatten2(
          t.classes.map(function (t) {
            return g[t]
          })
        )
      )),
        (n = n.concat(t.ranges)),
        r && (n = o(n)),
        (n = e.classify(n).ranges),
        t.exclude && (n = e.negate(n)),
        (n = e.coalesce(n)),
        (t.explained = n)
    }
    function o(t) {
      return e.flatten2(
        t.map(function (t) {
          var r = e.classify([t, "az", "AZ"]).map[t]
          return e.flatten2(
            r.map(function (t) {
              return /[a-z]/.test(t)
                ? [t, t.toUpperCase()]
                : /[A-Z]/.test(t)
                  ? [t, t.toLowerCase()]
                  : [t]
            })
          )
        })
      )
    }
    function c(t, e) {
      var r,
        n = []
      return (
        (e = e || ["start"]),
        (r = t.reduce(function (t, e) {
          var r = h(e, t)
          return (n = n.concat(r.trans)), r.accepts
        }, e)),
        { accepts: r, trans: n }
      )
    }
    function h(t, e) {
      return t.repeat ? f(t, e) : y[t.type](t, e)
    }
    function u(t, e, r) {
      for (var n, a, i, s = 0, o = t.length; s < o; s++)
        if (((i = t[s]), i.num === e))
          if (i.type === x) a = i.index
          else if (i.type === v) {
            n = i.index
            break
          }
      if (void 0 !== n && void 0 !== a) return r.slice(n, a)
    }
    function l() {
      return "q" + m++
    }
    function f(t, e) {
      var r,
        n,
        a = y[t.type],
        i = [],
        s = t.repeat,
        o = s.min,
        c = s.max
      for (n = o; n--; ) (r = a(t, e)), (i = i.concat(r.trans)), (e = r.accepts)
      var h = [],
        u = [].concat(e)
      if (isFinite(c))
        for (; c > o; c--)
          (r = a(t, e)),
            (h = h.concat(r.trans)),
            (e = r.accepts),
            (u = u.concat(r.accepts))
      else {
        var f = e.slice()
        ;(r = a(t, e)),
          (h = h.concat(r.trans)),
          (u = u.concat(r.accepts)),
          h.push({ from: r.accepts, to: f, charset: !1 })
      }
      var p = [l()]
      return (
        s.nonGreedy || s.possessive
          ? (i.push({ from: u, to: p, charset: !1 }), (i = i.concat(h)))
          : ((i = i.concat(h)), i.push({ from: u, to: p, charset: !1 })),
        { accepts: p, trans: i }
      )
    }
    function p(t, e) {
      e.forEach(function (e) {
        Object.defineProperty(t, e, { writable: !1, enumerable: !0 })
      })
    }
    t.exportConstants(),
      (n.DEBUG = n.D = 1),
      (n.MULTILINE = n.M = 2),
      (n.GLOBAL = n.G = 4),
      (n.IGNORECASE = n.I = 8),
      (n.prototype = {
        toString: function () {
          return "/" + this.source + "/" + this.flags
        },
        test: function (t) {
          return null !== this.exec(t)
        },
        exec: function (t) {
          for (
            var e,
              r = this.getNFA(),
              n = this.global ? this.lastIndex || 0 : 0,
              a = t.length;
            n < a && ((e = r.input(t, n)), !e.acceptable);
            n++
          );
          if (!e || !e.acceptable) return (this.lastIndex = 0), null
          var i = new Array(this.ast.groupCount + 1)
          i[0] = t.slice(n, e.lastIndex + 1)
          for (var s = e.stack, o = 1, c = i.length; o < c; o++)
            i[o] = u(s, o, t)
          return (
            (this.lastIndex = e.lastIndex + 1), (i.index = n), (i.input = t), i
          )
        },
        getNFA: function () {
          if (this._nfa) return this._nfa
          var t,
            e = this.ast
          return (
            (m = 1), (t = c(e.tree)), (t = r(t, this.debug)), (this._nfa = t), t
          )
        }
      })
    var d = e.parseCharset("^\n\r\u2028\u2029"),
      g = {
        d: ["09"],
        w: ["AZ", "az", "09", "_"],
        s: " \f\n\r\t\v釟€釥庘€€鈥佲€傗€冣€勨€呪€嗏€団€堚€夆€奬u2028\u2029鈥仧銆€".split(
          ""
        )
      }
    ;["d", "w", "s"].forEach(function (t) {
      g[t.toUpperCase()] = e.negate(g[t])
    })
    var m = 0,
      v = "GroupCaptureStart",
      x = "GroupCaptureEnd",
      y = (function () {
        function t(t, e) {
          var r,
            n = []
          return (
            t.explained.forEach(function (t) {
              n.push({ from: e, to: (r = [l()]), charset: t }), (e = r)
            }),
            { accepts: r, trans: n }
          )
        }
        function e(t, e) {
          var r = [l()]
          return {
            accepts: r,
            trans: [{ from: e, to: r, charset: t.explained }]
          }
        }
        function n(t, e) {
          var r = [l()]
          return { accepts: r, trans: [{ from: e, to: r, charset: d }] }
        }
        function a(t, e) {
          var r = [l()]
          return { accepts: r, trans: [{ from: e, to: r, charset: !1 }] }
        }
        function i(t, e) {
          var r = [l()],
            n = [
              {
                from: e,
                to: r,
                charset: !1,
                action:
                  !t.nonCapture &&
                  !t.atomicGroup &&
                  function (e, r, n) {
                    e.unshift({ type: v, num: t.num, index: n })
                  }
              }
            ]
          e = r
          var a = c(t.sub, e)
          n = n.concat(a.trans)
          var i = [l()]
          return (
            n.push({
              from: a.accepts,
              to: i,
              charset: !1,
              action:
                !t.nonCapture &&
                !t.atomicGroup &&
                function (e, r, n) {
                  e.unshift({ type: x, num: t.num, index: n })
                }
            }),
            { accepts: i, trans: n }
          )
        }
        function s(t, e) {
          var r = [l()],
            n = t.num
          return {
            accepts: r,
            trans: [
              {
                from: e,
                to: r,
                charset: !1,
                assert: function (t, e, r, a, i) {
                  var s = u(t, n, i)
                  return (
                    void 0 === s && (s = ""),
                    i.slice(r, r + s.length) === s && s.length
                  )
                }
              }
            ]
          }
        }
        function o(t, e) {
          var r = [],
            n = []
          return (
            t.branches.forEach(function (t) {
              var a = c(t, e)
              ;(r = r.concat(a.trans)), (n = n.concat(a.accepts))
            }),
            { trans: r, accepts: n }
          )
        }
        function h(t, e) {
          function n(t) {
            var e = r(c(t.sub, ["start"]))
            return function (t, r, n, a, i) {
              return e.input(i, n, null, t).acceptable
            }
          }
          function a(t) {
            var e = r(c(t.sub, ["start"]))
            return function (t, r, n, a, i) {
              return e.input(i, n, null, t).acceptable
            }
          }
          function i(t, e) {
            return !!(s(t - 1, e) ^ s(t, e))
          }
          function s(t, e) {
            return -1 !== t && t !== e.length && /\w/.test(e[t])
          }
          function o(t, e, r, n, a) {
            return 0 === r || "\n" === a[r - 1]
          }
          function h(t, e, r, n, a) {
            return 0 === r
          }
          function u(t, e, r, n, a) {
            return r === a.length || "\n" === e
          }
          function f(t, e, r, n, a) {
            return r === a.length
          }
          var p
          switch (t.assertionType) {
            case AssertBegin:
              p = t.multiline ? o : h
              break
            case AssertEnd:
              p = t.multiline ? u : f
              break
            case AssertWordBoundary:
              p = function (t, e, r, n, a) {
                return i(r, a)
              }
              break
            case AssertNonWordBoundary:
              p = function (t, e, r, n, a) {
                return !i(r, a)
              }
              break
            case AssertLookahead:
              p = n(t)
              break
            case AssertNegativeLookahead:
              p = (function (t) {
                var e = n(t)
                return function () {
                  return !e.apply(this, arguments)
                }
              })(t)
              break
            case AssertLookbehind:
              p = a(t)
              break
            case AssertNegativeLookbehind:
              p = (function (t) {
                var e = a(t)
                return function () {
                  return !e.apply(this, arguments)
                }
              })(t)
          }
          return (function (t, e, r) {
            var n = [l()]
            return {
              accepts: n,
              trans: [{ from: e, to: n, charset: !1, assert: r }]
            }
          })(t, e, p)
        }
        return {
          assert: h,
          choice: o,
          backref: s,
          group: i,
          empty: a,
          charset: e,
          dot: n,
          exact: t
        }
      })()
    return n
  }),
  "function" != typeof define)
)
  var define = require("amdefine")(module)
if (
  (define("visualize", ["./Kit", "./parse"], function (t, e) {
    function r(t, e) {
      if (((e = e || "normal"), S[t] && S[t][e])) return S[t][e]
      x.attr({ "font-size": t, "font-weight": e })
      var r = x.getBBox()
      return (
        (S[t] = S[t] || {}),
        (S[t][e] = {
          width: r.width / ((x.attr("text").length - 1) / 2),
          height: r.height / 2
        })
      )
    }
    function n(t) {
      x = t
        .text(-1e3, -1e3, "XgfTlM|.q\nXgfTlM|.q")
        .attr({ "font-family": E, "font-size": y })
    }
    function a(t, e, a) {
      a.clear(), a.setSize(0, 0)
      var o = a.rect(0, 0, 0, 0)
      o.attr("fill", w), o.attr("stroke", w), n(a), (k = !!~e.indexOf("m"))
      var c = d(t.tree)
      c.unshift(m("/", A.delimiter)),
        c.unshift(m("RegExp: ")),
        c.push(m("/", A.delimiter)),
        e && c.push(m(e, A.flags))
      var h = r(y, "bold"),
        u = C,
        l = h.height / 2 + C,
        f = 0,
        p = 0
      ;(f = c.reduce(function (t, e) {
        return (e.x = t), (e.y = l), t + e.text.length * h.width
      }, u)),
        (f += C),
        (p = h.height + 2 * C),
        (c = a.add(c)),
        a.setSize(f, h.height + 2 * C)
      var g = i(t.tree, 0, 0)
      ;(p = Math.max(g.height + 3 * C + h.height, p)),
        (f = Math.max(g.width + 2 * C, f)),
        a.setSize(f, p),
        o.attr("width", f),
        o.attr("height", p),
        s(g.items, C, 2 * C + h.height - g.y),
        a.add(g.items)
    }
    function i(t, e, r) {
      return (
        t.unshift({ type: "startPoint" }),
        t.push({ type: "endPoint" }),
        o(t, e, r)
      )
    }
    function s(t, e, r) {
      t.forEach(function (t) {
        t._translate ? t._translate(e, r) : ((t.x += e), (t.y += r))
      })
    }
    function o(t, e, r) {
      var n = [],
        a = [],
        i = 0,
        s = 0,
        o = e,
        c = r,
        h = r
      if (!t.length) return B.empty(null, e, r)
      t.forEach(function (t) {
        var e
        ;(e = t.repeat ? B.repeat(t, o, r) : B[t.type](t, o, r)),
          n.push(e),
          (o += e.width + _),
          (i += e.width),
          (c = Math.min(c, e.y)),
          (h = Math.max(h, e.y + e.height)),
          (a = a.concat(e.items))
      }),
        (s = h - c),
        n.reduce(function (t, e) {
          i += _
          var n = u(t.lineOutX, r, e.lineInX)
          return a.push(n), e
        })
      var l = n[0].lineInX,
        f = n[n.length - 1].lineOutX
      return {
        items: a,
        width: i,
        height: s,
        x: e,
        y: c,
        lineInX: l,
        lineOutX: f
      }
    }
    function c(e, n, a, i, s) {
      e = t.toPrint(e)
      var o = r(y),
        c = e.length * o.width,
        h = o.height + 12,
        u = c + 12,
        l = {
          type: "rect",
          x: n,
          y: a - h / 2,
          width: u,
          height: h,
          stroke: "none",
          fill: i || "transparent"
        },
        f = {
          type: "text",
          x: n + u / 2,
          y: a,
          text: e,
          "font-size": y,
          "font-family": E,
          fill: s || "black"
        }
      return {
        text: f,
        rect: l,
        items: [l, f],
        width: u,
        height: h,
        x: n,
        y: l.y,
        lineInX: n,
        lineOutX: n + u
      }
    }
    function h(t, e, n, a) {
      var i,
        s = r(b),
        o = n.split("\n"),
        c = o.length * s.height
      ;(i =
        o.length > 1
          ? Math.max.apply(
              Math,
              o.map(function (t) {
                return t.length
              })
            )
          : n.length),
        (i *= s.width)
      return {
        label: {
          type: "text",
          x: t,
          y: e - c / 2 - 4,
          text: n,
          "font-size": b,
          "font-family": E,
          fill: a || "#444"
        },
        x: t - i / 2,
        y: e - c - 4,
        width: i,
        height: c + 4
      }
    }
    function u(t, e, r) {
      return {
        type: "path",
        x: t,
        y: e,
        path: ["M", t, e, "H", r],
        "stroke-linecap": "butt",
        "stroke-linejoin": "round",
        stroke: "#333",
        "stroke-width": 2,
        _translate: function (t, e) {
          var r = this.path
          ;(r[1] += t), (r[2] += e), (r[4] += t)
        }
      }
    }
    function l(t, e, r, n) {
      var a,
        i,
        s = t > r ? -1 : 1,
        o = e > n ? -1 : 1
      return (
        Math.abs(e - n) < 15
          ? ((a = [
              "M",
              t,
              e,
              "C",
              t + Math.min(Math.abs(r - t) / 2, 10) * s,
              e,
              r - (r - t) / 2,
              n,
              r,
              n
            ]),
            (i = function (t, e) {
              var r = this.path
              ;(r[1] += t),
                (r[2] += e),
                (r[4] += t),
                (r[5] += e),
                (r[6] += t),
                (r[7] += e),
                (r[8] += t),
                (r[9] += e)
            }))
          : ((a = [
              "M",
              t,
              e,
              "Q",
              t + 10 * s,
              e,
              t + 10 * s,
              e + 10 * o,
              "V",
              Math.abs(e - n) < 20 ? e + 10 * o : n - 10 * o,
              "Q",
              t + 10 * s,
              n,
              t + 10 * s * 2,
              n,
              "H",
              r
            ]),
            (i = function (t, e) {
              var r = this.path
              ;(r[1] += t),
                (r[2] += e),
                (r[4] += t),
                (r[5] += e),
                (r[6] += t),
                (r[7] += e),
                (r[9] += e),
                (r[11] += t),
                (r[12] += e),
                (r[13] += t),
                (r[14] += e),
                (r[16] += t)
            })),
        {
          type: "path",
          path: a,
          "stroke-linecap": "butt",
          "stroke-linejoin": "round",
          stroke: "#333",
          "stroke-width": 2,
          _translate: i
        }
      )
    }
    function f(t, e, r) {
      return {
        items: [
          {
            type: "circle",
            fill: r,
            cx: t + 10,
            cy: e,
            r: 10,
            stroke: "none",
            _translate: function (t, e) {
              ;(this.cx += t), (this.cy += e)
            }
          }
        ],
        width: 20,
        height: 20,
        x: t,
        y: e,
        lineInX: t,
        lineOutX: t + 20
      }
    }
    function p(t) {
      if (Array.isArray(t)) {
        for (var e = t, r = 0; r < e.length; r++) if (!p(e[r])) return !1
        return !0
      }
      var n = t
      return (
        n.type === EMPTY_NODE ||
        (n.type === GROUP_NODE && void 0 === n.num
          ? p(n.sub)
          : n.type === CHOICE_NODE
            ? p(n.branches)
            : void 0)
      )
    }
    function d(e) {
      var r = []
      return (
        e.forEach(function (e) {
          if (e.sub)
            r.push(m("(")),
              e.type === ASSERT_NODE
                ? e.assertionType === AssertLookahead
                  ? r.push(m("?="))
                  : e.assertionType === AssertLookbehind
                    ? r.push(m("?<="))
                    : e.assertionType === AssertNegativeLookbehind
                      ? r.push(m("?<!"))
                      : r.push(m("?!"))
                : e.nonCapture
                  ? r.push(m("?:"))
                  : e.atomicGroup
                    ? r.push(m("?>"))
                    : e.name &&
                      r.push(
                        m(
                          "?" +
                            (e.nameP ? "P" : "") +
                            (e.aops ? "'" : "<") +
                            e.name +
                            (e.aops ? "'" : ">")
                        )
                      ),
              (r = r.concat(d(e.sub))),
              r.push(m(")"))
          else if (e.branches)
            e.branches.map(d).forEach(function (t) {
              ;(r = r.concat(t)), r.push(m("|"))
            }),
              r.pop()
          else {
            var n = A[e.type] || A.defaults
            switch (e.type) {
              case CHARSET_NODE:
                var a = v(e)
                ;(!a || e.exclude) && r.push(m("[")),
                  e.exclude && r.push(m("^", A.charsetExclude)),
                  e.ranges.forEach(function (t) {
                    r.push(m(g(t[0] + "-" + t[1]), A.charsetRange))
                  }),
                  e.classes.forEach(function (t) {
                    r.push(m("\\" + t, A.charsetClass))
                  }),
                  r.push(m(g(e.chars), A.charsetChars)),
                  (!a || e.exclude) && r.push(m("]"))
                break
              default:
                var i = e.raw || ""
                e.repeat && (i = i.slice(0, e.repeat.beginIndex)),
                  (i = t.toPrint(i, !0)),
                  r.push(m(i, n))
            }
          }
          if (e.repeat) {
            var s = e.repeat.min,
              o = e.repeat.max
            0 === s && o === 1 / 0
              ? r.push(m("*"))
              : 1 === s && o === 1 / 0
                ? r.push(m("+"))
                : 0 === s && 1 === o
                  ? r.push(m("?"))
                  : (r.push(m("{")),
                    r.push(m(s)),
                    s === o
                      ? r.push(m("}"))
                      : (r.push(m(",")),
                        isFinite(o) && r.push(m(o)),
                        r.push(m("}")))),
              e.repeat.nonGreedy
                ? r.push(m("?", A.repeatNonGreedy))
                : e.repeat.possessive && r.push(m("+", A.repeatPossessive))
          }
        }),
        r
      )
    }
    function g(e) {
      return (e = t.toPrint(e)), e.replace(/\[/g, "\\[").replace(/\]/g, "\\]")
    }
    function m(t, e) {
      return (
        (e = e || A[t] || A.defaults),
        {
          type: "text",
          "font-size": y,
          "font-family": E,
          text: t + "",
          fill: e,
          "text-anchor": "start",
          "font-weight": "bold"
        }
      )
    }
    function v(t) {
      return !t.chars && !t.ranges.length && 1 === t.classes.length
    }
    e.exportConstants()
    var x,
      y = 16,
      b = 14,
      _ = 16,
      w = "#EEE",
      E = "DejaVu Sans Mono,monospace",
      k = !1,
      C = 10,
      S = {},
      B = {
        startPoint: function (t, e, r) {
          return f(e, r, "r(0.5,0.5)#EFE-green")
        },
        endPoint: function (t, e, r) {
          return f(e, r, "r(0.5,0.5)#FFF-#000")
        },
        empty: function (t, e, r) {
          return {
            items: [u(e, r, e + 10)],
            width: 10,
            height: 2,
            x: e,
            y: r,
            lineInX: e,
            lineOutX: e + 10
          }
        },
        exact: function (t, e, r) {
          return c(t.chars, e, r, "skyblue")
        },
        dot: function (t, e, r) {
          var n = c("AnyCharExceptNewLine", e, r, "DarkGreen", "white")
          return (n.rect.r = 10), (n.rect.tip = "AnyChar except CR LF"), n
        },
        backref: function (t, e, r) {
          var n = c(
            "Backref " + (void 0 !== t.name ? t.name : "#" + t.num),
            e,
            r,
            "navy",
            "white"
          )
          return (n.rect.r = 8), n
        },
        repeat: function (t, e, r) {
          function n(t) {
            return t + (t < 2 ? " time" : " times")
          }
          function a(t, e) {
            var r = this.path
            ;(r[1] += t),
              (r[2] += e),
              (r[4] += t),
              (r[5] += e),
              (r[6] += t),
              (r[7] += e),
              (r[9] += e),
              (r[11] += t),
              (r[12] += e),
              (r[13] += t),
              (r[14] += e),
              (r[16] += t),
              (r[18] += t),
              (r[19] += e),
              (r[20] += t),
              (r[21] += e),
              (r[23] += e),
              (r[25] += t),
              (r[26] += e),
              (r[27] += t),
              (r[28] += e)
          }
          if (p(t)) return B.empty(null, e, r)
          var i = t.repeat,
            o = "",
            c = []
          if (i.min === i.max && 0 === i.min) return B.empty(null, e, r)
          var u = B[t.type](t, e, r),
            l = u.width,
            f = u.height
          if (i.min === i.max && 1 === i.min) return u
          i.min === i.max
            ? (o += n(i.min))
            : ((o += i.min),
              isFinite(i.max)
                ? (o += (i.max - i.min > 1 ? " to " : " or ") + n(i.max))
                : (o += " or more times"))
          var d = 10,
            g = 0,
            m = 10,
            v = u.y + u.height - r,
            x = 20 + u.width
          l = x
          var y
          1 !== i.max
            ? ((v += 10),
              (f += 10),
              (y = {
                type: "path",
                path: [
                  "M",
                  u.x + 10,
                  r,
                  "Q",
                  e,
                  r,
                  e,
                  r + m,
                  "V",
                  r + v - m,
                  "Q",
                  e,
                  r + v,
                  e + m,
                  r + v,
                  "H",
                  e + x - m,
                  "Q",
                  e + x,
                  r + v,
                  e + x,
                  r + v - m,
                  "V",
                  r + m,
                  "Q",
                  e + x,
                  r,
                  u.x + u.width + 10,
                  r
                ],
                _translate: a,
                stroke: "maroon",
                "stroke-width": 2
              }),
              i.nonGreedy
                ? ((y.stroke = "Brown"), (y["stroke-dasharray"] = "-"))
                : i.possessive &&
                  ((y.stroke = "Sienna"), (y["stroke-dasharray"] = "--")),
              c.push(y))
            : (o = !1)
          var b
          if (0 === i.min) {
            var _ = r - u.y + 10,
              w = x + 20
            ;(d += 10),
              (g = -12),
              (l = w),
              (f += 10),
              (b = {
                type: "path",
                path: [
                  "M",
                  e,
                  r,
                  "Q",
                  e + m,
                  r,
                  e + m,
                  r - m,
                  "V",
                  r - _ + m,
                  "Q",
                  e + m,
                  r - _,
                  e + 20,
                  r - _,
                  "H",
                  e + w - 20,
                  "Q",
                  e + w - m,
                  r - _,
                  e + w - m,
                  r - _ + m,
                  "V",
                  r - m,
                  "Q",
                  e + w - m,
                  r,
                  e + w,
                  r
                ],
                _translate: a,
                stroke: i.nonGreedy
                  ? "darkgreen"
                  : i.possessive
                    ? "lightgreen"
                    : "#333",
                "stroke-width": 2
              }),
              y && s([y], 10, 0),
              c.push(b)
          }
          if (o) {
            var E = h(e + l / 2, r, o)
            s([E.label], 0, v + E.height + 4),
              c.push(E.label),
              (f += 4 + E.height)
            var k = (Math.max(E.width, l) - l) / 2
            k && s(c, k, 0), (l = Math.max(E.width, l)), (d += k)
          }
          return (
            s(u.items, d, 0),
            (c = c.concat(u.items)),
            {
              items: c,
              width: l,
              height: f,
              x: e,
              y: u.y + g,
              lineInX: u.lineInX + d,
              lineOutX: u.lineOutX + d
            }
          )
        },
        choice: function (t, e, r) {
          if (p(t)) return B.empty(null, e, r)
          var n = 0,
            a = 0,
            i = t.branches.map(function (t) {
              var i = o(t, e, r)
              return (n += i.height), (a = Math.max(a, i.width)), i
            })
          ;(n += 6 * (i.length - 1) + 8), (a += 40)
          var c = e + a / 2,
            h = r - n / 2 + 4,
            f = e + a,
            d = []
          return (
            i.forEach(function (t) {
              var n = c - t.width / 2
              s(t.items, n - t.x, h - t.y), (d = d.concat(t.items))
              var i = r + h - t.y,
                o = l(e, r, e + 20, i),
                p = l(f, r, e + a - 20, i)
              d.push(o, p),
                e + 20 !== n - t.x + t.lineInX &&
                  d.push(u(e + 20, i, n - t.x + t.lineInX)),
                t.lineOutX + n - t.x != e + a - 20 &&
                  d.push(u(t.lineOutX + n - t.x, i, e + a - 20)),
                (t.x = n),
                (t.y = h),
                (h += t.height + 6)
            }),
            {
              items: d,
              width: a,
              height: n,
              x: e,
              y: r - n / 2,
              lineInX: e,
              lineOutX: f
            }
          )
        },
        charset: function (t, e, r) {
          var n = {
              d: "Digit",
              D: "NonDigit",
              w: "Word",
              W: "NonWord",
              s: "WhiteSpace",
              S: "NonWhiteSpace"
            },
            a = t.exclude ? "Pink" : "Khaki",
            i = t.exclude ? "#C00" : ""
          if (v(t)) {
            var o = c(n[t.classes[0]], e, r, "Green", "white")
            if (((o.rect.r = 5), t.exclude)) {
              var u = h(o.x + o.width / 2, o.y, "None of:", i),
                l = o.items
              l.push(u.label)
              var f = o.width,
                p = Math.max(u.width, o.width),
                d = (p - f) / 2
              return (
                s(l, d, 0),
                {
                  items: l,
                  width: p,
                  height: o.height + u.height,
                  x: Math.min(u.x, o.x),
                  y: u.y,
                  lineInX: d + o.x,
                  lineOutX: d + o.x + o.width
                }
              )
            }
            return o
          }
          if (!t.chars && !t.ranges.length && !t.classes.length) {
            var o = c("AnyChar", e, r, "green", "white")
            return (o.rect.r = 5), o
          }
          var g,
            m,
            x = [],
            p = 0,
            y = 0
          t.chars &&
            ((g = c(t.chars, e, r, "LightSkyBlue", "black")),
            (g.rect.r = 5),
            x.push(g),
            (p = g.width)),
            t.ranges.forEach(function (t) {
              t = t.split("").join("-")
              var n = c(t, e, r, "teal", "white")
              ;(n.rect.r = 5), x.push(n), (p = Math.max(n.width, p))
            }),
            t.classes.forEach(function (t) {
              var a = c(n[t], e, r, "Green", "white")
              ;(a.rect.r = 5), x.push(a), (p = Math.max(a.width, p))
            }),
            (m = x[0].height)
          var b = [],
            _ = []
          x.sort(function (t, e) {
            return e.width - t.width
          }),
            x.forEach(function (t) {
              2 * t.width + 4 > p ? b.push(t) : _.push(t)
            }),
            (x = b)
          for (var w, E; _.length; ) {
            if (((w = _.pop()), !(E = _.pop()))) {
              x.push(w)
              break
            }
            w.width - E.width > 2
              ? (x.push(w), _.push(E))
              : (s(E.items, w.width + 4, 0),
                x.push({
                  items: w.items.concat(E.items),
                  width: w.width + E.width + 4,
                  height: w.height,
                  x: w.x,
                  y: w.y
                }),
                (y -= w.height))
          }
          ;(p += 12), (y = 4 * (x.length - 1) + x.length * m + 12)
          var k = {
              type: "rect",
              x: e,
              y: r - y / 2,
              r: 4,
              width: p,
              height: y,
              stroke: "none",
              fill: a
            },
            C = k.y + 6,
            l = [k]
          x.forEach(function (t) {
            s(t.items, e - t.x + (p - t.width) / 2, C - t.y),
              (l = l.concat(t.items)),
              (C += t.height + 4)
          })
          var u = h(
            k.x + k.width / 2,
            k.y,
            (t.exclude ? "None" : "One") + " of:",
            i
          )
          l.push(u.label)
          var f = p
          p = Math.max(u.width, p)
          var d = (p - f) / 2
          return (
            s(l, d, 0),
            {
              items: l,
              width: p,
              height: y + u.height,
              x: Math.min(u.x, e),
              y: u.y,
              lineInX: d + e,
              lineOutX: d + e + k.width
            }
          )
        },
        group: function (t, e, r) {
          if (p(t)) return B.empty(null, e, r)
          var n = o(t.sub, e, r)
          if (t.num) {
            s(n.items, 10, 0)
            var a = n.width + 20,
              i = n.height + 20,
              c = {
                type: "rect",
                x: e,
                y: n.y - 10,
                r: 6,
                width: a,
                height: i,
                "stroke-dasharray": ".",
                stroke: "silver",
                "stroke-width": 2
              },
              u = h(
                c.x + c.width / 2,
                c.y - 2,
                "Group " + (t.name ? t.name + ", " : "") + "# " + t.num
              ),
              l = n.items.concat([c, u.label]),
              f = Math.max(u.width, a),
              d = (f - a) / 2
            return (
              d && s(l, d, 0),
              {
                items: l,
                width: f,
                height: i + u.height + 4,
                x: e,
                y: u.y,
                lineInX: d + n.lineInX + 10,
                lineOutX: d + n.lineOutX + 10
              }
            )
          }
          return n
        },
        assert: function (t, e, r) {
          var n,
            a = {
              AssertNonWordBoundary: { bg: "maroon", fg: "white" },
              AssertWordBoundary: { bg: "purple", fg: "white" },
              AssertEnd: { bg: "Indigo", fg: "white" },
              AssertBegin: { bg: "Indigo", fg: "white" }
            },
            i = t.assertionType,
            o = i.replace("Assert", "") + "!"
          if ((n = a[i]))
            return (
              !k ||
                ("AssertBegin" !== i && "AssertEnd" !== i) ||
                (o = "Line" + o),
              c(o, e, r, n.bg, n.fg)
            )
          var u, l
          i === AssertLookahead
            ? ((u = "CornflowerBlue"), (l = "darkgreen"), (o = "Followed by:"))
            : i === AssertNegativeLookahead
              ? ((u = "#F63"), (l = "Purple"), (o = "Not followed by:"))
              : i === AssertLookbehind
                ? ((u = "LightSeaGreen"), (l = "Brown"), (o = "Preceded by:"))
                : i === AssertNegativeLookbehind &&
                  ((u = "#F69"),
                  (l = "MediumVioletRed"),
                  (o = "Not preceded by:"))
          var f = B.group(t, e, r),
            p = f.height + 16,
            d = f.width + 16,
            g = {
              type: "rect",
              x: e,
              y: f.y - 8,
              r: 6,
              width: d,
              height: p,
              "stroke-dasharray": "-",
              stroke: u,
              "stroke-width": 2
            },
            m = h(g.x + d / 2, g.y, o, l),
            v = Math.max(d, m.width),
            x = (v - d) / 2
          return (
            s(f.items, x + 8, 0),
            x && s([g, m.label], x, 0),
            {
              items: f.items.concat([g, m.label]),
              width: v,
              height: g.height + m.height,
              x: e,
              y: m.y,
              lineInX: x + f.lineInX + 8,
              lineOutX: x + f.lineOutX + 8
            }
          )
        }
      },
      A = {
        delimiter: "Indigo",
        flags: "darkgreen",
        exact: "#334",
        dot: "darkblue",
        backref: "teal",
        $: "purple",
        "^": "purple",
        "\\b": "#F30",
        "\\B": "#F30",
        "(": "blue",
        ")": "blue",
        "?=": "darkgreen",
        "?!": "red",
        "?<!": "brown",
        "?<=": "darkcyan",
        "?:": "grey",
        "[": "navy",
        "]": "navy",
        "|": "blue",
        "{": "maroon",
        ",": "maroon",
        "}": "maroon",
        "*": "maroon",
        "+": "maroon",
        "?": "maroon",
        repeatNonGreedy: "#F61",
        repeatPossessive: "#FC1",
        defaults: "black",
        charsetRange: "olive",
        charsetClass: "navy",
        charsetExclude: "red",
        charsetChars: "#534"
      }
    return a
  }),
  (function (t) {
    var e,
      r,
      n = "hasOwnProperty",
      a = /[\.\/]/,
      i = function () {},
      s = function (t, e) {
        return t - e
      },
      o = { n: {} },
      c = function (t, n) {
        t = String(t)
        var a,
          i = r,
          o = Array.prototype.slice.call(arguments, 2),
          h = c.listeners(t),
          u = 0,
          l = [],
          f = {},
          p = [],
          d = e
        ;(e = t), (r = 0)
        for (var g = 0, m = h.length; g < m; g++)
          "zIndex" in h[g] &&
            (l.push(h[g].zIndex), h[g].zIndex < 0 && (f[h[g].zIndex] = h[g]))
        for (l.sort(s); l[u] < 0; )
          if (((a = f[l[u++]]), p.push(a.apply(n, o)), r)) return (r = i), p
        for (g = 0; g < m; g++)
          if ("zIndex" in (a = h[g]))
            if (a.zIndex == l[u]) {
              if ((p.push(a.apply(n, o)), r)) break
              do {
                if ((u++, (a = f[l[u]]), a && p.push(a.apply(n, o)), r)) break
              } while (a)
            } else f[a.zIndex] = a
          else if ((p.push(a.apply(n, o)), r)) break
        return (r = i), (e = d), p.length ? p : null
      }
    ;(c._events = o),
      (c.listeners = function (t) {
        var e,
          r,
          n,
          i,
          s,
          c,
          h,
          u,
          l = t.split(a),
          f = o,
          p = [f],
          d = []
        for (i = 0, s = l.length; i < s; i++) {
          for (u = [], c = 0, h = p.length; c < h; c++)
            for (f = p[c].n, r = [f[l[i]], f["*"]], n = 2; n--; )
              (e = r[n]) && (u.push(e), (d = d.concat(e.f || [])))
          p = u
        }
        return d
      }),
      (c.on = function (t, e) {
        if (((t = String(t)), "function" != typeof e)) return function () {}
        for (var r = t.split(a), n = o, s = 0, c = r.length; s < c; s++)
          (n = n.n),
            (n = (n.hasOwnProperty(r[s]) && n[r[s]]) || (n[r[s]] = { n: {} }))
        for (n.f = n.f || [], s = 0, c = n.f.length; s < c; s++)
          if (n.f[s] == e) return i
        return (
          n.f.push(e),
          function (t) {
            ;+t == +t && (e.zIndex = +t)
          }
        )
      }),
      (c.f = function (t) {
        var e = [].slice.call(arguments, 1)
        return function () {
          c.apply(null, [t, null].concat(e).concat([].slice.call(arguments, 0)))
        }
      }),
      (c.stop = function () {
        r = 1
      }),
      (c.nt = function (t) {
        return t ? new RegExp("(?:\\.|\\/|^)" + t + "(?:\\.|\\/|$)").test(e) : e
      }),
      (c.nts = function () {
        return e.split(a)
      }),
      (c.off = c.unbind =
        function (t, e) {
          if (!t) return void (c._events = o = { n: {} })
          var r,
            i,
            s,
            h,
            u,
            l,
            f,
            p = t.split(a),
            d = [o]
          for (h = 0, u = p.length; h < u; h++)
            for (l = 0; l < d.length; l += s.length - 2) {
              if (((s = [l, 1]), (r = d[l].n), "*" != p[h]))
                r[p[h]] && s.push(r[p[h]])
              else for (i in r) r[n](i) && s.push(r[i])
              d.splice.apply(d, s)
            }
          for (h = 0, u = d.length; h < u; h++)
            for (r = d[h]; r.n; ) {
              if (e) {
                if (r.f) {
                  for (l = 0, f = r.f.length; l < f; l++)
                    if (r.f[l] == e) {
                      r.f.splice(l, 1)
                      break
                    }
                  !r.f.length && delete r.f
                }
                for (i in r.n)
                  if (r.n[n](i) && r.n[i].f) {
                    var g = r.n[i].f
                    for (l = 0, f = g.length; l < f; l++)
                      if (g[l] == e) {
                        g.splice(l, 1)
                        break
                      }
                    !g.length && delete r.n[i].f
                  }
              } else {
                delete r.f
                for (i in r.n) r.n[n](i) && r.n[i].f && delete r.n[i].f
              }
              r = r.n
            }
        }),
      (c.once = function (t, e) {
        var r = function () {
          return c.unbind(t, r), e.apply(this, arguments)
        }
        return c.on(t, r)
      }),
      (c.version = "0.4.2"),
      (c.toString = function () {
        return "You are running Eve 0.4.2"
      }),
      "undefined" != typeof module && module.exports
        ? (module.exports = c)
        : void 0 !== define
          ? define("eve", [], function () {
              return c
            })
          : (t.eve = c)
  })(window || this),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("libs/raphael", ["eve"], function (r) {
          return e(t, r)
        })
      : e(t, t.eve)
  })(this, function (t, e) {
    function r(t) {
      if (r.is(t, "function")) return b ? t() : e.on("raphael.DOMload", t)
      if (r.is(t, W))
        return r._engine.create[N](r, t.splice(0, 3 + r.is(t[0], H))).add(t)
      var n = Array.prototype.slice.call(arguments, 0)
      if (r.is(n[n.length - 1], "function")) {
        var a = n.pop()
        return b
          ? a.call(r._engine.create[N](r, n))
          : e.on("raphael.DOMload", function () {
              a.call(r._engine.create[N](r, n))
            })
      }
      return r._engine.create[N](r, arguments)
    }
    function n(t) {
      if ("function" == typeof t || Object(t) !== t) return t
      var e = new t.constructor()
      for (var r in t) t[C](r) && (e[r] = n(t[r]))
      return e
    }
    function a(t, e) {
      for (var r = 0, n = t.length; r < n; r++)
        if (t[r] === e) return t.push(t.splice(r, 1)[0])
    }
    function i(t, e, r) {
      function n() {
        var i = Array.prototype.slice.call(arguments, 0),
          s = i.join("鈵€"),
          o = (n.cache = n.cache || {}),
          c = (n.count = n.count || [])
        return o[C](s)
          ? (a(c, s), r ? r(o[s]) : o[s])
          : (c.length >= 1e3 && delete o[c.shift()],
            c.push(s),
            (o[s] = t[N](e, i)),
            r ? r(o[s]) : o[s])
      }
      return n
    }
    function s() {
      return this.hex
    }
    function o(t, e) {
      for (var r = [], n = 0, a = t.length; a - 2 * !e > n; n += 2) {
        var i = [
          { x: +t[n - 2], y: +t[n - 1] },
          { x: +t[n], y: +t[n + 1] },
          { x: +t[n + 2], y: +t[n + 3] },
          { x: +t[n + 4], y: +t[n + 5] }
        ]
        e
          ? n
            ? a - 4 == n
              ? (i[3] = { x: +t[0], y: +t[1] })
              : a - 2 == n &&
                ((i[2] = { x: +t[0], y: +t[1] }),
                (i[3] = { x: +t[2], y: +t[3] }))
            : (i[0] = { x: +t[a - 2], y: +t[a - 1] })
          : a - 4 == n
            ? (i[3] = i[2])
            : n || (i[0] = { x: +t[n], y: +t[n + 1] }),
          r.push([
            "C",
            (-i[0].x + 6 * i[1].x + i[2].x) / 6,
            (-i[0].y + 6 * i[1].y + i[2].y) / 6,
            (i[1].x + 6 * i[2].x - i[3].x) / 6,
            (i[1].y + 6 * i[2].y - i[3].y) / 6,
            i[2].x,
            i[2].y
          ])
      }
      return r
    }
    function c(t, e, r, n, a) {
      return (
        t * (t * (-3 * e + 9 * r - 9 * n + 3 * a) + 6 * e - 12 * r + 6 * n) -
        3 * e +
        3 * r
      )
    }
    function h(t, e, r, n, a, i, s, o, h) {
      null == h && (h = 1), (h = h > 1 ? 1 : h < 0 ? 0 : h)
      for (
        var u = h / 2,
          l = [
            -0.1252, 0.1252, -0.3678, 0.3678, -0.5873, 0.5873, -0.7699, 0.7699,
            -0.9041, 0.9041, -0.9816, 0.9816
          ],
          f = [
            0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601,
            0.1069, 0.1069, 0.0472, 0.0472
          ],
          p = 0,
          d = 0;
        d < 12;
        d++
      ) {
        var g = u * l[d] + u,
          m = c(g, t, r, a, s),
          v = c(g, e, n, i, o),
          x = m * m + v * v
        p += f[d] * z.sqrt(x)
      }
      return u * p
    }
    function u(t, e, r, n, a, i, s, o, c) {
      if (!(c < 0 || h(t, e, r, n, a, i, s, o) < c)) {
        var u,
          l = 0.5,
          f = 1 - l
        for (u = h(t, e, r, n, a, i, s, o, f); U(u - c) > 0.01; )
          (l /= 2),
            (f += (u < c ? 1 : -1) * l),
            (u = h(t, e, r, n, a, i, s, o, f))
        return f
      }
    }
    function l(t, e, r, n, a, i, s, o) {
      if (
        !(
          G(t, r) < j(a, s) ||
          j(t, r) > G(a, s) ||
          G(e, n) < j(i, o) ||
          j(e, n) > G(i, o)
        )
      ) {
        var c = (t * n - e * r) * (a - s) - (t - r) * (a * o - i * s),
          h = (t * n - e * r) * (i - o) - (e - n) * (a * o - i * s),
          u = (t - r) * (i - o) - (e - n) * (a - s)
        if (u) {
          var l = c / u,
            f = h / u,
            p = +l.toFixed(2),
            d = +f.toFixed(2)
          if (
            !(
              p < +j(t, r).toFixed(2) ||
              p > +G(t, r).toFixed(2) ||
              p < +j(a, s).toFixed(2) ||
              p > +G(a, s).toFixed(2) ||
              d < +j(e, n).toFixed(2) ||
              d > +G(e, n).toFixed(2) ||
              d < +j(i, o).toFixed(2) ||
              d > +G(i, o).toFixed(2)
            )
          )
            return { x: l, y: f }
        }
      }
    }
    function f(t, e, n) {
      var a = r.bezierBBox(t),
        i = r.bezierBBox(e)
      if (!r.isBBoxIntersect(a, i)) return n ? 0 : []
      for (
        var s = h.apply(0, t),
          o = h.apply(0, e),
          c = G(~~(s / 5), 1),
          u = G(~~(o / 5), 1),
          f = [],
          p = [],
          d = {},
          g = n ? 0 : [],
          m = 0;
        m < c + 1;
        m++
      ) {
        var v = r.findDotsAtSegment.apply(r, t.concat(m / c))
        f.push({ x: v.x, y: v.y, t: m / c })
      }
      for (m = 0; m < u + 1; m++)
        (v = r.findDotsAtSegment.apply(r, e.concat(m / u))),
          p.push({ x: v.x, y: v.y, t: m / u })
      for (m = 0; m < c; m++)
        for (var x = 0; x < u; x++) {
          var y = f[m],
            b = f[m + 1],
            _ = p[x],
            w = p[x + 1],
            E = U(b.x - y.x) < 0.001 ? "y" : "x",
            k = U(w.x - _.x) < 0.001 ? "y" : "x",
            C = l(y.x, y.y, b.x, b.y, _.x, _.y, w.x, w.y)
          if (C) {
            if (d[C.x.toFixed(4)] == C.y.toFixed(4)) continue
            d[C.x.toFixed(4)] = C.y.toFixed(4)
            var S = y.t + U((C[E] - y[E]) / (b[E] - y[E])) * (b.t - y.t),
              B = _.t + U((C[k] - _[k]) / (w[k] - _[k])) * (w.t - _.t)
            S >= 0 &&
              S <= 1.001 &&
              B >= 0 &&
              B <= 1.001 &&
              (n ? g++ : g.push({ x: C.x, y: C.y, t1: j(S, 1), t2: j(B, 1) }))
          }
        }
      return g
    }
    function p(t, e, n) {
      ;(t = r._path2curve(t)), (e = r._path2curve(e))
      for (
        var a, i, s, o, c, h, u, l, p, d, g = n ? 0 : [], m = 0, v = t.length;
        m < v;
        m++
      ) {
        var x = t[m]
        if ("M" == x[0]) (a = c = x[1]), (i = h = x[2])
        else {
          "C" == x[0]
            ? ((p = [a, i].concat(x.slice(1))), (a = p[6]), (i = p[7]))
            : ((p = [a, i, a, i, c, h, c, h]), (a = c), (i = h))
          for (var y = 0, b = e.length; y < b; y++) {
            var _ = e[y]
            if ("M" == _[0]) (s = u = _[1]), (o = l = _[2])
            else {
              "C" == _[0]
                ? ((d = [s, o].concat(_.slice(1))), (s = d[6]), (o = d[7]))
                : ((d = [s, o, s, o, u, l, u, l]), (s = u), (o = l))
              var w = f(p, d, n)
              if (n) g += w
              else {
                for (var E = 0, k = w.length; E < k; E++)
                  (w[E].segment1 = m),
                    (w[E].segment2 = y),
                    (w[E].bez1 = p),
                    (w[E].bez2 = d)
                g = g.concat(w)
              }
            }
          }
        }
      }
      return g
    }
    function d(t, e, r, n, a, i) {
      null != t
        ? ((this.a = +t),
          (this.b = +e),
          (this.c = +r),
          (this.d = +n),
          (this.e = +a),
          (this.f = +i))
        : ((this.a = 1),
          (this.b = 0),
          (this.c = 0),
          (this.d = 1),
          (this.e = 0),
          (this.f = 0))
    }
    function g() {
      return this.x + P + this.y + P + this.width + " 脳 " + this.height
    }
    function m(t, e, r, n, a, i) {
      function s(t) {
        return ((u * t + h) * t + c) * t
      }
      function o(t, e) {
        var r, n, a, i, o, l
        for (a = t, l = 0; l < 8; l++) {
          if (((i = s(a) - t), U(i) < e)) return a
          if (((o = (3 * u * a + 2 * h) * a + c), U(o) < 1e-6)) break
          a -= i / o
        }
        if (((r = 0), (n = 1), (a = t) < r)) return r
        if (a > n) return n
        for (; r < n; ) {
          if (((i = s(a)), U(i - t) < e)) return a
          t > i ? (r = a) : (n = a), (a = (n - r) / 2 + r)
        }
        return a
      }
      var c = 3 * e,
        h = 3 * (n - e) - c,
        u = 1 - c - h,
        l = 3 * r,
        f = 3 * (a - r) - l,
        p = 1 - l - f
      return (function (t, e) {
        var r = o(t, e)
        return ((p * r + f) * r + l) * r
      })(t, 1 / (200 * i))
    }
    function v(t, e) {
      var r = [],
        n = {}
      if (((this.ms = e), (this.times = 1), t)) {
        for (var a in t) t[C](a) && ((n[K(a)] = t[a]), r.push(K(a)))
        r.sort(ut)
      }
      ;(this.anim = n), (this.top = r[r.length - 1]), (this.percents = r)
    }
    function x(t, n, a, i, s, o) {
      a = K(a)
      var c,
        h,
        u,
        l,
        f,
        p,
        g = t.ms,
        v = {},
        x = {},
        y = {}
      if (i)
        for (_ = 0, E = oe.length; _ < E; _++) {
          var b = oe[_]
          if (b.el.id == n.id && b.anim == t) {
            b.percent != a ? (oe.splice(_, 1), (u = 1)) : (h = b),
              n.attr(b.totalOrigin)
            break
          }
        }
      else i = +x
      for (var _ = 0, E = t.percents.length; _ < E; _++) {
        if (t.percents[_] == a || t.percents[_] > i * t.top) {
          ;(a = t.percents[_]),
            (f = t.percents[_ - 1] || 0),
            (g = (g / t.top) * (a - f)),
            (l = t.percents[_ + 1]),
            (c = t.anim[a])
          break
        }
        i && n.attr(t.anim[t.percents[_]])
      }
      if (c) {
        if (h) (h.initstatus = i), (h.start = new Date() - h.ms * i)
        else {
          for (var k in c)
            if (c[C](k) && (rt[C](k) || n.paper.customAttributes[C](k)))
              switch (
                ((v[k] = n.attr(k)),
                null == v[k] && (v[k] = et[k]),
                (x[k] = c[k]),
                rt[k])
              ) {
                case H:
                  y[k] = (x[k] - v[k]) / g
                  break
                case "colour":
                  v[k] = r.getRGB(v[k])
                  var S = r.getRGB(x[k])
                  y[k] = {
                    r: (S.r - v[k].r) / g,
                    g: (S.g - v[k].g) / g,
                    b: (S.b - v[k].b) / g
                  }
                  break
                case "path":
                  var B = It(v[k], x[k]),
                    A = B[1]
                  for (
                    v[k] = B[0], y[k] = [], _ = 0, E = v[k].length;
                    _ < E;
                    _++
                  ) {
                    y[k][_] = [0]
                    for (var N = 1, O = v[k][_].length; N < O; N++)
                      y[k][_][N] = (A[_][N] - v[k][_][N]) / g
                  }
                  break
                case "transform":
                  var R = n._,
                    P = Gt(R[k], x[k])
                  if (P)
                    for (
                      v[k] = P.from,
                        x[k] = P.to,
                        y[k] = [],
                        y[k].real = !0,
                        _ = 0,
                        E = v[k].length;
                      _ < E;
                      _++
                    )
                      for (
                        y[k][_] = [v[k][_][0]], N = 1, O = v[k][_].length;
                        N < O;
                        N++
                      )
                        y[k][_][N] = (x[k][_][N] - v[k][_][N]) / g
                  else {
                    var F = n.matrix || new d(),
                      D = {
                        _: { transform: R.transform },
                        getBBox: function () {
                          return n.getBBox(1)
                        }
                      }
                    ;(v[k] = [F.a, F.b, F.c, F.d, F.e, F.f]),
                      Lt(D, x[k]),
                      (x[k] = D._.transform),
                      (y[k] = [
                        (D.matrix.a - F.a) / g,
                        (D.matrix.b - F.b) / g,
                        (D.matrix.c - F.c) / g,
                        (D.matrix.d - F.d) / g,
                        (D.matrix.e - F.e) / g,
                        (D.matrix.f - F.f) / g
                      ])
                  }
                  break
                case "csv":
                  var L = M(c[k])[I](w),
                    z = M(v[k])[I](w)
                  if ("clip-rect" == k)
                    for (v[k] = z, y[k] = [], _ = z.length; _--; )
                      y[k][_] = (L[_] - v[k][_]) / g
                  x[k] = L
                  break
                default:
                  for (
                    L = [][T](c[k]),
                      z = [][T](v[k]),
                      y[k] = [],
                      _ = n.paper.customAttributes[k].length;
                    _--;

                  )
                    y[k][_] = ((L[_] || 0) - (z[_] || 0)) / g
              }
          var G = c.easing,
            j = r.easing_formulas[G]
          if (!j)
            if ((j = M(G).match($)) && 5 == j.length) {
              var U = j
              j = function (t) {
                return m(t, +U[1], +U[2], +U[3], +U[4], g)
              }
            } else j = ft
          if (
            ((p = c.start || t.start || +new Date()),
            (b = {
              anim: t,
              percent: a,
              timestamp: p,
              start: p + (t.del || 0),
              status: 0,
              initstatus: i || 0,
              stop: !1,
              ms: g,
              easing: j,
              from: v,
              diff: y,
              to: x,
              el: n,
              callback: c.callback,
              prev: f,
              next: l,
              repeat: o || t.times,
              origin: n.attr(),
              totalOrigin: s
            }),
            oe.push(b),
            i &&
              !h &&
              !u &&
              ((b.stop = !0), (b.start = new Date() - g * i), 1 == oe.length))
          )
            return he()
          u && (b.start = new Date() - b.ms * i), 1 == oe.length && ce(he)
        }
        e("raphael.anim.start." + n.id, n, t)
      }
    }
    function y(t) {
      for (var e = 0; e < oe.length; e++)
        oe[e].el.paper == t && oe.splice(e--, 1)
    }
    ;(r.version = "2.1.2"), (r.eve = e)
    var b,
      _,
      w = /[, ]+/,
      E = { circle: 1, rect: 1, path: 1, ellipse: 1, text: 1, image: 1 },
      k = /\{(\d+)\}/g,
      C = "hasOwnProperty",
      S = { doc: document, win: t },
      B = {
        was: Object.prototype[C].call(S.win, "Raphael"),
        is: S.win.Raphael
      },
      A = function () {
        this.ca = this.customAttributes = {}
      },
      N = "apply",
      T = "concat",
      O =
        "ontouchstart" in S.win ||
        (S.win.DocumentTouch && S.doc instanceof DocumentTouch),
      R = "",
      P = " ",
      M = String,
      I = "split",
      F =
        "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[
          I
        ](P),
      D = {
        mousedown: "touchstart",
        mousemove: "touchmove",
        mouseup: "touchend"
      },
      L = M.prototype.toLowerCase,
      z = Math,
      G = z.max,
      j = z.min,
      U = z.abs,
      X = z.pow,
      q = z.PI,
      H = "number",
      W = "array",
      V = Object.prototype.toString,
      Q =
        ((r._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i),
        /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i),
      Y = { NaN: 1, Infinity: 1, "-Infinity": 1 },
      $ = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
      Z = z.round,
      K = parseFloat,
      J = parseInt,
      tt = M.prototype.toUpperCase,
      et = (r._availableAttrs = {
        "arrow-end": "none",
        "arrow-start": "none",
        blur: 0,
        "clip-rect": "0 0 1e9 1e9",
        cursor: "default",
        cx: 0,
        cy: 0,
        fill: "#fff",
        "fill-opacity": 1,
        font: '10px "Arial"',
        "font-family": '"Arial"',
        "font-size": "10",
        "font-style": "normal",
        "font-weight": 400,
        gradient: 0,
        height: 0,
        href: "http://raphaeljs.com/",
        "letter-spacing": 0,
        opacity: 1,
        path: "M0,0",
        r: 0,
        rx: 0,
        ry: 0,
        src: "",
        stroke: "#000",
        "stroke-dasharray": "",
        "stroke-linecap": "butt",
        "stroke-linejoin": "butt",
        "stroke-miterlimit": 0,
        "stroke-opacity": 1,
        "stroke-width": 1,
        target: "_blank",
        "text-anchor": "middle",
        title: "Raphael",
        transform: "",
        width: 0,
        x: 0,
        y: 0
      }),
      rt = (r._availableAnimAttrs = {
        blur: H,
        "clip-rect": "csv",
        cx: H,
        cy: H,
        fill: "colour",
        "fill-opacity": H,
        "font-size": H,
        height: H,
        opacity: H,
        path: "path",
        r: H,
        rx: H,
        ry: H,
        stroke: "colour",
        "stroke-opacity": H,
        "stroke-width": H,
        transform: "transform",
        width: H,
        x: H,
        y: H
      }),
      nt =
        /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
      at = { hs: 1, rg: 1 },
      it = /,?([achlmqrstvxz]),?/gi,
      st =
        /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,
      ot =
        /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,
      ct =
        /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi,
      ht =
        ((r._radial_gradient =
          /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/),
        {}),
      ut = function (t, e) {
        return K(t) - K(e)
      },
      lt = function () {},
      ft = function (t) {
        return t
      },
      pt = (r._rectPath = function (t, e, r, n, a) {
        return a
          ? [
              ["M", t + a, e],
              ["l", r - 2 * a, 0],
              ["a", a, a, 0, 0, 1, a, a],
              ["l", 0, n - 2 * a],
              ["a", a, a, 0, 0, 1, -a, a],
              ["l", 2 * a - r, 0],
              ["a", a, a, 0, 0, 1, -a, -a],
              ["l", 0, 2 * a - n],
              ["a", a, a, 0, 0, 1, a, -a],
              ["z"]
            ]
          : [["M", t, e], ["l", r, 0], ["l", 0, n], ["l", -r, 0], ["z"]]
      }),
      dt = function (t, e, r, n) {
        return (
          null == n && (n = r),
          [
            ["M", t, e],
            ["m", 0, -n],
            ["a", r, n, 0, 1, 1, 0, 2 * n],
            ["a", r, n, 0, 1, 1, 0, -2 * n],
            ["z"]
          ]
        )
      },
      gt = (r._getPath = {
        path: function (t) {
          return t.attr("path")
        },
        circle: function (t) {
          var e = t.attrs
          return dt(e.cx, e.cy, e.r)
        },
        ellipse: function (t) {
          var e = t.attrs
          return dt(e.cx, e.cy, e.rx, e.ry)
        },
        rect: function (t) {
          var e = t.attrs
          return pt(e.x, e.y, e.width, e.height, e.r)
        },
        image: function (t) {
          var e = t.attrs
          return pt(e.x, e.y, e.width, e.height)
        },
        text: function (t) {
          var e = t._getBBox()
          return pt(e.x, e.y, e.width, e.height)
        },
        set: function (t) {
          var e = t._getBBox()
          return pt(e.x, e.y, e.width, e.height)
        }
      }),
      mt = (r.mapPath = function (t, e) {
        if (!e) return t
        var r, n, a, i, s, o, c
        for (t = It(t), a = 0, s = t.length; a < s; a++)
          for (c = t[a], i = 1, o = c.length; i < o; i += 2)
            (r = e.x(c[i], c[i + 1])),
              (n = e.y(c[i], c[i + 1])),
              (c[i] = r),
              (c[i + 1] = n)
        return t
      })
    if (
      ((r._g = S),
      (r.type =
        S.win.SVGAngle ||
        S.doc.implementation.hasFeature(
          "http://www.w3.org/TR/SVG11/feature#BasicStructure",
          "1.1"
        )
          ? "SVG"
          : "VML"),
      "VML" == r.type)
    ) {
      var vt,
        xt = S.doc.createElement("div")
      if (
        ((xt.innerHTML = '<v:shape adj="1"/>'),
        (vt = xt.firstChild),
        (vt.style.behavior = "url(#default#VML)"),
        !vt || "object" != typeof vt.adj)
      )
        return (r.type = R)
      xt = null
    }
    ;(r.svg = !(r.vml = "VML" == r.type)),
      (r._Paper = A),
      (r.fn = _ = A.prototype = r.prototype),
      (r._id = 0),
      (r._oid = 0),
      (r.is = function (t, e) {
        return (
          (e = L.call(e)),
          "finite" == e
            ? !Y[C](+t)
            : "array" == e
              ? t instanceof Array
              : ("null" == e && null === t) ||
                (e == typeof t && null !== t) ||
                ("object" == e && t === Object(t)) ||
                ("array" == e && Array.isArray && Array.isArray(t)) ||
                V.call(t).slice(8, -1).toLowerCase() == e
        )
      }),
      (r.angle = function (t, e, n, a, i, s) {
        if (null == i) {
          var o = t - n,
            c = e - a
          return o || c ? (180 + (180 * z.atan2(-c, -o)) / q + 360) % 360 : 0
        }
        return r.angle(t, e, i, s) - r.angle(n, a, i, s)
      }),
      (r.rad = function (t) {
        return ((t % 360) * q) / 180
      }),
      (r.deg = function (t) {
        return ((180 * t) / q) % 360
      }),
      (r.snapTo = function (t, e, n) {
        if (((n = r.is(n, "finite") ? n : 10), r.is(t, W))) {
          for (var a = t.length; a--; ) if (U(t[a] - e) <= n) return t[a]
        } else {
          t = +t
          var i = e % t
          if (i < n) return e - i
          if (i > t - n) return e - i + t
        }
        return e
      })
    r.createUUID = (function (t, e) {
      return function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
          .replace(t, e)
          .toUpperCase()
      }
    })(/[xy]/g, function (t) {
      var e = (16 * z.random()) | 0
      return ("x" == t ? e : (3 & e) | 8).toString(16)
    })
    r.setWindow = function (t) {
      e("raphael.setWindow", r, S.win, t),
        (S.win = t),
        (S.doc = S.win.document),
        r._engine.initWin && r._engine.initWin(S.win)
    }
    var yt = function (t) {
        if (r.vml) {
          var e,
            n = /^\s+|\s+$/g
          try {
            var a = new ActiveXObject("htmlfile")
            a.write("<body>"), a.close(), (e = a.body)
          } catch (t) {
            e = createPopup().document.body
          }
          var s = e.createTextRange()
          yt = i(function (t) {
            try {
              e.style.color = M(t).replace(n, R)
              var r = s.queryCommandValue("ForeColor")
              return (
                (r = ((255 & r) << 16) | (65280 & r) | ((16711680 & r) >>> 16)),
                "#" + ("000000" + r.toString(16)).slice(-6)
              )
            } catch (t) {
              return "none"
            }
          })
        } else {
          var o = S.doc.createElement("i")
          ;(o.title = "Rapha毛l Colour Picker"),
            (o.style.display = "none"),
            S.doc.body.appendChild(o),
            (yt = i(function (t) {
              return (
                (o.style.color = t),
                S.doc.defaultView
                  .getComputedStyle(o, R)
                  .getPropertyValue("color")
              )
            }))
        }
        return yt(t)
      },
      bt = function () {
        return "hsb(" + [this.h, this.s, this.b] + ")"
      },
      _t = function () {
        return "hsl(" + [this.h, this.s, this.l] + ")"
      },
      wt = function () {
        return this.hex
      },
      Et = function (t, e, n) {
        if (
          (null == e &&
            r.is(t, "object") &&
            "r" in t &&
            "g" in t &&
            "b" in t &&
            ((n = t.b), (e = t.g), (t = t.r)),
          null == e && r.is(t, "string"))
        ) {
          var a = r.getRGB(t)
          ;(t = a.r), (e = a.g), (n = a.b)
        }
        return (
          (t > 1 || e > 1 || n > 1) && ((t /= 255), (e /= 255), (n /= 255)),
          [t, e, n]
        )
      },
      kt = function (t, e, n, a) {
        ;(t *= 255), (e *= 255), (n *= 255)
        var i = { r: t, g: e, b: n, hex: r.rgb(t, e, n), toString: wt }
        return r.is(a, "finite") && (i.opacity = a), i
      }
    ;(r.color = function (t) {
      var e
      return (
        r.is(t, "object") && "h" in t && "s" in t && "b" in t
          ? ((e = r.hsb2rgb(t)),
            (t.r = e.r),
            (t.g = e.g),
            (t.b = e.b),
            (t.hex = e.hex))
          : r.is(t, "object") && "h" in t && "s" in t && "l" in t
            ? ((e = r.hsl2rgb(t)),
              (t.r = e.r),
              (t.g = e.g),
              (t.b = e.b),
              (t.hex = e.hex))
            : (r.is(t, "string") && (t = r.getRGB(t)),
              r.is(t, "object") && "r" in t && "g" in t && "b" in t
                ? ((e = r.rgb2hsl(t)),
                  (t.h = e.h),
                  (t.s = e.s),
                  (t.l = e.l),
                  (e = r.rgb2hsb(t)),
                  (t.v = e.b))
                : ((t = { hex: "none" }),
                  (t.r = t.g = t.b = t.h = t.s = t.v = t.l = -1))),
        (t.toString = wt),
        t
      )
    }),
      (r.hsb2rgb = function (t, e, r, n) {
        this.is(t, "object") &&
          "h" in t &&
          "s" in t &&
          "b" in t &&
          ((r = t.b), (e = t.s), (t = t.h), (n = t.o)),
          (t *= 360)
        var a, i, s, o, c
        return (
          (t = (t % 360) / 60),
          (c = r * e),
          (o = c * (1 - U((t % 2) - 1))),
          (a = i = s = r - c),
          (t = ~~t),
          (a += [c, o, 0, 0, o, c][t]),
          (i += [o, c, c, o, 0, 0][t]),
          (s += [0, 0, o, c, c, o][t]),
          kt(a, i, s, n)
        )
      }),
      (r.hsl2rgb = function (t, e, r, n) {
        this.is(t, "object") &&
          "h" in t &&
          "s" in t &&
          "l" in t &&
          ((r = t.l), (e = t.s), (t = t.h)),
          (t > 1 || e > 1 || r > 1) && ((t /= 360), (e /= 100), (r /= 100)),
          (t *= 360)
        var a, i, s, o, c
        return (
          (t = (t % 360) / 60),
          (c = 2 * e * (r < 0.5 ? r : 1 - r)),
          (o = c * (1 - U((t % 2) - 1))),
          (a = i = s = r - c / 2),
          (t = ~~t),
          (a += [c, o, 0, 0, o, c][t]),
          (i += [o, c, c, o, 0, 0][t]),
          (s += [0, 0, o, c, c, o][t]),
          kt(a, i, s, n)
        )
      }),
      (r.rgb2hsb = function (t, e, r) {
        ;(r = Et(t, e, r)), (t = r[0]), (e = r[1]), (r = r[2])
        var n, a, i, s
        return (
          (i = G(t, e, r)),
          (s = i - j(t, e, r)),
          (n =
            0 == s
              ? null
              : i == t
                ? (e - r) / s
                : i == e
                  ? (r - t) / s + 2
                  : (t - e) / s + 4),
          (n = (((n + 360) % 6) * 60) / 360),
          (a = 0 == s ? 0 : s / i),
          { h: n, s: a, b: i, toString: bt }
        )
      }),
      (r.rgb2hsl = function (t, e, r) {
        ;(r = Et(t, e, r)), (t = r[0]), (e = r[1]), (r = r[2])
        var n, a, i, s, o, c
        return (
          (s = G(t, e, r)),
          (o = j(t, e, r)),
          (c = s - o),
          (n =
            0 == c
              ? null
              : s == t
                ? (e - r) / c
                : s == e
                  ? (r - t) / c + 2
                  : (t - e) / c + 4),
          (n = (((n + 360) % 6) * 60) / 360),
          (i = (s + o) / 2),
          (a = 0 == c ? 0 : i < 0.5 ? c / (2 * i) : c / (2 - 2 * i)),
          { h: n, s: a, l: i, toString: _t }
        )
      }),
      (r._path2string = function () {
        return this.join(",").replace(it, "$1")
      })
    r._preload = function (t, e) {
      var r = S.doc.createElement("img")
      ;(r.style.cssText = "position:absolute;left:-9999em;top:-9999em"),
        (r.onload = function () {
          e.call(this), (this.onload = null), S.doc.body.removeChild(this)
        }),
        (r.onerror = function () {
          S.doc.body.removeChild(this)
        }),
        S.doc.body.appendChild(r),
        (r.src = t)
    }
    ;(r.getRGB = i(function (t) {
      if (!t || (t = M(t)).indexOf("-") + 1)
        return { r: -1, g: -1, b: -1, hex: "none", error: 1, toString: s }
      if ("none" == t) return { r: -1, g: -1, b: -1, hex: "none", toString: s }
      !(at[C](t.toLowerCase().substring(0, 2)) || "#" == t.charAt()) &&
        (t = yt(t))
      var e,
        n,
        a,
        i,
        o,
        c,
        h = t.match(Q)
      return h
        ? (h[2] &&
            ((a = J(h[2].substring(5), 16)),
            (n = J(h[2].substring(3, 5), 16)),
            (e = J(h[2].substring(1, 3), 16))),
          h[3] &&
            ((a = J((o = h[3].charAt(3)) + o, 16)),
            (n = J((o = h[3].charAt(2)) + o, 16)),
            (e = J((o = h[3].charAt(1)) + o, 16))),
          h[4] &&
            ((c = h[4][I](nt)),
            (e = K(c[0])),
            "%" == c[0].slice(-1) && (e *= 2.55),
            (n = K(c[1])),
            "%" == c[1].slice(-1) && (n *= 2.55),
            (a = K(c[2])),
            "%" == c[2].slice(-1) && (a *= 2.55),
            "rgba" == h[1].toLowerCase().slice(0, 4) && (i = K(c[3])),
            c[3] && "%" == c[3].slice(-1) && (i /= 100)),
          h[5]
            ? ((c = h[5][I](nt)),
              (e = K(c[0])),
              "%" == c[0].slice(-1) && (e *= 2.55),
              (n = K(c[1])),
              "%" == c[1].slice(-1) && (n *= 2.55),
              (a = K(c[2])),
              "%" == c[2].slice(-1) && (a *= 2.55),
              ("deg" == c[0].slice(-3) || "掳" == c[0].slice(-1)) && (e /= 360),
              "hsba" == h[1].toLowerCase().slice(0, 4) && (i = K(c[3])),
              c[3] && "%" == c[3].slice(-1) && (i /= 100),
              r.hsb2rgb(e, n, a, i))
            : h[6]
              ? ((c = h[6][I](nt)),
                (e = K(c[0])),
                "%" == c[0].slice(-1) && (e *= 2.55),
                (n = K(c[1])),
                "%" == c[1].slice(-1) && (n *= 2.55),
                (a = K(c[2])),
                "%" == c[2].slice(-1) && (a *= 2.55),
                ("deg" == c[0].slice(-3) || "掳" == c[0].slice(-1)) &&
                  (e /= 360),
                "hsla" == h[1].toLowerCase().slice(0, 4) && (i = K(c[3])),
                c[3] && "%" == c[3].slice(-1) && (i /= 100),
                r.hsl2rgb(e, n, a, i))
              : ((h = { r: e, g: n, b: a, toString: s }),
                (h.hex =
                  "#" +
                  (16777216 | a | (n << 8) | (e << 16)).toString(16).slice(1)),
                r.is(i, "finite") && (h.opacity = i),
                h))
        : { r: -1, g: -1, b: -1, hex: "none", error: 1, toString: s }
    }, r)),
      (r.hsb = i(function (t, e, n) {
        return r.hsb2rgb(t, e, n).hex
      })),
      (r.hsl = i(function (t, e, n) {
        return r.hsl2rgb(t, e, n).hex
      })),
      (r.rgb = i(function (t, e, r) {
        return "#" + (16777216 | r | (e << 8) | (t << 16)).toString(16).slice(1)
      })),
      (r.getColor = function (t) {
        var e = (this.getColor.start = this.getColor.start || {
            h: 0,
            s: 1,
            b: t || 0.75
          }),
          r = this.hsb2rgb(e.h, e.s, e.b)
        return (
          (e.h += 0.075),
          e.h > 1 &&
            ((e.h = 0),
            (e.s -= 0.2),
            e.s <= 0 && (this.getColor.start = { h: 0, s: 1, b: e.b })),
          r.hex
        )
      }),
      (r.getColor.reset = function () {
        delete this.start
      }),
      (r.parsePathString = function (t) {
        if (!t) return null
        var e = Ct(t)
        if (e.arr) return Bt(e.arr)
        var n = {
            a: 7,
            c: 6,
            h: 1,
            l: 2,
            m: 2,
            r: 4,
            q: 4,
            s: 4,
            t: 2,
            v: 1,
            z: 0
          },
          a = []
        return (
          r.is(t, W) && r.is(t[0], W) && (a = Bt(t)),
          a.length ||
            M(t).replace(st, function (t, e, r) {
              var i = [],
                s = e.toLowerCase()
              if (
                (r.replace(ct, function (t, e) {
                  e && i.push(+e)
                }),
                "m" == s &&
                  i.length > 2 &&
                  (a.push([e][T](i.splice(0, 2))),
                  (s = "l"),
                  (e = "m" == e ? "l" : "L")),
                "r" == s)
              )
                a.push([e][T](i))
              else
                for (
                  ;
                  i.length >= n[s] && (a.push([e][T](i.splice(0, n[s]))), n[s]);

                );
            }),
          (a.toString = r._path2string),
          (e.arr = Bt(a)),
          a
        )
      }),
      (r.parseTransformString = i(function (t) {
        if (!t) return null
        var e = []
        return (
          r.is(t, W) && r.is(t[0], W) && (e = Bt(t)),
          e.length ||
            M(t).replace(ot, function (t, r, n) {
              var a = []
              L.call(r)
              n.replace(ct, function (t, e) {
                e && a.push(+e)
              }),
                e.push([r][T](a))
            }),
          (e.toString = r._path2string),
          e
        )
      }))
    var Ct = function (t) {
      var e = (Ct.ps = Ct.ps || {})
      return (
        e[t] ? (e[t].sleep = 100) : (e[t] = { sleep: 100 }),
        setTimeout(function () {
          for (var r in e) e[C](r) && r != t && !--e[r].sleep && delete e[r]
        }),
        e[t]
      )
    }
    ;(r.findDotsAtSegment = function (t, e, r, n, a, i, s, o, c) {
      var h = 1 - c,
        u = X(h, 3),
        l = X(h, 2),
        f = c * c,
        p = f * c,
        d = u * t + 3 * l * c * r + 3 * h * c * c * a + p * s,
        g = u * e + 3 * l * c * n + 3 * h * c * c * i + p * o,
        m = t + 2 * c * (r - t) + f * (a - 2 * r + t),
        v = e + 2 * c * (n - e) + f * (i - 2 * n + e),
        x = r + 2 * c * (a - r) + f * (s - 2 * a + r),
        y = n + 2 * c * (i - n) + f * (o - 2 * i + n),
        b = h * t + c * r,
        _ = h * e + c * n,
        w = h * a + c * s,
        E = h * i + c * o,
        k = 90 - (180 * z.atan2(m - x, v - y)) / q
      return (
        (m > x || v < y) && (k += 180),
        {
          x: d,
          y: g,
          m: { x: m, y: v },
          n: { x: x, y: y },
          start: { x: b, y: _ },
          end: { x: w, y: E },
          alpha: k
        }
      )
    }),
      (r.bezierBBox = function (t, e, n, a, i, s, o, c) {
        r.is(t, "array") || (t = [t, e, n, a, i, s, o, c])
        var h = Mt.apply(null, t)
        return {
          x: h.min.x,
          y: h.min.y,
          x2: h.max.x,
          y2: h.max.y,
          width: h.max.x - h.min.x,
          height: h.max.y - h.min.y
        }
      }),
      (r.isPointInsideBBox = function (t, e, r) {
        return e >= t.x && e <= t.x2 && r >= t.y && r <= t.y2
      }),
      (r.isBBoxIntersect = function (t, e) {
        var n = r.isPointInsideBBox
        return (
          n(e, t.x, t.y) ||
          n(e, t.x2, t.y) ||
          n(e, t.x, t.y2) ||
          n(e, t.x2, t.y2) ||
          n(t, e.x, e.y) ||
          n(t, e.x2, e.y) ||
          n(t, e.x, e.y2) ||
          n(t, e.x2, e.y2) ||
          (((t.x < e.x2 && t.x > e.x) || (e.x < t.x2 && e.x > t.x)) &&
            ((t.y < e.y2 && t.y > e.y) || (e.y < t.y2 && e.y > t.y)))
        )
      }),
      (r.pathIntersection = function (t, e) {
        return p(t, e)
      }),
      (r.pathIntersectionNumber = function (t, e) {
        return p(t, e, 1)
      }),
      (r.isPointInsidePath = function (t, e, n) {
        var a = r.pathBBox(t)
        return (
          r.isPointInsideBBox(a, e, n) &&
          p(
            t,
            [
              ["M", e, n],
              ["H", a.x2 + 10]
            ],
            1
          ) %
            2 ==
            1
        )
      }),
      (r._removedFactory = function (t) {
        return function () {
          e(
            "raphael.log",
            null,
            "Rapha毛l: you are calling to method 鈥�" +
              t +
              "鈥� of removed object",
            t
          )
        }
      })
    var St = (r.pathBBox = function (t) {
        var e = Ct(t)
        if (e.bbox) return n(e.bbox)
        if (!t) return { x: 0, y: 0, width: 0, height: 0, x2: 0, y2: 0 }
        t = It(t)
        for (
          var r, a = 0, i = 0, s = [], o = [], c = 0, h = t.length;
          c < h;
          c++
        )
          if (((r = t[c]), "M" == r[0]))
            (a = r[1]), (i = r[2]), s.push(a), o.push(i)
          else {
            var u = Mt(a, i, r[1], r[2], r[3], r[4], r[5], r[6])
            ;(s = s[T](u.min.x, u.max.x)),
              (o = o[T](u.min.y, u.max.y)),
              (a = r[5]),
              (i = r[6])
          }
        var l = j[N](0, s),
          f = j[N](0, o),
          p = G[N](0, s),
          d = G[N](0, o),
          g = p - l,
          m = d - f,
          v = {
            x: l,
            y: f,
            x2: p,
            y2: d,
            width: g,
            height: m,
            cx: l + g / 2,
            cy: f + m / 2
          }
        return (e.bbox = n(v)), v
      }),
      Bt = function (t) {
        var e = n(t)
        return (e.toString = r._path2string), e
      },
      At = (r._pathToRelative = function (t) {
        var e = Ct(t)
        if (e.rel) return Bt(e.rel)
        ;(r.is(t, W) && r.is(t && t[0], W)) || (t = r.parsePathString(t))
        var n = [],
          a = 0,
          i = 0,
          s = 0,
          o = 0,
          c = 0
        "M" == t[0][0] &&
          ((a = t[0][1]),
          (i = t[0][2]),
          (s = a),
          (o = i),
          c++,
          n.push(["M", a, i]))
        for (var h = c, u = t.length; h < u; h++) {
          var l = (n[h] = []),
            f = t[h]
          if (f[0] != L.call(f[0]))
            switch (((l[0] = L.call(f[0])), l[0])) {
              case "a":
                ;(l[1] = f[1]),
                  (l[2] = f[2]),
                  (l[3] = f[3]),
                  (l[4] = f[4]),
                  (l[5] = f[5]),
                  (l[6] = +(f[6] - a).toFixed(3)),
                  (l[7] = +(f[7] - i).toFixed(3))
                break
              case "v":
                l[1] = +(f[1] - i).toFixed(3)
                break
              case "m":
                ;(s = f[1]), (o = f[2])
              default:
                for (var p = 1, d = f.length; p < d; p++)
                  l[p] = +(f[p] - (p % 2 ? a : i)).toFixed(3)
            }
          else {
            ;(l = n[h] = []), "m" == f[0] && ((s = f[1] + a), (o = f[2] + i))
            for (var g = 0, m = f.length; g < m; g++) n[h][g] = f[g]
          }
          var v = n[h].length
          switch (n[h][0]) {
            case "z":
              ;(a = s), (i = o)
              break
            case "h":
              a += +n[h][v - 1]
              break
            case "v":
              i += +n[h][v - 1]
              break
            default:
              ;(a += +n[h][v - 2]), (i += +n[h][v - 1])
          }
        }
        return (n.toString = r._path2string), (e.rel = Bt(n)), n
      }),
      Nt = (r._pathToAbsolute = function (t) {
        var e = Ct(t)
        if (e.abs) return Bt(e.abs)
        if (
          ((r.is(t, W) && r.is(t && t[0], W)) || (t = r.parsePathString(t)),
          !t || !t.length)
        )
          return [["M", 0, 0]]
        var n = [],
          a = 0,
          i = 0,
          s = 0,
          c = 0,
          h = 0
        "M" == t[0][0] &&
          ((a = +t[0][1]),
          (i = +t[0][2]),
          (s = a),
          (c = i),
          h++,
          (n[0] = ["M", a, i]))
        for (
          var u,
            l,
            f =
              3 == t.length &&
              "M" == t[0][0] &&
              "R" == t[1][0].toUpperCase() &&
              "Z" == t[2][0].toUpperCase(),
            p = h,
            d = t.length;
          p < d;
          p++
        ) {
          if ((n.push((u = [])), (l = t[p]), l[0] != tt.call(l[0])))
            switch (((u[0] = tt.call(l[0])), u[0])) {
              case "A":
                ;(u[1] = l[1]),
                  (u[2] = l[2]),
                  (u[3] = l[3]),
                  (u[4] = l[4]),
                  (u[5] = l[5]),
                  (u[6] = +(l[6] + a)),
                  (u[7] = +(l[7] + i))
                break
              case "V":
                u[1] = +l[1] + i
                break
              case "H":
                u[1] = +l[1] + a
                break
              case "R":
                for (
                  var g = [a, i][T](l.slice(1)), m = 2, v = g.length;
                  m < v;
                  m++
                )
                  (g[m] = +g[m] + a), (g[++m] = +g[m] + i)
                n.pop(), (n = n[T](o(g, f)))
                break
              case "M":
                ;(s = +l[1] + a), (c = +l[2] + i)
              default:
                for (m = 1, v = l.length; m < v; m++)
                  u[m] = +l[m] + (m % 2 ? a : i)
            }
          else if ("R" == l[0])
            (g = [a, i][T](l.slice(1))),
              n.pop(),
              (n = n[T](o(g, f))),
              (u = ["R"][T](l.slice(-2)))
          else for (var x = 0, y = l.length; x < y; x++) u[x] = l[x]
          switch (u[0]) {
            case "Z":
              ;(a = s), (i = c)
              break
            case "H":
              a = u[1]
              break
            case "V":
              i = u[1]
              break
            case "M":
              ;(s = u[u.length - 2]), (c = u[u.length - 1])
            default:
              ;(a = u[u.length - 2]), (i = u[u.length - 1])
          }
        }
        return (n.toString = r._path2string), (e.abs = Bt(n)), n
      }),
      Tt = function (t, e, r, n) {
        return [t, e, r, n, r, n]
      },
      Ot = function (t, e, r, n, a, i) {
        return [
          (1 / 3) * t + (2 / 3) * r,
          (1 / 3) * e + (2 / 3) * n,
          (1 / 3) * a + (2 / 3) * r,
          (1 / 3) * i + (2 / 3) * n,
          a,
          i
        ]
      },
      Rt = function (t, e, r, n, a, s, o, c, h, u) {
        var l,
          f = (120 * q) / 180,
          p = (q / 180) * (+a || 0),
          d = [],
          g = i(function (t, e, r) {
            return {
              x: t * z.cos(r) - e * z.sin(r),
              y: t * z.sin(r) + e * z.cos(r)
            }
          })
        if (u) (k = u[0]), (C = u[1]), (w = u[2]), (E = u[3])
        else {
          ;(l = g(t, e, -p)),
            (t = l.x),
            (e = l.y),
            (l = g(c, h, -p)),
            (c = l.x),
            (h = l.y)
          var m = (z.cos((q / 180) * a), z.sin((q / 180) * a), (t - c) / 2),
            v = (e - h) / 2,
            x = (m * m) / (r * r) + (v * v) / (n * n)
          x > 1 && ((x = z.sqrt(x)), (r *= x), (n *= x))
          var y = r * r,
            b = n * n,
            _ =
              (s == o ? -1 : 1) *
              z.sqrt(
                U((y * b - y * v * v - b * m * m) / (y * v * v + b * m * m))
              ),
            w = (_ * r * v) / n + (t + c) / 2,
            E = (_ * -n * m) / r + (e + h) / 2,
            k = z.asin(((e - E) / n).toFixed(9)),
            C = z.asin(((h - E) / n).toFixed(9))
          ;(k = t < w ? q - k : k),
            (C = c < w ? q - C : C),
            k < 0 && (k = 2 * q + k),
            C < 0 && (C = 2 * q + C),
            o && k > C && (k -= 2 * q),
            !o && C > k && (C -= 2 * q)
        }
        var S = C - k
        if (U(S) > f) {
          var B = C,
            A = c,
            N = h
          ;(C = k + f * (o && C > k ? 1 : -1)),
            (c = w + r * z.cos(C)),
            (h = E + n * z.sin(C)),
            (d = Rt(c, h, r, n, a, 0, o, A, N, [C, B, w, E]))
        }
        S = C - k
        var O = z.cos(k),
          R = z.sin(k),
          P = z.cos(C),
          M = z.sin(C),
          F = z.tan(S / 4),
          D = (4 / 3) * r * F,
          L = (4 / 3) * n * F,
          G = [t, e],
          j = [t + D * R, e - L * O],
          X = [c + D * M, h - L * P],
          H = [c, h]
        if (((j[0] = 2 * G[0] - j[0]), (j[1] = 2 * G[1] - j[1]), u))
          return [j, X, H][T](d)
        d = [j, X, H][T](d).join()[I](",")
        for (var W = [], V = 0, Q = d.length; V < Q; V++)
          W[V] = V % 2 ? g(d[V - 1], d[V], p).y : g(d[V], d[V + 1], p).x
        return W
      },
      Pt = function (t, e, r, n, a, i, s, o, c) {
        var h = 1 - c
        return {
          x:
            X(h, 3) * t + 3 * X(h, 2) * c * r + 3 * h * c * c * a + X(c, 3) * s,
          y: X(h, 3) * e + 3 * X(h, 2) * c * n + 3 * h * c * c * i + X(c, 3) * o
        }
      },
      Mt = i(function (t, e, r, n, a, i, s, o) {
        var c,
          h = a - 2 * r + t - (s - 2 * a + r),
          u = 2 * (r - t) - 2 * (a - r),
          l = t - r,
          f = (-u + z.sqrt(u * u - 4 * h * l)) / 2 / h,
          p = (-u - z.sqrt(u * u - 4 * h * l)) / 2 / h,
          d = [e, o],
          g = [t, s]
        return (
          U(f) > "1e12" && (f = 0.5),
          U(p) > "1e12" && (p = 0.5),
          f > 0 &&
            f < 1 &&
            ((c = Pt(t, e, r, n, a, i, s, o, f)), g.push(c.x), d.push(c.y)),
          p > 0 &&
            p < 1 &&
            ((c = Pt(t, e, r, n, a, i, s, o, p)), g.push(c.x), d.push(c.y)),
          (h = i - 2 * n + e - (o - 2 * i + n)),
          (u = 2 * (n - e) - 2 * (i - n)),
          (l = e - n),
          (f = (-u + z.sqrt(u * u - 4 * h * l)) / 2 / h),
          (p = (-u - z.sqrt(u * u - 4 * h * l)) / 2 / h),
          U(f) > "1e12" && (f = 0.5),
          U(p) > "1e12" && (p = 0.5),
          f > 0 &&
            f < 1 &&
            ((c = Pt(t, e, r, n, a, i, s, o, f)), g.push(c.x), d.push(c.y)),
          p > 0 &&
            p < 1 &&
            ((c = Pt(t, e, r, n, a, i, s, o, p)), g.push(c.x), d.push(c.y)),
          {
            min: { x: j[N](0, g), y: j[N](0, d) },
            max: { x: G[N](0, g), y: G[N](0, d) }
          }
        )
      }),
      It = (r._path2curve = i(
        function (t, e) {
          var r = !e && Ct(t)
          if (!e && r.curve) return Bt(r.curve)
          for (
            var n = Nt(t),
              a = e && Nt(e),
              i = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null },
              s = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null },
              o = function (t, e, r) {
                var n,
                  a,
                  i = { T: 1, Q: 1 }
                if (!t) return ["C", e.x, e.y, e.x, e.y, e.x, e.y]
                switch ((!(t[0] in i) && (e.qx = e.qy = null), t[0])) {
                  case "M":
                    ;(e.X = t[1]), (e.Y = t[2])
                    break
                  case "A":
                    t = ["C"][T](Rt[N](0, [e.x, e.y][T](t.slice(1))))
                    break
                  case "S":
                    "C" == r || "S" == r
                      ? ((n = 2 * e.x - e.bx), (a = 2 * e.y - e.by))
                      : ((n = e.x), (a = e.y)),
                      (t = ["C", n, a][T](t.slice(1)))
                    break
                  case "T":
                    "Q" == r || "T" == r
                      ? ((e.qx = 2 * e.x - e.qx), (e.qy = 2 * e.y - e.qy))
                      : ((e.qx = e.x), (e.qy = e.y)),
                      (t = ["C"][T](Ot(e.x, e.y, e.qx, e.qy, t[1], t[2])))
                    break
                  case "Q":
                    ;(e.qx = t[1]),
                      (e.qy = t[2]),
                      (t = ["C"][T](Ot(e.x, e.y, t[1], t[2], t[3], t[4])))
                    break
                  case "L":
                    t = ["C"][T](Tt(e.x, e.y, t[1], t[2]))
                    break
                  case "H":
                    t = ["C"][T](Tt(e.x, e.y, t[1], e.y))
                    break
                  case "V":
                    t = ["C"][T](Tt(e.x, e.y, e.x, t[1]))
                    break
                  case "Z":
                    t = ["C"][T](Tt(e.x, e.y, e.X, e.Y))
                }
                return t
              },
              c = function (t, e) {
                if (t[e].length > 7) {
                  t[e].shift()
                  for (var r = t[e]; r.length; )
                    t.splice(e++, 0, ["C"][T](r.splice(0, 6)))
                  t.splice(e, 1), (l = G(n.length, (a && a.length) || 0))
                }
              },
              h = function (t, e, r, i, s) {
                t &&
                  e &&
                  "M" == t[s][0] &&
                  "M" != e[s][0] &&
                  (e.splice(s, 0, ["M", i.x, i.y]),
                  (r.bx = 0),
                  (r.by = 0),
                  (r.x = t[s][1]),
                  (r.y = t[s][2]),
                  (l = G(n.length, (a && a.length) || 0)))
              },
              u = 0,
              l = G(n.length, (a && a.length) || 0);
            u < l;
            u++
          ) {
            ;(n[u] = o(n[u], i)),
              c(n, u),
              a && (a[u] = o(a[u], s)),
              a && c(a, u),
              h(n, a, i, s, u),
              h(a, n, s, i, u)
            var f = n[u],
              p = a && a[u],
              d = f.length,
              g = a && p.length
            ;(i.x = f[d - 2]),
              (i.y = f[d - 1]),
              (i.bx = K(f[d - 4]) || i.x),
              (i.by = K(f[d - 3]) || i.y),
              (s.bx = a && (K(p[g - 4]) || s.x)),
              (s.by = a && (K(p[g - 3]) || s.y)),
              (s.x = a && p[g - 2]),
              (s.y = a && p[g - 1])
          }
          return a || (r.curve = Bt(n)), a ? [n, a] : n
        },
        null,
        Bt
      )),
      Ft =
        ((r._parseDots = i(function (t) {
          for (var e = [], n = 0, a = t.length; n < a; n++) {
            var i = {},
              s = t[n].match(/^([^:]*):?([\d\.]*)/)
            if (((i.color = r.getRGB(s[1])), i.color.error)) return null
            ;(i.color = i.color.hex), s[2] && (i.offset = s[2] + "%"), e.push(i)
          }
          for (n = 1, a = e.length - 1; n < a; n++)
            if (!e[n].offset) {
              for (
                var o = K(e[n - 1].offset || 0), c = 0, h = n + 1;
                h < a;
                h++
              )
                if (e[h].offset) {
                  c = e[h].offset
                  break
                }
              c || ((c = 100), (h = a)), (c = K(c))
              for (var u = (c - o) / (h - n + 1); n < h; n++)
                (o += u), (e[n].offset = o + "%")
            }
          return e
        })),
        (r._tear = function (t, e) {
          t == e.top && (e.top = t.prev),
            t == e.bottom && (e.bottom = t.next),
            t.next && (t.next.prev = t.prev),
            t.prev && (t.prev.next = t.next)
        })),
      Dt =
        ((r._tofront = function (t, e) {
          e.top !== t &&
            (Ft(t, e),
            (t.next = null),
            (t.prev = e.top),
            (e.top.next = t),
            (e.top = t))
        }),
        (r._toback = function (t, e) {
          e.bottom !== t &&
            (Ft(t, e),
            (t.next = e.bottom),
            (t.prev = null),
            (e.bottom.prev = t),
            (e.bottom = t))
        }),
        (r._insertafter = function (t, e, r) {
          Ft(t, r),
            e == r.top && (r.top = t),
            e.next && (e.next.prev = t),
            (t.next = e.next),
            (t.prev = e),
            (e.next = t)
        }),
        (r._insertbefore = function (t, e, r) {
          Ft(t, r),
            e == r.bottom && (r.bottom = t),
            e.prev && (e.prev.next = t),
            (t.prev = e.prev),
            (e.prev = t),
            (t.next = e)
        }),
        (r.toMatrix = function (t, e) {
          var r = St(t),
            n = {
              _: { transform: R },
              getBBox: function () {
                return r
              }
            }
          return Lt(n, e), n.matrix
        })),
      Lt =
        ((r.transformPath = function (t, e) {
          return mt(t, Dt(t, e))
        }),
        (r._extractTransform = function (t, e) {
          if (null == e) return t._.transform
          e = M(e).replace(/\.{3}|\u2026/g, t._.transform || R)
          var n = r.parseTransformString(e),
            a = 0,
            i = 0,
            s = 0,
            o = 1,
            c = 1,
            h = t._,
            u = new d()
          if (((h.transform = n || []), n))
            for (var l = 0, f = n.length; l < f; l++) {
              var p,
                g,
                m,
                v,
                x,
                y = n[l],
                b = y.length,
                _ = M(y[0]).toLowerCase(),
                w = y[0] != _,
                E = w ? u.invert() : 0
              "t" == _ && 3 == b
                ? w
                  ? ((p = E.x(0, 0)),
                    (g = E.y(0, 0)),
                    (m = E.x(y[1], y[2])),
                    (v = E.y(y[1], y[2])),
                    u.translate(m - p, v - g))
                  : u.translate(y[1], y[2])
                : "r" == _
                  ? 2 == b
                    ? ((x = x || t.getBBox(1)),
                      u.rotate(y[1], x.x + x.width / 2, x.y + x.height / 2),
                      (a += y[1]))
                    : 4 == b &&
                      (w
                        ? ((m = E.x(y[2], y[3])),
                          (v = E.y(y[2], y[3])),
                          u.rotate(y[1], m, v))
                        : u.rotate(y[1], y[2], y[3]),
                      (a += y[1]))
                  : "s" == _
                    ? 2 == b || 3 == b
                      ? ((x = x || t.getBBox(1)),
                        u.scale(
                          y[1],
                          y[b - 1],
                          x.x + x.width / 2,
                          x.y + x.height / 2
                        ),
                        (o *= y[1]),
                        (c *= y[b - 1]))
                      : 5 == b &&
                        (w
                          ? ((m = E.x(y[3], y[4])),
                            (v = E.y(y[3], y[4])),
                            u.scale(y[1], y[2], m, v))
                          : u.scale(y[1], y[2], y[3], y[4]),
                        (o *= y[1]),
                        (c *= y[2]))
                    : "m" == _ &&
                      7 == b &&
                      u.add(y[1], y[2], y[3], y[4], y[5], y[6]),
                (h.dirtyT = 1),
                (t.matrix = u)
            }
          ;(t.matrix = u),
            (h.sx = o),
            (h.sy = c),
            (h.deg = a),
            (h.dx = i = u.e),
            (h.dy = s = u.f),
            1 == o && 1 == c && !a && h.bbox
              ? ((h.bbox.x += +i), (h.bbox.y += +s))
              : (h.dirtyT = 1)
        })),
      zt = function (t) {
        var e = t[0]
        switch (e.toLowerCase()) {
          case "t":
            return [e, 0, 0]
          case "m":
            return [e, 1, 0, 0, 1, 0, 0]
          case "r":
            return 4 == t.length ? [e, 0, t[2], t[3]] : [e, 0]
          case "s":
            return 5 == t.length
              ? [e, 1, 1, t[3], t[4]]
              : 3 == t.length
                ? [e, 1, 1]
                : [e, 1]
        }
      },
      Gt = (r._equaliseTransform = function (t, e) {
        ;(e = M(e).replace(/\.{3}|\u2026/g, t)),
          (t = r.parseTransformString(t) || []),
          (e = r.parseTransformString(e) || [])
        for (
          var n, a, i, s, o = G(t.length, e.length), c = [], h = [], u = 0;
          u < o;
          u++
        ) {
          if (
            ((i = t[u] || zt(e[u])),
            (s = e[u] || zt(i)),
            i[0] != s[0] ||
              ("r" == i[0].toLowerCase() && (i[2] != s[2] || i[3] != s[3])) ||
              ("s" == i[0].toLowerCase() && (i[3] != s[3] || i[4] != s[4])))
          )
            return
          for (
            c[u] = [], h[u] = [], n = 0, a = G(i.length, s.length);
            n < a;
            n++
          )
            n in i && (c[u][n] = i[n]), n in s && (h[u][n] = s[n])
        }
        return { from: c, to: h }
      })
    ;(r._getContainer = function (t, e, n, a) {
      var i
      if (
        null !=
        (i = null != a || r.is(t, "object") ? t : S.doc.getElementById(t))
      )
        return i.tagName
          ? null == e
            ? {
                container: i,
                width: i.style.pixelWidth || i.offsetWidth,
                height: i.style.pixelHeight || i.offsetHeight
              }
            : { container: i, width: e, height: n }
          : { container: 1, x: t, y: e, width: n, height: a }
    }),
      (r.pathToRelative = At),
      (r._engine = {}),
      (r.path2curve = It),
      (r.matrix = function (t, e, r, n, a, i) {
        return new d(t, e, r, n, a, i)
      }),
      (function (t) {
        function e(t) {
          return t[0] * t[0] + t[1] * t[1]
        }
        function n(t) {
          var r = z.sqrt(e(t))
          t[0] && (t[0] /= r), t[1] && (t[1] /= r)
        }
        ;(t.add = function (t, e, r, n, a, i) {
          var s,
            o,
            c,
            h,
            u = [[], [], []],
            l = [
              [this.a, this.c, this.e],
              [this.b, this.d, this.f],
              [0, 0, 1]
            ],
            f = [
              [t, r, a],
              [e, n, i],
              [0, 0, 1]
            ]
          for (
            t &&
              t instanceof d &&
              (f = [
                [t.a, t.c, t.e],
                [t.b, t.d, t.f],
                [0, 0, 1]
              ]),
              s = 0;
            s < 3;
            s++
          )
            for (o = 0; o < 3; o++) {
              for (h = 0, c = 0; c < 3; c++) h += l[s][c] * f[c][o]
              u[s][o] = h
            }
          ;(this.a = u[0][0]),
            (this.b = u[1][0]),
            (this.c = u[0][1]),
            (this.d = u[1][1]),
            (this.e = u[0][2]),
            (this.f = u[1][2])
        }),
          (t.invert = function () {
            var t = this,
              e = t.a * t.d - t.b * t.c
            return new d(
              t.d / e,
              -t.b / e,
              -t.c / e,
              t.a / e,
              (t.c * t.f - t.d * t.e) / e,
              (t.b * t.e - t.a * t.f) / e
            )
          }),
          (t.clone = function () {
            return new d(this.a, this.b, this.c, this.d, this.e, this.f)
          }),
          (t.translate = function (t, e) {
            this.add(1, 0, 0, 1, t, e)
          }),
          (t.scale = function (t, e, r, n) {
            null == e && (e = t),
              (r || n) && this.add(1, 0, 0, 1, r, n),
              this.add(t, 0, 0, e, 0, 0),
              (r || n) && this.add(1, 0, 0, 1, -r, -n)
          }),
          (t.rotate = function (t, e, n) {
            ;(t = r.rad(t)), (e = e || 0), (n = n || 0)
            var a = +z.cos(t).toFixed(9),
              i = +z.sin(t).toFixed(9)
            this.add(a, i, -i, a, e, n), this.add(1, 0, 0, 1, -e, -n)
          }),
          (t.x = function (t, e) {
            return t * this.a + e * this.c + this.e
          }),
          (t.y = function (t, e) {
            return t * this.b + e * this.d + this.f
          }),
          (t.get = function (t) {
            return +this[M.fromCharCode(97 + t)].toFixed(4)
          }),
          (t.toString = function () {
            return r.svg
              ? "matrix(" +
                  [
                    this.get(0),
                    this.get(1),
                    this.get(2),
                    this.get(3),
                    this.get(4),
                    this.get(5)
                  ].join() +
                  ")"
              : [
                  this.get(0),
                  this.get(2),
                  this.get(1),
                  this.get(3),
                  0,
                  0
                ].join()
          }),
          (t.toFilter = function () {
            return (
              "progid:DXImageTransform.Microsoft.Matrix(M11=" +
              this.get(0) +
              ", M12=" +
              this.get(2) +
              ", M21=" +
              this.get(1) +
              ", M22=" +
              this.get(3) +
              ", Dx=" +
              this.get(4) +
              ", Dy=" +
              this.get(5) +
              ", sizingmethod='auto expand')"
            )
          }),
          (t.offset = function () {
            return [this.e.toFixed(4), this.f.toFixed(4)]
          }),
          (t.split = function () {
            var t = {}
            ;(t.dx = this.e), (t.dy = this.f)
            var a = [
              [this.a, this.c],
              [this.b, this.d]
            ]
            ;(t.scalex = z.sqrt(e(a[0]))),
              n(a[0]),
              (t.shear = a[0][0] * a[1][0] + a[0][1] * a[1][1]),
              (a[1] = [
                a[1][0] - a[0][0] * t.shear,
                a[1][1] - a[0][1] * t.shear
              ]),
              (t.scaley = z.sqrt(e(a[1]))),
              n(a[1]),
              (t.shear /= t.scaley)
            var i = -a[0][1],
              s = a[1][1]
            return (
              s < 0
                ? ((t.rotate = r.deg(z.acos(s))),
                  i < 0 && (t.rotate = 360 - t.rotate))
                : (t.rotate = r.deg(z.asin(i))),
              (t.isSimple = !(
                +t.shear.toFixed(9) ||
                (t.scalex.toFixed(9) != t.scaley.toFixed(9) && t.rotate)
              )),
              (t.isSuperSimple =
                !+t.shear.toFixed(9) &&
                t.scalex.toFixed(9) == t.scaley.toFixed(9) &&
                !t.rotate),
              (t.noRotation = !+t.shear.toFixed(9) && !t.rotate),
              t
            )
          }),
          (t.toTransformString = function (t) {
            var e = t || this[I]()
            return e.isSimple
              ? ((e.scalex = +e.scalex.toFixed(4)),
                (e.scaley = +e.scaley.toFixed(4)),
                (e.rotate = +e.rotate.toFixed(4)),
                (e.dx || e.dy ? "t" + [e.dx, e.dy] : R) +
                  (1 != e.scalex || 1 != e.scaley
                    ? "s" + [e.scalex, e.scaley, 0, 0]
                    : R) +
                  (e.rotate ? "r" + [e.rotate, 0, 0] : R))
              : "m" +
                  [
                    this.get(0),
                    this.get(1),
                    this.get(2),
                    this.get(3),
                    this.get(4),
                    this.get(5)
                  ]
          })
      })(d.prototype)
    var jt =
      navigator.userAgent.match(/Version\/(.*?)\s/) ||
      navigator.userAgent.match(/Chrome\/(\d+)/)
    ;("Apple Computer, Inc." == navigator.vendor &&
      ((jt && jt[1] < 4) || "iP" == navigator.platform.slice(0, 2))) ||
    ("Google Inc." == navigator.vendor && jt && jt[1] < 8)
      ? (_.safari = function () {
          var t = this.rect(-99, -99, this.width + 99, this.height + 99).attr({
            stroke: "none"
          })
          setTimeout(function () {
            t.remove()
          })
        })
      : (_.safari = lt)
    for (
      var Ut = function () {
          this.returnValue = !1
        },
        Xt = function () {
          return this.originalEvent.preventDefault()
        },
        qt = function () {
          this.cancelBubble = !0
        },
        Ht = function () {
          return this.originalEvent.stopPropagation()
        },
        Wt = function (t) {
          var e = S.doc.documentElement.scrollTop || S.doc.body.scrollTop,
            r = S.doc.documentElement.scrollLeft || S.doc.body.scrollLeft
          return { x: t.clientX + r, y: t.clientY + e }
        },
        Vt = (function () {
          return S.doc.addEventListener
            ? function (t, e, r, n) {
                var a = function (t) {
                  var e = Wt(t)
                  return r.call(n, t, e.x, e.y)
                }
                if ((t.addEventListener(e, a, !1), O && D[e])) {
                  var i = function (e) {
                    for (
                      var a = Wt(e),
                        i = e,
                        s = 0,
                        o = e.targetTouches && e.targetTouches.length;
                      s < o;
                      s++
                    )
                      if (e.targetTouches[s].target == t) {
                        ;(e = e.targetTouches[s]),
                          (e.originalEvent = i),
                          (e.preventDefault = Xt),
                          (e.stopPropagation = Ht)
                        break
                      }
                    return r.call(n, e, a.x, a.y)
                  }
                  t.addEventListener(D[e], i, !1)
                }
                return function () {
                  return (
                    t.removeEventListener(e, a, !1),
                    O && D[e] && t.removeEventListener(D[e], a, !1),
                    !0
                  )
                }
              }
            : S.doc.attachEvent
              ? function (t, e, r, n) {
                  var a = function (t) {
                    t = t || S.win.event
                    var e =
                        S.doc.documentElement.scrollTop || S.doc.body.scrollTop,
                      a =
                        S.doc.documentElement.scrollLeft ||
                        S.doc.body.scrollLeft,
                      i = t.clientX + a,
                      s = t.clientY + e
                    return (
                      (t.preventDefault = t.preventDefault || Ut),
                      (t.stopPropagation = t.stopPropagation || qt),
                      r.call(n, t, i, s)
                    )
                  }
                  return (
                    t.attachEvent("on" + e, a),
                    function () {
                      return t.detachEvent("on" + e, a), !0
                    }
                  )
                }
              : void 0
        })(),
        Qt = [],
        Yt = function (t) {
          for (
            var r,
              n = t.clientX,
              a = t.clientY,
              i = S.doc.documentElement.scrollTop || S.doc.body.scrollTop,
              s = S.doc.documentElement.scrollLeft || S.doc.body.scrollLeft,
              o = Qt.length;
            o--;

          ) {
            if (((r = Qt[o]), O && t.touches)) {
              for (var c, h = t.touches.length; h--; )
                if (((c = t.touches[h]), c.identifier == r.el._drag.id)) {
                  ;(n = c.clientX),
                    (a = c.clientY),
                    (t.originalEvent ? t.originalEvent : t).preventDefault()
                  break
                }
            } else t.preventDefault()
            var u,
              l = r.el.node,
              f = l.nextSibling,
              p = l.parentNode,
              d = l.style.display
            S.win.opera && p.removeChild(l),
              (l.style.display = "none"),
              (u = r.el.paper.getElementByPoint(n, a)),
              (l.style.display = d),
              S.win.opera && (f ? p.insertBefore(l, f) : p.appendChild(l)),
              u && e("raphael.drag.over." + r.el.id, r.el, u),
              e(
                "raphael.drag.move." + r.el.id,
                r.move_scope || r.el,
                n + s - r.el._drag.x,
                a + i - r.el._drag.y,
                n + s,
                a + i,
                t
              )
          }
        },
        $t = function (t) {
          r.unmousemove(Yt).unmouseup($t)
          for (var n, a = Qt.length; a--; )
            (n = Qt[a]),
              (n.el._drag = {}),
              e(
                "raphael.drag.end." + n.el.id,
                n.end_scope || n.start_scope || n.move_scope || n.el,
                t
              )
          Qt = []
        },
        Zt = (r.el = {}),
        Kt = F.length;
      Kt--;

    )
      !(function (t) {
        ;(r[t] = Zt[t] =
          function (e, n) {
            return (
              r.is(e, "function") &&
                ((this.events = this.events || []),
                this.events.push({
                  name: t,
                  f: e,
                  unbind: Vt(this.shape || this.node || S.doc, t, e, n || this)
                })),
              this
            )
          }),
          (r["un" + t] = Zt["un" + t] =
            function (e) {
              for (var n = this.events || [], a = n.length; a--; )
                n[a].name != t ||
                  (!r.is(e, "undefined") && n[a].f != e) ||
                  (n[a].unbind(),
                  n.splice(a, 1),
                  !n.length && delete this.events)
              return this
            })
      })(F[Kt])
    ;(Zt.data = function (t, n) {
      var a = (ht[this.id] = ht[this.id] || {})
      if (0 == arguments.length) return a
      if (1 == arguments.length) {
        if (r.is(t, "object")) {
          for (var i in t) t[C](i) && this.data(i, t[i])
          return this
        }
        return e("raphael.data.get." + this.id, this, a[t], t), a[t]
      }
      return (a[t] = n), e("raphael.data.set." + this.id, this, n, t), this
    }),
      (Zt.removeData = function (t) {
        return (
          null == t ? (ht[this.id] = {}) : ht[this.id] && delete ht[this.id][t],
          this
        )
      }),
      (Zt.getData = function () {
        return n(ht[this.id] || {})
      }),
      (Zt.hover = function (t, e, r, n) {
        return this.mouseover(t, r).mouseout(e, n || r)
      }),
      (Zt.unhover = function (t, e) {
        return this.unmouseover(t).unmouseout(e)
      })
    var Jt = []
    ;(Zt.drag = function (t, n, a, i, s, o) {
      function c(c) {
        ;(c.originalEvent || c).preventDefault()
        var h = c.clientX,
          u = c.clientY,
          l = S.doc.documentElement.scrollTop || S.doc.body.scrollTop,
          f = S.doc.documentElement.scrollLeft || S.doc.body.scrollLeft
        if (((this._drag.id = c.identifier), O && c.touches))
          for (var p, d = c.touches.length; d--; )
            if (
              ((p = c.touches[d]),
              (this._drag.id = p.identifier),
              p.identifier == this._drag.id)
            ) {
              ;(h = p.clientX), (u = p.clientY)
              break
            }
        ;(this._drag.x = h + f),
          (this._drag.y = u + l),
          !Qt.length && r.mousemove(Yt).mouseup($t),
          Qt.push({ el: this, move_scope: i, start_scope: s, end_scope: o }),
          n && e.on("raphael.drag.start." + this.id, n),
          t && e.on("raphael.drag.move." + this.id, t),
          a && e.on("raphael.drag.end." + this.id, a),
          e(
            "raphael.drag.start." + this.id,
            s || i || this,
            c.clientX + f,
            c.clientY + l,
            c
          )
      }
      return (
        (this._drag = {}),
        Jt.push({ el: this, start: c }),
        this.mousedown(c),
        this
      )
    }),
      (Zt.onDragOver = function (t) {
        t
          ? e.on("raphael.drag.over." + this.id, t)
          : e.unbind("raphael.drag.over." + this.id)
      }),
      (Zt.undrag = function () {
        for (var t = Jt.length; t--; )
          Jt[t].el == this &&
            (this.unmousedown(Jt[t].start),
            Jt.splice(t, 1),
            e.unbind("raphael.drag.*." + this.id))
        !Jt.length && r.unmousemove(Yt).unmouseup($t), (Qt = [])
      }),
      (_.circle = function (t, e, n) {
        var a = r._engine.circle(this, t || 0, e || 0, n || 0)
        return this.__set__ && this.__set__.push(a), a
      }),
      (_.rect = function (t, e, n, a, i) {
        var s = r._engine.rect(this, t || 0, e || 0, n || 0, a || 0, i || 0)
        return this.__set__ && this.__set__.push(s), s
      }),
      (_.ellipse = function (t, e, n, a) {
        var i = r._engine.ellipse(this, t || 0, e || 0, n || 0, a || 0)
        return this.__set__ && this.__set__.push(i), i
      }),
      (_.path = function (t) {
        t && !r.is(t, "string") && !r.is(t[0], W) && (t += R)
        var e = r._engine.path(r.format[N](r, arguments), this)
        return this.__set__ && this.__set__.push(e), e
      }),
      (_.image = function (t, e, n, a, i) {
        var s = r._engine.image(
          this,
          t || "about:blank",
          e || 0,
          n || 0,
          a || 0,
          i || 0
        )
        return this.__set__ && this.__set__.push(s), s
      }),
      (_.text = function (t, e, n) {
        var a = r._engine.text(this, t || 0, e || 0, M(n))
        return this.__set__ && this.__set__.push(a), a
      }),
      (_.set = function (t) {
        !r.is(t, "array") &&
          (t = Array.prototype.splice.call(arguments, 0, arguments.length))
        var e = new le(t)
        return (
          this.__set__ && this.__set__.push(e),
          (e.paper = this),
          (e.type = "set"),
          e
        )
      }),
      (_.setStart = function (t) {
        this.__set__ = t || this.set()
      }),
      (_.setFinish = function (t) {
        var e = this.__set__
        return delete this.__set__, e
      }),
      (_.setSize = function (t, e) {
        return r._engine.setSize.call(this, t, e)
      }),
      (_.setViewBox = function (t, e, n, a, i) {
        return r._engine.setViewBox.call(this, t, e, n, a, i)
      }),
      (_.top = _.bottom = null),
      (_.raphael = r)
    var te = function (t) {
      var e = t.getBoundingClientRect(),
        r = t.ownerDocument,
        n = r.body,
        a = r.documentElement,
        i = a.clientTop || n.clientTop || 0,
        s = a.clientLeft || n.clientLeft || 0
      return {
        y: e.top + (S.win.pageYOffset || a.scrollTop || n.scrollTop) - i,
        x: e.left + (S.win.pageXOffset || a.scrollLeft || n.scrollLeft) - s
      }
    }
    ;(_.getElementByPoint = function (t, e) {
      var r = this,
        n = r.canvas,
        a = S.doc.elementFromPoint(t, e)
      if (S.win.opera && "svg" == a.tagName) {
        var i = te(n),
          s = n.createSVGRect()
        ;(s.x = t - i.x), (s.y = e - i.y), (s.width = s.height = 1)
        var o = n.getIntersectionList(s, null)
        o.length && (a = o[o.length - 1])
      }
      if (!a) return null
      for (; a.parentNode && a != n.parentNode && !a.raphael; ) a = a.parentNode
      return (
        a == r.canvas.parentNode && (a = n),
        (a = a && a.raphael ? r.getById(a.raphaelid) : null)
      )
    }),
      (_.getElementsByBBox = function (t) {
        var e = this.set()
        return (
          this.forEach(function (n) {
            r.isBBoxIntersect(n.getBBox(), t) && e.push(n)
          }),
          e
        )
      }),
      (_.getById = function (t) {
        for (var e = this.bottom; e; ) {
          if (e.id == t) return e
          e = e.next
        }
        return null
      }),
      (_.forEach = function (t, e) {
        for (var r = this.bottom; r; ) {
          if (!1 === t.call(e, r)) return this
          r = r.next
        }
        return this
      }),
      (_.getElementsByPoint = function (t, e) {
        var r = this.set()
        return (
          this.forEach(function (n) {
            n.isPointInside(t, e) && r.push(n)
          }),
          r
        )
      }),
      (Zt.isPointInside = function (t, e) {
        var n = (this.realPath = gt[this.type](this))
        return (
          this.attr("transform") &&
            this.attr("transform").length &&
            (n = r.transformPath(n, this.attr("transform"))),
          r.isPointInsidePath(n, t, e)
        )
      }),
      (Zt.getBBox = function (t) {
        if (this.removed) return {}
        var e = this._
        return t
          ? ((!e.dirty && e.bboxwt) ||
              ((this.realPath = gt[this.type](this)),
              (e.bboxwt = St(this.realPath)),
              (e.bboxwt.toString = g),
              (e.dirty = 0)),
            e.bboxwt)
          : ((e.dirty || e.dirtyT || !e.bbox) &&
              ((!e.dirty && this.realPath) ||
                ((e.bboxwt = 0), (this.realPath = gt[this.type](this))),
              (e.bbox = St(mt(this.realPath, this.matrix))),
              (e.bbox.toString = g),
              (e.dirty = e.dirtyT = 0)),
            e.bbox)
      }),
      (Zt.clone = function () {
        if (this.removed) return null
        var t = this.paper[this.type]().attr(this.attr())
        return this.__set__ && this.__set__.push(t), t
      }),
      (Zt.glow = function (t) {
        if ("text" == this.type) return null
        t = t || {}
        var e = {
            width: (t.width || 10) + (+this.attr("stroke-width") || 1),
            fill: t.fill || !1,
            opacity: t.opacity || 0.5,
            offsetx: t.offsetx || 0,
            offsety: t.offsety || 0,
            color: t.color || "#000"
          },
          r = e.width / 2,
          n = this.paper,
          a = n.set(),
          i = this.realPath || gt[this.type](this)
        i = this.matrix ? mt(i, this.matrix) : i
        for (var s = 1; s < r + 1; s++)
          a.push(
            n
              .path(i)
              .attr({
                stroke: e.color,
                fill: e.fill ? e.color : "none",
                "stroke-linejoin": "round",
                "stroke-linecap": "round",
                "stroke-width": +((e.width / r) * s).toFixed(3),
                opacity: +(e.opacity / r).toFixed(3)
              })
          )
        return a.insertBefore(this).translate(e.offsetx, e.offsety)
      })
    var ee = function (t, e, n, a, i, s, o, c, l) {
        return null == l
          ? h(t, e, n, a, i, s, o, c)
          : r.findDotsAtSegment(
              t,
              e,
              n,
              a,
              i,
              s,
              o,
              c,
              u(t, e, n, a, i, s, o, c, l)
            )
      },
      re = function (t, e) {
        return function (n, a, i) {
          n = It(n)
          for (
            var s, o, c, h, u, l = "", f = {}, p = 0, d = 0, g = n.length;
            d < g;
            d++
          ) {
            if (((c = n[d]), "M" == c[0])) (s = +c[1]), (o = +c[2])
            else {
              if (
                ((h = ee(s, o, c[1], c[2], c[3], c[4], c[5], c[6])), p + h > a)
              ) {
                if (e && !f.start) {
                  if (
                    ((u = ee(s, o, c[1], c[2], c[3], c[4], c[5], c[6], a - p)),
                    (l += ["C" + u.start.x, u.start.y, u.m.x, u.m.y, u.x, u.y]),
                    i)
                  )
                    return l
                  ;(f.start = l),
                    (l = [
                      "M" + u.x,
                      u.y + "C" + u.n.x,
                      u.n.y,
                      u.end.x,
                      u.end.y,
                      c[5],
                      c[6]
                    ].join()),
                    (p += h),
                    (s = +c[5]),
                    (o = +c[6])
                  continue
                }
                if (!t && !e)
                  return (
                    (u = ee(s, o, c[1], c[2], c[3], c[4], c[5], c[6], a - p)),
                    { x: u.x, y: u.y, alpha: u.alpha }
                  )
              }
              ;(p += h), (s = +c[5]), (o = +c[6])
            }
            l += c.shift() + c
          }
          return (
            (f.end = l),
            (u = t
              ? p
              : e
                ? f
                : r.findDotsAtSegment(
                    s,
                    o,
                    c[0],
                    c[1],
                    c[2],
                    c[3],
                    c[4],
                    c[5],
                    1
                  )),
            u.alpha && (u = { x: u.x, y: u.y, alpha: u.alpha }),
            u
          )
        }
      },
      ne = re(1),
      ae = re(),
      ie = re(0, 1)
    ;(r.getTotalLength = ne),
      (r.getPointAtLength = ae),
      (r.getSubpath = function (t, e, r) {
        if (this.getTotalLength(t) - r < 1e-6) return ie(t, e).end
        var n = ie(t, r, 1)
        return e ? ie(n, e).end : n
      }),
      (Zt.getTotalLength = function () {
        var t = this.getPath()
        if (t)
          return this.node.getTotalLength ? this.node.getTotalLength() : ne(t)
      }),
      (Zt.getPointAtLength = function (t) {
        var e = this.getPath()
        if (e) return ae(e, t)
      }),
      (Zt.getPath = function () {
        var t,
          e = r._getPath[this.type]
        if ("text" != this.type && "set" != this.type)
          return e && (t = e(this)), t
      }),
      (Zt.getSubpath = function (t, e) {
        var n = this.getPath()
        if (n) return r.getSubpath(n, t, e)
      })
    var se = (r.easing_formulas = {
      linear: function (t) {
        return t
      },
      "<": function (t) {
        return X(t, 1.7)
      },
      ">": function (t) {
        return X(t, 0.48)
      },
      "<>": function (t) {
        var e = 0.48 - t / 1.04,
          r = z.sqrt(0.1734 + e * e),
          n = r - e,
          a = X(U(n), 1 / 3) * (n < 0 ? -1 : 1),
          i = -r - e,
          s = X(U(i), 1 / 3) * (i < 0 ? -1 : 1),
          o = a + s + 0.5
        return 3 * (1 - o) * o * o + o * o * o
      },
      backIn: function (t) {
        var e = 1.70158
        return t * t * ((e + 1) * t - e)
      },
      backOut: function (t) {
        t -= 1
        var e = 1.70158
        return t * t * ((e + 1) * t + e) + 1
      },
      elastic: function (t) {
        return t == !!t
          ? t
          : X(2, -10 * t) * z.sin((2 * q * (t - 0.075)) / 0.3) + 1
      },
      bounce: function (t) {
        var e,
          r = 7.5625,
          n = 2.75
        return (
          t < 1 / n
            ? (e = r * t * t)
            : t < 2 / n
              ? ((t -= 1.5 / n), (e = r * t * t + 0.75))
              : t < 2.5 / n
                ? ((t -= 2.25 / n), (e = r * t * t + 0.9375))
                : ((t -= 2.625 / n), (e = r * t * t + 0.984375)),
          e
        )
      }
    })
    ;(se.easeIn = se["ease-in"] = se["<"]),
      (se.easeOut = se["ease-out"] = se[">"]),
      (se.easeInOut = se["ease-in-out"] = se["<>"]),
      (se["back-in"] = se.backIn),
      (se["back-out"] = se.backOut)
    var oe = [],
      ce =
        t.requestAnimationFrame ||
        t.webkitRequestAnimationFrame ||
        t.mozRequestAnimationFrame ||
        t.oRequestAnimationFrame ||
        t.msRequestAnimationFrame ||
        function (t) {
          setTimeout(t, 16)
        },
      he = function () {
        for (var t = +new Date(), n = 0; n < oe.length; n++) {
          var a = oe[n]
          if (!a.el.removed && !a.paused) {
            var i,
              s,
              o = t - a.start,
              c = a.ms,
              h = a.easing,
              u = a.from,
              l = a.diff,
              f = a.to,
              p = (a.t, a.el),
              d = {},
              g = {}
            if (
              (a.initstatus
                ? ((o =
                    ((a.initstatus * a.anim.top - a.prev) /
                      (a.percent - a.prev)) *
                    c),
                  (a.status = a.initstatus),
                  delete a.initstatus,
                  a.stop && oe.splice(n--, 1))
                : (a.status =
                    (a.prev + (a.percent - a.prev) * (o / c)) / a.anim.top),
              !(o < 0))
            )
              if (o < c) {
                var m = h(o / c)
                for (var v in u)
                  if (u[C](v)) {
                    switch (rt[v]) {
                      case H:
                        i = +u[v] + m * c * l[v]
                        break
                      case "colour":
                        i =
                          "rgb(" +
                          [
                            ue(Z(u[v].r + m * c * l[v].r)),
                            ue(Z(u[v].g + m * c * l[v].g)),
                            ue(Z(u[v].b + m * c * l[v].b))
                          ].join(",") +
                          ")"
                        break
                      case "path":
                        i = []
                        for (var y = 0, b = u[v].length; y < b; y++) {
                          i[y] = [u[v][y][0]]
                          for (var _ = 1, w = u[v][y].length; _ < w; _++)
                            i[y][_] = +u[v][y][_] + m * c * l[v][y][_]
                          i[y] = i[y].join(P)
                        }
                        i = i.join(P)
                        break
                      case "transform":
                        if (l[v].real)
                          for (i = [], y = 0, b = u[v].length; y < b; y++)
                            for (
                              i[y] = [u[v][y][0]], _ = 1, w = u[v][y].length;
                              _ < w;
                              _++
                            )
                              i[y][_] = u[v][y][_] + m * c * l[v][y][_]
                        else {
                          var E = function (t) {
                            return +u[v][t] + m * c * l[v][t]
                          }
                          i = [["m", E(0), E(1), E(2), E(3), E(4), E(5)]]
                        }
                        break
                      case "csv":
                        if ("clip-rect" == v)
                          for (i = [], y = 4; y--; )
                            i[y] = +u[v][y] + m * c * l[v][y]
                        break
                      default:
                        var k = [][T](u[v])
                        for (
                          i = [], y = p.paper.customAttributes[v].length;
                          y--;

                        )
                          i[y] = +k[y] + m * c * l[v][y]
                    }
                    d[v] = i
                  }
                p.attr(d),
                  (function (t, r, n) {
                    setTimeout(function () {
                      e("raphael.anim.frame." + t, r, n)
                    })
                  })(p.id, p, a.anim)
              } else {
                if (
                  ((function (t, n, a) {
                    setTimeout(function () {
                      e("raphael.anim.frame." + n.id, n, a),
                        e("raphael.anim.finish." + n.id, n, a),
                        r.is(t, "function") && t.call(n)
                    })
                  })(a.callback, p, a.anim),
                  p.attr(f),
                  oe.splice(n--, 1),
                  a.repeat > 1 && !a.next)
                ) {
                  for (s in f) f[C](s) && (g[s] = a.totalOrigin[s])
                  a.el.attr(g),
                    x(
                      a.anim,
                      a.el,
                      a.anim.percents[0],
                      null,
                      a.totalOrigin,
                      a.repeat - 1
                    )
                }
                a.next &&
                  !a.stop &&
                  x(a.anim, a.el, a.next, null, a.totalOrigin, a.repeat)
              }
          }
        }
        r.svg && p && p.paper && p.paper.safari(), oe.length && ce(he)
      },
      ue = function (t) {
        return t > 255 ? 255 : t < 0 ? 0 : t
      }
    ;(Zt.animateWith = function (t, e, n, a, i, s) {
      var o = this
      if (o.removed) return s && s.call(o), o
      var c = n instanceof v ? n : r.animation(n, a, i, s)
      x(c, o, c.percents[0], null, o.attr())
      for (var h = 0, u = oe.length; h < u; h++)
        if (oe[h].anim == e && oe[h].el == t) {
          oe[u - 1].start = oe[h].start
          break
        }
      return o
    }),
      (Zt.onAnimation = function (t) {
        return (
          t
            ? e.on("raphael.anim.frame." + this.id, t)
            : e.unbind("raphael.anim.frame." + this.id),
          this
        )
      }),
      (v.prototype.delay = function (t) {
        var e = new v(this.anim, this.ms)
        return (e.times = this.times), (e.del = +t || 0), e
      }),
      (v.prototype.repeat = function (t) {
        var e = new v(this.anim, this.ms)
        return (e.del = this.del), (e.times = z.floor(G(t, 0)) || 1), e
      }),
      (r.animation = function (t, e, n, a) {
        if (t instanceof v) return t
        ;(!r.is(n, "function") && n) || ((a = a || n || null), (n = null)),
          (t = Object(t)),
          (e = +e || 0)
        var i,
          s,
          o = {}
        for (s in t)
          t[C](s) && K(s) != s && K(s) + "%" != s && ((i = !0), (o[s] = t[s]))
        return i
          ? (n && (o.easing = n), a && (o.callback = a), new v({ 100: o }, e))
          : new v(t, e)
      }),
      (Zt.animate = function (t, e, n, a) {
        var i = this
        if (i.removed) return a && a.call(i), i
        var s = t instanceof v ? t : r.animation(t, e, n, a)
        return x(s, i, s.percents[0], null, i.attr()), i
      }),
      (Zt.setTime = function (t, e) {
        return t && null != e && this.status(t, j(e, t.ms) / t.ms), this
      }),
      (Zt.status = function (t, e) {
        var r,
          n,
          a = [],
          i = 0
        if (null != e) return x(t, this, -1, j(e, 1)), this
        for (r = oe.length; i < r; i++)
          if (((n = oe[i]), n.el.id == this.id && (!t || n.anim == t))) {
            if (t) return n.status
            a.push({ anim: n.anim, status: n.status })
          }
        return t ? 0 : a
      }),
      (Zt.pause = function (t) {
        for (var r = 0; r < oe.length; r++)
          oe[r].el.id != this.id ||
            (t && oe[r].anim != t) ||
            (!1 !== e("raphael.anim.pause." + this.id, this, oe[r].anim) &&
              (oe[r].paused = !0))
        return this
      }),
      (Zt.resume = function (t) {
        for (var r = 0; r < oe.length; r++)
          if (oe[r].el.id == this.id && (!t || oe[r].anim == t)) {
            var n = oe[r]
            !1 !== e("raphael.anim.resume." + this.id, this, n.anim) &&
              (delete n.paused, this.status(n.anim, n.status))
          }
        return this
      }),
      (Zt.stop = function (t) {
        for (var r = 0; r < oe.length; r++)
          oe[r].el.id != this.id ||
            (t && oe[r].anim != t) ||
            (!1 !== e("raphael.anim.stop." + this.id, this, oe[r].anim) &&
              oe.splice(r--, 1))
        return this
      }),
      e.on("raphael.remove", y),
      e.on("raphael.clear", y),
      (Zt.toString = function () {
        return "Rapha毛l鈥檚 object"
      })
    var le = function (t) {
        if (((this.items = []), (this.length = 0), (this.type = "set"), t))
          for (var e = 0, r = t.length; e < r; e++)
            !t[e] ||
              (t[e].constructor != Zt.constructor && t[e].constructor != le) ||
              ((this[this.items.length] = this.items[this.items.length] = t[e]),
              this.length++)
      },
      fe = le.prototype
    ;(fe.push = function () {
      for (var t, e, r = 0, n = arguments.length; r < n; r++)
        !(t = arguments[r]) ||
          (t.constructor != Zt.constructor && t.constructor != le) ||
          ((e = this.items.length),
          (this[e] = this.items[e] = t),
          this.length++)
      return this
    }),
      (fe.pop = function () {
        return this.length && delete this[this.length--], this.items.pop()
      }),
      (fe.forEach = function (t, e) {
        for (var r = 0, n = this.items.length; r < n; r++)
          if (!1 === t.call(e, this.items[r], r)) return this
        return this
      })
    for (var pe in Zt)
      Zt[C](pe) &&
        (fe[pe] = (function (t) {
          return function () {
            var e = arguments
            return this.forEach(function (r) {
              r[t][N](r, e)
            })
          }
        })(pe))
    return (
      (fe.attr = function (t, e) {
        if (t && r.is(t, W) && r.is(t[0], "object"))
          for (var n = 0, a = t.length; n < a; n++) this.items[n].attr(t[n])
        else
          for (var i = 0, s = this.items.length; i < s; i++)
            this.items[i].attr(t, e)
        return this
      }),
      (fe.clear = function () {
        for (; this.length; ) this.pop()
      }),
      (fe.splice = function (t, e, r) {
        ;(t = t < 0 ? G(this.length + t, 0) : t),
          (e = G(0, j(this.length - t, e)))
        var n,
          a = [],
          i = [],
          s = []
        for (n = 2; n < arguments.length; n++) s.push(arguments[n])
        for (n = 0; n < e; n++) i.push(this[t + n])
        for (; n < this.length - t; n++) a.push(this[t + n])
        var o = s.length
        for (n = 0; n < o + a.length; n++)
          this.items[t + n] = this[t + n] = n < o ? s[n] : a[n - o]
        for (n = this.items.length = this.length -= e - o; this[n]; )
          delete this[n++]
        return new le(i)
      }),
      (fe.exclude = function (t) {
        for (var e = 0, r = this.length; e < r; e++)
          if (this[e] == t) return this.splice(e, 1), !0
      }),
      (fe.animate = function (t, e, n, a) {
        ;(r.is(n, "function") || !n) && (a = n || null)
        var i,
          s,
          o = this.items.length,
          c = o,
          h = this
        if (!o) return this
        a &&
          (s = function () {
            !--o && a.call(h)
          }),
          (n = r.is(n, "string") ? n : s)
        var u = r.animation(t, e, n, s)
        for (i = this.items[--c].animate(u); c--; )
          this.items[c] &&
            !this.items[c].removed &&
            this.items[c].animateWith(i, u, u),
            (this.items[c] && !this.items[c].removed) || o--
        return this
      }),
      (fe.insertAfter = function (t) {
        for (var e = this.items.length; e--; ) this.items[e].insertAfter(t)
        return this
      }),
      (fe.getBBox = function () {
        for (var t = [], e = [], r = [], n = [], a = this.items.length; a--; )
          if (!this.items[a].removed) {
            var i = this.items[a].getBBox()
            t.push(i.x),
              e.push(i.y),
              r.push(i.x + i.width),
              n.push(i.y + i.height)
          }
        return (
          (t = j[N](0, t)),
          (e = j[N](0, e)),
          (r = G[N](0, r)),
          (n = G[N](0, n)),
          { x: t, y: e, x2: r, y2: n, width: r - t, height: n - e }
        )
      }),
      (fe.clone = function (t) {
        t = this.paper.set()
        for (var e = 0, r = this.items.length; e < r; e++)
          t.push(this.items[e].clone())
        return t
      }),
      (fe.toString = function () {
        return "Rapha毛l鈥榮 set"
      }),
      (fe.glow = function (t) {
        var e = this.paper.set()
        return (
          this.forEach(function (r, n) {
            var a = r.glow(t)
            null != a &&
              a.forEach(function (t, r) {
                e.push(t)
              })
          }),
          e
        )
      }),
      (fe.isPointInside = function (t, e) {
        var r = !1
        return (
          this.forEach(function (n) {
            if (n.isPointInside(t, e)) return (r = !0), !1
          }),
          r
        )
      }),
      (r.registerFont = function (t) {
        if (!t.face) return t
        this.fonts = this.fonts || {}
        var e = { w: t.w, face: {}, glyphs: {} },
          r = t.face["font-family"]
        for (var n in t.face) t.face[C](n) && (e.face[n] = t.face[n])
        if (
          (this.fonts[r] ? this.fonts[r].push(e) : (this.fonts[r] = [e]),
          !t.svg)
        ) {
          e.face["units-per-em"] = J(t.face["units-per-em"], 10)
          for (var a in t.glyphs)
            if (t.glyphs[C](a)) {
              var i = t.glyphs[a]
              if (
                ((e.glyphs[a] = {
                  w: i.w,
                  k: {},
                  d:
                    i.d &&
                    "M" +
                      i.d.replace(/[mlcxtrv]/g, function (t) {
                        return (
                          { l: "L", c: "C", x: "z", t: "m", r: "l", v: "c" }[
                            t
                          ] || "M"
                        )
                      }) +
                      "z"
                }),
                i.k)
              )
                for (var s in i.k) i[C](s) && (e.glyphs[a].k[s] = i.k[s])
            }
        }
        return t
      }),
      (_.getFont = function (t, e, n, a) {
        if (
          ((a = a || "normal"),
          (n = n || "normal"),
          (e =
            +e ||
            { normal: 400, bold: 700, lighter: 300, bolder: 800 }[e] ||
            400),
          r.fonts)
        ) {
          var i = r.fonts[t]
          if (!i) {
            var s = new RegExp(
              "(^|\\s)" + t.replace(/[^\w\d\s+!~.:_-]/g, R) + "(\\s|$)",
              "i"
            )
            for (var o in r.fonts)
              if (r.fonts[C](o) && s.test(o)) {
                i = r.fonts[o]
                break
              }
          }
          var c
          if (i)
            for (
              var h = 0, u = i.length;
              h < u &&
              ((c = i[h]),
              c.face["font-weight"] != e ||
                (c.face["font-style"] != n && c.face["font-style"]) ||
                c.face["font-stretch"] != a);
              h++
            );
          return c
        }
      }),
      (_.print = function (t, e, n, a, i, s, o, c) {
        ;(s = s || "middle"),
          (o = G(j(o || 0, 1), -1)),
          (c = G(j(c || 1, 3), 1))
        var h,
          u = M(n)[I](R),
          l = 0,
          f = 0,
          p = R
        if ((r.is(a, "string") && (a = this.getFont(a)), a)) {
          h = (i || 16) / a.face["units-per-em"]
          for (
            var d = a.face.bbox[I](w),
              g = +d[0],
              m = d[3] - d[1],
              v = 0,
              x = +d[1] + ("baseline" == s ? m + +a.face.descent : m / 2),
              y = 0,
              b = u.length;
            y < b;
            y++
          ) {
            if ("\n" == u[y]) (l = 0), (E = 0), (f = 0), (v += m * c)
            else {
              var _ = (f && a.glyphs[u[y - 1]]) || {},
                E = a.glyphs[u[y]]
              ;(l += f
                ? (_.w || a.w) + ((_.k && _.k[u[y]]) || 0) + a.w * o
                : 0),
                (f = 1)
            }
            E &&
              E.d &&
              (p += r.transformPath(E.d, [
                "t",
                l * h,
                v * h,
                "s",
                h,
                h,
                g,
                x,
                "t",
                (t - g) / h,
                (e - x) / h
              ]))
          }
        }
        return this.path(p).attr({ fill: "#000", stroke: "none" })
      }),
      (_.add = function (t) {
        if (r.is(t, "array"))
          for (var e, n = this.set(), a = 0, i = t.length; a < i; a++)
            (e = t[a] || {}), E[C](e.type) && n.push(this[e.type]().attr(e))
        return n
      }),
      (r.format = function (t, e) {
        var n = r.is(e, W) ? [0][T](e) : arguments
        return (
          t &&
            r.is(t, "string") &&
            n.length - 1 &&
            (t = t.replace(k, function (t, e) {
              return null == n[++e] ? R : n[e]
            })),
          t || R
        )
      }),
      (r.fullfill = (function () {
        var t = /\{([^\}]+)\}/g,
          e = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
          r = function (t, r, n) {
            var a = n
            return (
              r.replace(e, function (t, e, r, n, i) {
                ;(e = e || n),
                  a &&
                    (e in a && (a = a[e]),
                    "function" == typeof a && i && (a = a()))
              }),
              (a = (null == a || a == n ? t : a) + "")
            )
          }
        return function (e, n) {
          return String(e).replace(t, function (t, e) {
            return r(t, e, n)
          })
        }
      })()),
      (r.ninja = function () {
        return B.was ? (S.win.Raphael = B.is) : delete Raphael, r
      }),
      (r.st = fe),
      (function (t, e, n) {
        function a() {
          ;/in/.test(t.readyState) ? setTimeout(a, 9) : r.eve("raphael.DOMload")
        }
        null == t.readyState &&
          t.addEventListener &&
          (t.addEventListener(
            "DOMContentLoaded",
            (n = function () {
              t.removeEventListener("DOMContentLoaded", n, !1),
                (t.readyState = "complete")
            }),
            !1
          ),
          (t.readyState = "loading")),
          a()
      })(document),
      e.on("raphael.DOMload", function () {
        b = !0
      }),
      (function () {
        if (r.svg) {
          var t = "hasOwnProperty",
            e = String,
            n = parseFloat,
            a = parseInt,
            i = Math,
            s = i.max,
            o = i.abs,
            c = i.pow,
            h = /[, ]+/,
            u = r.eve,
            l = "",
            f = " ",
            p = "http://www.w3.org/1999/xlink",
            d = {
              block: "M5,0 0,2.5 5,5z",
              classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
              diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
              open: "M6,1 1,3.5 6,6",
              oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
            },
            g = {}
          r.toString = function () {
            return (
              "Your browser supports SVG.\nYou are running Rapha毛l " +
              this.version
            )
          }
          var m = function (n, a) {
              if (a) {
                "string" == typeof n && (n = m(n))
                for (var i in a)
                  a[t](i) &&
                    ("xlink:" == i.substring(0, 6)
                      ? n.setAttributeNS(p, i.substring(6), e(a[i]))
                      : n.setAttribute(i, e(a[i])))
              } else
                (n = r._g.doc.createElementNS("http://www.w3.org/2000/svg", n)),
                  n.style && (n.style.webkitTapHighlightColor = "rgba(0,0,0,0)")
              return n
            },
            v = function (t, a) {
              var h = "linear",
                u = t.id + a,
                f = 0.5,
                p = 0.5,
                d = t.node,
                g = t.paper,
                v = d.style,
                x = r._g.doc.getElementById(u)
              if (!x) {
                if (
                  ((a = e(a).replace(r._radial_gradient, function (t, e, r) {
                    if (((h = "radial"), e && r)) {
                      ;(f = n(e)), (p = n(r))
                      var a = 2 * (p > 0.5) - 1
                      c(f - 0.5, 2) + c(p - 0.5, 2) > 0.25 &&
                        (p = i.sqrt(0.25 - c(f - 0.5, 2)) * a + 0.5) &&
                        0.5 != p &&
                        (p = p.toFixed(5) - 1e-5 * a)
                    }
                    return l
                  })),
                  (a = a.split(/\s*\-\s*/)),
                  "linear" == h)
                ) {
                  var y = a.shift()
                  if (((y = -n(y)), isNaN(y))) return null
                  var b = [0, 0, i.cos(r.rad(y)), i.sin(r.rad(y))],
                    _ = 1 / (s(o(b[2]), o(b[3])) || 1)
                  ;(b[2] *= _),
                    (b[3] *= _),
                    b[2] < 0 && ((b[0] = -b[2]), (b[2] = 0)),
                    b[3] < 0 && ((b[1] = -b[3]), (b[3] = 0))
                }
                var w = r._parseDots(a)
                if (!w) return null
                if (
                  ((u = u.replace(/[\(\)\s,\xb0#]/g, "_")),
                  t.gradient &&
                    u != t.gradient.id &&
                    (g.defs.removeChild(t.gradient), delete t.gradient),
                  !t.gradient)
                ) {
                  ;(x = m(h + "Gradient", { id: u })),
                    (t.gradient = x),
                    m(
                      x,
                      "radial" == h
                        ? { fx: f, fy: p }
                        : {
                            x1: b[0],
                            y1: b[1],
                            x2: b[2],
                            y2: b[3],
                            gradientTransform: t.matrix.invert()
                          }
                    ),
                    g.defs.appendChild(x)
                  for (var E = 0, k = w.length; E < k; E++)
                    x.appendChild(
                      m("stop", {
                        offset: w[E].offset ? w[E].offset : E ? "100%" : "0%",
                        "stop-color": w[E].color || "#fff"
                      })
                    )
                }
              }
              return (
                m(d, {
                  fill: "url(#" + u + ")",
                  opacity: 1,
                  "fill-opacity": 1
                }),
                (v.fill = l),
                (v.opacity = 1),
                (v.fillOpacity = 1),
                1
              )
            },
            x = function (t) {
              var e = t.getBBox(1)
              m(t.pattern, {
                patternTransform:
                  t.matrix.invert() + " translate(" + e.x + "," + e.y + ")"
              })
            },
            y = function (n, a, i) {
              if ("path" == n.type) {
                for (
                  var s,
                    o,
                    c,
                    h,
                    u,
                    f = e(a).toLowerCase().split("-"),
                    p = n.paper,
                    v = i ? "end" : "start",
                    x = n.node,
                    y = n.attrs,
                    b = y["stroke-width"],
                    _ = f.length,
                    w = "classic",
                    E = 3,
                    k = 3,
                    C = 5;
                  _--;

                )
                  switch (f[_]) {
                    case "block":
                    case "classic":
                    case "oval":
                    case "diamond":
                    case "open":
                    case "none":
                      w = f[_]
                      break
                    case "wide":
                      k = 5
                      break
                    case "narrow":
                      k = 2
                      break
                    case "long":
                      E = 5
                      break
                    case "short":
                      E = 2
                  }
                if (
                  ("open" == w
                    ? ((E += 2),
                      (k += 2),
                      (C += 2),
                      (c = 1),
                      (h = i ? 4 : 1),
                      (u = { fill: "none", stroke: y.stroke }))
                    : ((h = c = E / 2),
                      (u = { fill: y.stroke, stroke: "none" })),
                  n._.arrows
                    ? i
                      ? (n._.arrows.endPath && g[n._.arrows.endPath]--,
                        n._.arrows.endMarker && g[n._.arrows.endMarker]--)
                      : (n._.arrows.startPath && g[n._.arrows.startPath]--,
                        n._.arrows.startMarker && g[n._.arrows.startMarker]--)
                    : (n._.arrows = {}),
                  "none" != w)
                ) {
                  var S = "raphael-marker-" + w,
                    B = "raphael-marker-" + v + w + E + k
                  r._g.doc.getElementById(S)
                    ? g[S]++
                    : (p.defs.appendChild(
                        m(m("path"), {
                          "stroke-linecap": "round",
                          d: d[w],
                          id: S
                        })
                      ),
                      (g[S] = 1))
                  var A,
                    N = r._g.doc.getElementById(B)
                  N
                    ? (g[B]++, (A = N.getElementsByTagName("use")[0]))
                    : ((N = m(m("marker"), {
                        id: B,
                        markerHeight: k,
                        markerWidth: E,
                        orient: "auto",
                        refX: h,
                        refY: k / 2
                      })),
                      (A = m(m("use"), {
                        "xlink:href": "#" + S,
                        transform:
                          (i ? "rotate(180 " + E / 2 + " " + k / 2 + ") " : l) +
                          "scale(" +
                          E / C +
                          "," +
                          k / C +
                          ")",
                        "stroke-width": (1 / ((E / C + k / C) / 2)).toFixed(4)
                      })),
                      N.appendChild(A),
                      p.defs.appendChild(N),
                      (g[B] = 1)),
                    m(A, u)
                  var T = c * ("diamond" != w && "oval" != w)
                  i
                    ? ((s = n._.arrows.startdx * b || 0),
                      (o = r.getTotalLength(y.path) - T * b))
                    : ((s = T * b),
                      (o =
                        r.getTotalLength(y.path) -
                        (n._.arrows.enddx * b || 0))),
                    (u = {}),
                    (u["marker-" + v] = "url(#" + B + ")"),
                    (o || s) && (u.d = r.getSubpath(y.path, s, o)),
                    m(x, u),
                    (n._.arrows[v + "Path"] = S),
                    (n._.arrows[v + "Marker"] = B),
                    (n._.arrows[v + "dx"] = T),
                    (n._.arrows[v + "Type"] = w),
                    (n._.arrows[v + "String"] = a)
                } else
                  i
                    ? ((s = n._.arrows.startdx * b || 0),
                      (o = r.getTotalLength(y.path) - s))
                    : ((s = 0),
                      (o =
                        r.getTotalLength(y.path) -
                        (n._.arrows.enddx * b || 0))),
                    n._.arrows[v + "Path"] &&
                      m(x, { d: r.getSubpath(y.path, s, o) }),
                    delete n._.arrows[v + "Path"],
                    delete n._.arrows[v + "Marker"],
                    delete n._.arrows[v + "dx"],
                    delete n._.arrows[v + "Type"],
                    delete n._.arrows[v + "String"]
                for (u in g)
                  if (g[t](u) && !g[u]) {
                    var O = r._g.doc.getElementById(u)
                    O && O.parentNode.removeChild(O)
                  }
              }
            },
            b = {
              "": [0],
              none: [0],
              "-": [3, 1],
              ".": [1, 1],
              "-.": [3, 1, 1, 1],
              "-..": [3, 1, 1, 1, 1, 1],
              ". ": [1, 3],
              "- ": [4, 3],
              "--": [8, 3],
              "- .": [4, 3, 1, 3],
              "--.": [8, 3, 1, 3],
              "--..": [8, 3, 1, 3, 1, 3]
            },
            _ = function (t, r, n) {
              if ((r = b[e(r).toLowerCase()])) {
                for (
                  var a = t.attrs["stroke-width"] || "1",
                    i =
                      { round: a, square: a, butt: 0 }[
                        t.attrs["stroke-linecap"] || n["stroke-linecap"]
                      ] || 0,
                    s = [],
                    o = r.length;
                  o--;

                )
                  s[o] = r[o] * a + (o % 2 ? 1 : -1) * i
                m(t.node, { "stroke-dasharray": s.join(",") })
              }
            },
            w = function (n, i) {
              var c = n.node,
                u = n.attrs,
                f = c.style.visibility
              c.style.visibility = "hidden"
              for (var d in i)
                if (i[t](d)) {
                  if (!r._availableAttrs[t](d)) continue
                  var g = i[d]
                  switch (((u[d] = g), d)) {
                    case "blur":
                      n.blur(g)
                      break
                    case "title":
                      var b = c.getElementsByTagName("title")
                      if (b.length && (b = b[0])) b.firstChild.nodeValue = g
                      else {
                        b = m("title")
                        var w = r._g.doc.createTextNode(g)
                        b.appendChild(w), c.appendChild(b)
                      }
                      break
                    case "href":
                    case "target":
                      var k = c.parentNode
                      if ("a" != k.tagName.toLowerCase()) {
                        var C = m("a")
                        k.insertBefore(C, c), C.appendChild(c), (k = C)
                      }
                      "target" == d
                        ? k.setAttributeNS(p, "show", "blank" == g ? "new" : g)
                        : k.setAttributeNS(p, d, g)
                      break
                    case "cursor":
                      c.style.cursor = g
                      break
                    case "transform":
                      n.transform(g)
                      break
                    case "arrow-start":
                      y(n, g)
                      break
                    case "arrow-end":
                      y(n, g, 1)
                      break
                    case "clip-rect":
                      var S = e(g).split(h)
                      if (4 == S.length) {
                        n.clip &&
                          n.clip.parentNode.parentNode.removeChild(
                            n.clip.parentNode
                          )
                        var B = m("clipPath"),
                          A = m("rect")
                        ;(B.id = r.createUUID()),
                          m(A, { x: S[0], y: S[1], width: S[2], height: S[3] }),
                          B.appendChild(A),
                          n.paper.defs.appendChild(B),
                          m(c, { "clip-path": "url(#" + B.id + ")" }),
                          (n.clip = A)
                      }
                      if (!g) {
                        var N = c.getAttribute("clip-path")
                        if (N) {
                          var T = r._g.doc.getElementById(
                            N.replace(/(^url\(#|\)$)/g, l)
                          )
                          T && T.parentNode.removeChild(T),
                            m(c, { "clip-path": l }),
                            delete n.clip
                        }
                      }
                      break
                    case "path":
                      "path" == n.type &&
                        (m(c, {
                          d: g ? (u.path = r._pathToAbsolute(g)) : "M0,0"
                        }),
                        (n._.dirty = 1),
                        n._.arrows &&
                          ("startString" in n._.arrows &&
                            y(n, n._.arrows.startString),
                          "endString" in n._.arrows &&
                            y(n, n._.arrows.endString, 1)))
                      break
                    case "width":
                      if ((c.setAttribute(d, g), (n._.dirty = 1), !u.fx)) break
                      ;(d = "x"), (g = u.x)
                    case "x":
                      u.fx && (g = -u.x - (u.width || 0))
                    case "rx":
                      if ("rx" == d && "rect" == n.type) break
                    case "cx":
                      c.setAttribute(d, g), n.pattern && x(n), (n._.dirty = 1)
                      break
                    case "height":
                      if ((c.setAttribute(d, g), (n._.dirty = 1), !u.fy)) break
                      ;(d = "y"), (g = u.y)
                    case "y":
                      u.fy && (g = -u.y - (u.height || 0))
                    case "ry":
                      if ("ry" == d && "rect" == n.type) break
                    case "cy":
                      c.setAttribute(d, g), n.pattern && x(n), (n._.dirty = 1)
                      break
                    case "r":
                      "rect" == n.type
                        ? m(c, { rx: g, ry: g })
                        : c.setAttribute(d, g),
                        (n._.dirty = 1)
                      break
                    case "src":
                      "image" == n.type && c.setAttributeNS(p, "href", g)
                      break
                    case "stroke-width":
                      ;(1 == n._.sx && 1 == n._.sy) ||
                        (g /= s(o(n._.sx), o(n._.sy)) || 1),
                        n.paper._vbSize && (g *= n.paper._vbSize),
                        c.setAttribute(d, g),
                        u["stroke-dasharray"] && _(n, u["stroke-dasharray"], i),
                        n._.arrows &&
                          ("startString" in n._.arrows &&
                            y(n, n._.arrows.startString),
                          "endString" in n._.arrows &&
                            y(n, n._.arrows.endString, 1))
                      break
                    case "stroke-dasharray":
                      _(n, g, i)
                      break
                    case "fill":
                      var O = e(g).match(r._ISURL)
                      if (O) {
                        B = m("pattern")
                        var R = m("image")
                        ;(B.id = r.createUUID()),
                          m(B, {
                            x: 0,
                            y: 0,
                            patternUnits: "userSpaceOnUse",
                            height: 1,
                            width: 1
                          }),
                          m(R, { x: 0, y: 0, "xlink:href": O[1] }),
                          B.appendChild(R),
                          (function (t) {
                            r._preload(O[1], function () {
                              var e = this.offsetWidth,
                                r = this.offsetHeight
                              m(t, { width: e, height: r }),
                                m(R, { width: e, height: r }),
                                n.paper.safari()
                            })
                          })(B),
                          n.paper.defs.appendChild(B),
                          m(c, { fill: "url(#" + B.id + ")" }),
                          (n.pattern = B),
                          n.pattern && x(n)
                        break
                      }
                      var P = r.getRGB(g)
                      if (P.error) {
                        if (
                          ("circle" == n.type ||
                            "ellipse" == n.type ||
                            "r" != e(g).charAt()) &&
                          v(n, g)
                        ) {
                          if ("opacity" in u || "fill-opacity" in u) {
                            var M = r._g.doc.getElementById(
                              c.getAttribute("fill").replace(/^url\(#|\)$/g, l)
                            )
                            if (M) {
                              var I = M.getElementsByTagName("stop")
                              m(I[I.length - 1], {
                                "stop-opacity":
                                  ("opacity" in u ? u.opacity : 1) *
                                  ("fill-opacity" in u ? u["fill-opacity"] : 1)
                              })
                            }
                          }
                          ;(u.gradient = g), (u.fill = "none")
                          break
                        }
                      } else
                        delete i.gradient,
                          delete u.gradient,
                          !r.is(u.opacity, "undefined") &&
                            r.is(i.opacity, "undefined") &&
                            m(c, { opacity: u.opacity }),
                          !r.is(u["fill-opacity"], "undefined") &&
                            r.is(i["fill-opacity"], "undefined") &&
                            m(c, { "fill-opacity": u["fill-opacity"] })
                      P[t]("opacity") &&
                        m(c, {
                          "fill-opacity":
                            P.opacity > 1 ? P.opacity / 100 : P.opacity
                        })
                    case "stroke":
                      ;(P = r.getRGB(g)),
                        c.setAttribute(d, P.hex),
                        "stroke" == d &&
                          P[t]("opacity") &&
                          m(c, {
                            "stroke-opacity":
                              P.opacity > 1 ? P.opacity / 100 : P.opacity
                          }),
                        "stroke" == d &&
                          n._.arrows &&
                          ("startString" in n._.arrows &&
                            y(n, n._.arrows.startString),
                          "endString" in n._.arrows &&
                            y(n, n._.arrows.endString, 1))
                      break
                    case "gradient":
                      ;("circle" == n.type ||
                        "ellipse" == n.type ||
                        "r" != e(g).charAt()) &&
                        v(n, g)
                      break
                    case "opacity":
                      u.gradient &&
                        !u[t]("stroke-opacity") &&
                        m(c, { "stroke-opacity": g > 1 ? g / 100 : g })
                    case "fill-opacity":
                      if (u.gradient) {
                        ;(M = r._g.doc.getElementById(
                          c.getAttribute("fill").replace(/^url\(#|\)$/g, l)
                        )),
                          M &&
                            ((I = M.getElementsByTagName("stop")),
                            m(I[I.length - 1], { "stop-opacity": g }))
                        break
                      }
                    default:
                      "font-size" == d && (g = a(g, 10) + "px")
                      var F = d.replace(/(\-.)/g, function (t) {
                        return t.substring(1).toUpperCase()
                      })
                      ;(c.style[F] = g), (n._.dirty = 1), c.setAttribute(d, g)
                  }
                }
              E(n, i), (c.style.visibility = f)
            },
            E = function (n, i) {
              if (
                "text" == n.type &&
                (i[t]("text") ||
                  i[t]("font") ||
                  i[t]("font-size") ||
                  i[t]("x") ||
                  i[t]("y"))
              ) {
                var s = n.attrs,
                  o = n.node,
                  c = o.firstChild
                    ? a(
                        r._g.doc.defaultView
                          .getComputedStyle(o.firstChild, l)
                          .getPropertyValue("font-size"),
                        10
                      )
                    : 10
                if (i[t]("text")) {
                  for (s.text = i.text; o.firstChild; )
                    o.removeChild(o.firstChild)
                  for (
                    var h,
                      u = e(i.text).split("\n"),
                      f = [],
                      p = 0,
                      d = u.length;
                    p < d;
                    p++
                  )
                    (h = m("tspan")),
                      p && m(h, { dy: 1.2 * c, x: s.x }),
                      h.appendChild(r._g.doc.createTextNode(u[p])),
                      o.appendChild(h),
                      (f[p] = h)
                } else
                  for (
                    f = o.getElementsByTagName("tspan"), p = 0, d = f.length;
                    p < d;
                    p++
                  )
                    p ? m(f[p], { dy: 1.2 * c, x: s.x }) : m(f[0], { dy: 0 })
                m(o, { x: s.x, y: s.y }), (n._.dirty = 1)
                var g = n._getBBox(),
                  v = s.y - (g.y + g.height / 2)
                v && r.is(v, "finite") && m(f[0], { dy: v })
              }
            },
            k = function (t, e) {
              ;(this[0] = this.node = t),
                (t.raphael = !0),
                (this.id = r._oid++),
                (t.raphaelid = this.id),
                (this.matrix = r.matrix()),
                (this.realPath = null),
                (this.paper = e),
                (this.attrs = this.attrs || {}),
                (this._ = {
                  transform: [],
                  sx: 1,
                  sy: 1,
                  deg: 0,
                  dx: 0,
                  dy: 0,
                  dirty: 1
                }),
                !e.bottom && (e.bottom = this),
                (this.prev = e.top),
                e.top && (e.top.next = this),
                (e.top = this),
                (this.next = null)
            },
            C = r.el
          ;(k.prototype = C),
            (C.constructor = k),
            (r._engine.path = function (t, e) {
              var r = m("path")
              e.canvas && e.canvas.appendChild(r)
              var n = new k(r, e)
              return (
                (n.type = "path"),
                w(n, { fill: "none", stroke: "#000", path: t }),
                n
              )
            }),
            (C.rotate = function (t, r, a) {
              if (this.removed) return this
              if (
                ((t = e(t).split(h)),
                t.length - 1 && ((r = n(t[1])), (a = n(t[2]))),
                (t = n(t[0])),
                null == a && (r = a),
                null == r || null == a)
              ) {
                var i = this.getBBox(1)
                ;(r = i.x + i.width / 2), (a = i.y + i.height / 2)
              }
              return (
                this.transform(this._.transform.concat([["r", t, r, a]])), this
              )
            }),
            (C.scale = function (t, r, a, i) {
              if (this.removed) return this
              if (
                ((t = e(t).split(h)),
                t.length - 1 && ((r = n(t[1])), (a = n(t[2])), (i = n(t[3]))),
                (t = n(t[0])),
                null == r && (r = t),
                null == i && (a = i),
                null == a || null == i)
              )
                var s = this.getBBox(1)
              return (
                (a = null == a ? s.x + s.width / 2 : a),
                (i = null == i ? s.y + s.height / 2 : i),
                this.transform(this._.transform.concat([["s", t, r, a, i]])),
                this
              )
            }),
            (C.translate = function (t, r) {
              return this.removed
                ? this
                : ((t = e(t).split(h)),
                  t.length - 1 && (r = n(t[1])),
                  (t = n(t[0]) || 0),
                  (r = +r || 0),
                  this.transform(this._.transform.concat([["t", t, r]])),
                  this)
            }),
            (C.transform = function (e) {
              var n = this._
              if (null == e) return n.transform
              if (
                (r._extractTransform(this, e),
                this.clip && m(this.clip, { transform: this.matrix.invert() }),
                this.pattern && x(this),
                this.node && m(this.node, { transform: this.matrix }),
                1 != n.sx || 1 != n.sy)
              ) {
                var a = this.attrs[t]("stroke-width")
                  ? this.attrs["stroke-width"]
                  : 1
                this.attr({ "stroke-width": a })
              }
              return this
            }),
            (C.hide = function () {
              return (
                !this.removed &&
                  this.paper.safari((this.node.style.display = "none")),
                this
              )
            }),
            (C.show = function () {
              return (
                !this.removed &&
                  this.paper.safari((this.node.style.display = "")),
                this
              )
            }),
            (C.remove = function () {
              if (!this.removed && this.node.parentNode) {
                var t = this.paper
                t.__set__ && t.__set__.exclude(this),
                  u.unbind("raphael.*.*." + this.id),
                  this.gradient && t.defs.removeChild(this.gradient),
                  r._tear(this, t),
                  "a" == this.node.parentNode.tagName.toLowerCase()
                    ? this.node.parentNode.parentNode.removeChild(
                        this.node.parentNode
                      )
                    : this.node.parentNode.removeChild(this.node)
                for (var e in this)
                  this[e] =
                    "function" == typeof this[e] ? r._removedFactory(e) : null
                this.removed = !0
              }
            }),
            (C._getBBox = function () {
              if ("none" == this.node.style.display) {
                this.show()
                var t = !0
              }
              var e = {}
              try {
                e = this.node.getBBox()
              } catch (t) {
              } finally {
                e = e || {}
              }
              return t && this.hide(), e
            }),
            (C.attr = function (e, n) {
              if (this.removed) return this
              if (null == e) {
                var a = {}
                for (var i in this.attrs)
                  this.attrs[t](i) && (a[i] = this.attrs[i])
                return (
                  a.gradient &&
                    "none" == a.fill &&
                    (a.fill = a.gradient) &&
                    delete a.gradient,
                  (a.transform = this._.transform),
                  a
                )
              }
              if (null == n && r.is(e, "string")) {
                if (
                  "fill" == e &&
                  "none" == this.attrs.fill &&
                  this.attrs.gradient
                )
                  return this.attrs.gradient
                if ("transform" == e) return this._.transform
                for (
                  var s = e.split(h), o = {}, c = 0, l = s.length;
                  c < l;
                  c++
                )
                  (e = s[c]),
                    e in this.attrs
                      ? (o[e] = this.attrs[e])
                      : r.is(this.paper.customAttributes[e], "function")
                        ? (o[e] = this.paper.customAttributes[e].def)
                        : (o[e] = r._availableAttrs[e])
                return l - 1 ? o : o[s[0]]
              }
              if (null == n && r.is(e, "array")) {
                for (o = {}, c = 0, l = e.length; c < l; c++)
                  o[e[c]] = this.attr(e[c])
                return o
              }
              if (null != n) {
                var f = {}
                f[e] = n
              } else null != e && r.is(e, "object") && (f = e)
              for (var p in f)
                u("raphael.attr." + p + "." + this.id, this, f[p])
              for (p in this.paper.customAttributes)
                if (
                  this.paper.customAttributes[t](p) &&
                  f[t](p) &&
                  r.is(this.paper.customAttributes[p], "function")
                ) {
                  var d = this.paper.customAttributes[p].apply(
                    this,
                    [].concat(f[p])
                  )
                  this.attrs[p] = f[p]
                  for (var g in d) d[t](g) && (f[g] = d[g])
                }
              return w(this, f), this
            }),
            (C.toFront = function () {
              if (this.removed) return this
              "a" == this.node.parentNode.tagName.toLowerCase()
                ? this.node.parentNode.parentNode.appendChild(
                    this.node.parentNode
                  )
                : this.node.parentNode.appendChild(this.node)
              var t = this.paper
              return t.top != this && r._tofront(this, t), this
            }),
            (C.toBack = function () {
              if (this.removed) return this
              var t = this.node.parentNode
              "a" == t.tagName.toLowerCase()
                ? t.parentNode.insertBefore(
                    this.node.parentNode,
                    this.node.parentNode.parentNode.firstChild
                  )
                : t.firstChild != this.node &&
                  t.insertBefore(this.node, this.node.parentNode.firstChild),
                r._toback(this, this.paper)
              this.paper
              return this
            }),
            (C.insertAfter = function (t) {
              if (this.removed) return this
              var e = t.node || t[t.length - 1].node
              return (
                e.nextSibling
                  ? e.parentNode.insertBefore(this.node, e.nextSibling)
                  : e.parentNode.appendChild(this.node),
                r._insertafter(this, t, this.paper),
                this
              )
            }),
            (C.insertBefore = function (t) {
              if (this.removed) return this
              var e = t.node || t[0].node
              return (
                e.parentNode.insertBefore(this.node, e),
                r._insertbefore(this, t, this.paper),
                this
              )
            }),
            (C.blur = function (t) {
              var e = this
              if (0 != +t) {
                var n = m("filter"),
                  a = m("feGaussianBlur")
                ;(e.attrs.blur = t),
                  (n.id = r.createUUID()),
                  m(a, { stdDeviation: +t || 1.5 }),
                  n.appendChild(a),
                  e.paper.defs.appendChild(n),
                  (e._blur = n),
                  m(e.node, { filter: "url(#" + n.id + ")" })
              } else
                e._blur &&
                  (e._blur.parentNode.removeChild(e._blur),
                  delete e._blur,
                  delete e.attrs.blur),
                  e.node.removeAttribute("filter")
              return e
            }),
            (r._engine.circle = function (t, e, r, n) {
              var a = m("circle")
              t.canvas && t.canvas.appendChild(a)
              var i = new k(a, t)
              return (
                (i.attrs = {
                  cx: e,
                  cy: r,
                  r: n,
                  fill: "none",
                  stroke: "#000"
                }),
                (i.type = "circle"),
                m(a, i.attrs),
                i
              )
            }),
            (r._engine.rect = function (t, e, r, n, a, i) {
              var s = m("rect")
              t.canvas && t.canvas.appendChild(s)
              var o = new k(s, t)
              return (
                (o.attrs = {
                  x: e,
                  y: r,
                  width: n,
                  height: a,
                  r: i || 0,
                  rx: i || 0,
                  ry: i || 0,
                  fill: "none",
                  stroke: "#000"
                }),
                (o.type = "rect"),
                m(s, o.attrs),
                o
              )
            }),
            (r._engine.ellipse = function (t, e, r, n, a) {
              var i = m("ellipse")
              t.canvas && t.canvas.appendChild(i)
              var s = new k(i, t)
              return (
                (s.attrs = {
                  cx: e,
                  cy: r,
                  rx: n,
                  ry: a,
                  fill: "none",
                  stroke: "#000"
                }),
                (s.type = "ellipse"),
                m(i, s.attrs),
                s
              )
            }),
            (r._engine.image = function (t, e, r, n, a, i) {
              var s = m("image")
              m(s, {
                x: r,
                y: n,
                width: a,
                height: i,
                preserveAspectRatio: "none"
              }),
                s.setAttributeNS(p, "href", e),
                t.canvas && t.canvas.appendChild(s)
              var o = new k(s, t)
              return (
                (o.attrs = { x: r, y: n, width: a, height: i, src: e }),
                (o.type = "image"),
                o
              )
            }),
            (r._engine.text = function (t, e, n, a) {
              var i = m("text")
              t.canvas && t.canvas.appendChild(i)
              var s = new k(i, t)
              return (
                (s.attrs = {
                  x: e,
                  y: n,
                  "text-anchor": "middle",
                  text: a,
                  font: r._availableAttrs.font,
                  stroke: "none",
                  fill: "#000"
                }),
                (s.type = "text"),
                w(s, s.attrs),
                s
              )
            }),
            (r._engine.setSize = function (t, e) {
              return (
                (this.width = t || this.width),
                (this.height = e || this.height),
                this.canvas.setAttribute("width", this.width),
                this.canvas.setAttribute("height", this.height),
                this._viewBox && this.setViewBox.apply(this, this._viewBox),
                this
              )
            }),
            (r._engine.create = function () {
              var t = r._getContainer.apply(0, arguments),
                e = t && t.container,
                n = t.x,
                a = t.y,
                i = t.width,
                s = t.height
              if (!e) throw new Error("SVG container not found.")
              var o,
                c = m("svg"),
                h = "overflow:hidden;"
              return (
                (n = n || 0),
                (a = a || 0),
                (i = i || 512),
                (s = s || 342),
                m(c, {
                  height: s,
                  version: 1.1,
                  width: i,
                  xmlns: "http://www.w3.org/2000/svg"
                }),
                1 == e
                  ? ((c.style.cssText =
                      h + "position:absolute;left:" + n + "px;top:" + a + "px"),
                    r._g.doc.body.appendChild(c),
                    (o = 1))
                  : ((c.style.cssText = h + "position:relative"),
                    e.firstChild
                      ? e.insertBefore(c, e.firstChild)
                      : e.appendChild(c)),
                (e = new r._Paper()),
                (e.width = i),
                (e.height = s),
                (e.canvas = c),
                e.clear(),
                (e._left = e._top = 0),
                o && (e.renderfix = function () {}),
                e.renderfix(),
                e
              )
            }),
            (r._engine.setViewBox = function (t, e, r, n, a) {
              u("raphael.setViewBox", this, this._viewBox, [t, e, r, n, a])
              var i,
                o,
                c = s(r / this.width, n / this.height),
                h = this.top,
                l = a ? "xMidYMid meet" : "xMinYMin"
              for (
                null == t
                  ? (this._vbSize && (c = 1),
                    delete this._vbSize,
                    (i = "0 0 " + this.width + f + this.height))
                  : ((this._vbSize = c), (i = t + f + e + f + r + f + n)),
                  m(this.canvas, { viewBox: i, preserveAspectRatio: l });
                c && h;

              )
                (o = "stroke-width" in h.attrs ? h.attrs["stroke-width"] : 1),
                  h.attr({ "stroke-width": o }),
                  (h._.dirty = 1),
                  (h._.dirtyT = 1),
                  (h = h.prev)
              return (this._viewBox = [t, e, r, n, !!a]), this
            }),
            (r.prototype.renderfix = function () {
              var t,
                e = this.canvas,
                r = e.style
              try {
                t = e.getScreenCTM() || e.createSVGMatrix()
              } catch (r) {
                t = e.createSVGMatrix()
              }
              var n = -t.e % 1,
                a = -t.f % 1
              ;(n || a) &&
                (n &&
                  ((this._left = (this._left + n) % 1),
                  (r.left = this._left + "px")),
                a &&
                  ((this._top = (this._top + a) % 1),
                  (r.top = this._top + "px")))
            }),
            (r.prototype.clear = function () {
              r.eve("raphael.clear", this)
              for (var t = this.canvas; t.firstChild; )
                t.removeChild(t.firstChild)
              ;(this.bottom = this.top = null),
                (this.desc = m("desc")).appendChild(
                  r._g.doc.createTextNode("Created with Rapha毛l " + r.version)
                ),
                t.appendChild(this.desc),
                t.appendChild((this.defs = m("defs")))
            }),
            (r.prototype.remove = function () {
              u("raphael.remove", this),
                this.canvas.parentNode &&
                  this.canvas.parentNode.removeChild(this.canvas)
              for (var t in this)
                this[t] =
                  "function" == typeof this[t] ? r._removedFactory(t) : null
            })
          var S = r.st
          for (var B in C)
            C[t](B) &&
              !S[t](B) &&
              (S[B] = (function (t) {
                return function () {
                  var e = arguments
                  return this.forEach(function (r) {
                    r[t].apply(r, e)
                  })
                }
              })(B))
        }
      })(),
      (function () {
        if (r.vml) {
          var t = "hasOwnProperty",
            e = String,
            n = parseFloat,
            a = Math,
            i = a.round,
            s = a.max,
            o = a.min,
            c = a.abs,
            h = /[, ]+/,
            u = r.eve,
            l = " ",
            f = "",
            p = {
              M: "m",
              L: "l",
              C: "c",
              Z: "x",
              m: "t",
              l: "r",
              c: "v",
              z: "x"
            },
            d = /([clmz]),?([^clmz]*)/gi,
            g = / progid:\S+Blur\([^\)]+\)/g,
            m = /-?[^,\s-]+/g,
            v = "position:absolute;left:0;top:0;width:1px;height:1px",
            x = 21600,
            y = { path: 1, rect: 1, image: 1 },
            b = { circle: 1, ellipse: 1 },
            _ = function (t) {
              var n = /[ahqstv]/gi,
                a = r._pathToAbsolute
              if (
                (e(t).match(n) && (a = r._path2curve),
                (n = /[clmz]/g),
                a == r._pathToAbsolute && !e(t).match(n))
              ) {
                var s = e(t).replace(d, function (t, e, r) {
                  var n = [],
                    a = "m" == e.toLowerCase(),
                    s = p[e]
                  return (
                    r.replace(m, function (t) {
                      a &&
                        2 == n.length &&
                        ((s += n + p["m" == e ? "l" : "L"]), (n = [])),
                        n.push(i(t * x))
                    }),
                    s + n
                  )
                })
                return s
              }
              var o,
                c,
                h = a(t)
              s = []
              for (var u = 0, g = h.length; u < g; u++) {
                ;(o = h[u]), (c = h[u][0].toLowerCase()), "z" == c && (c = "x")
                for (var v = 1, y = o.length; v < y; v++)
                  c += i(o[v] * x) + (v != y - 1 ? "," : f)
                s.push(c)
              }
              return s.join(l)
            },
            w = function (t, e, n) {
              var a = r.matrix()
              return a.rotate(-t, 0.5, 0.5), { dx: a.x(e, n), dy: a.y(e, n) }
            },
            E = function (t, e, r, n, a, i) {
              var s = t._,
                o = t.matrix,
                h = s.fillpos,
                u = t.node,
                f = u.style,
                p = 1,
                d = "",
                g = x / e,
                m = x / r
              if (((f.visibility = "hidden"), e && r)) {
                if (
                  ((u.coordsize = c(g) + l + c(m)),
                  (f.rotation = i * (e * r < 0 ? -1 : 1)),
                  i)
                ) {
                  var v = w(i, n, a)
                  ;(n = v.dx), (a = v.dy)
                }
                if (
                  (e < 0 && (d += "x"),
                  r < 0 && (d += " y") && (p = -1),
                  (f.flip = d),
                  (u.coordorigin = n * -g + l + a * -m),
                  h || s.fillsize)
                ) {
                  var y = u.getElementsByTagName("fill")
                  ;(y = y && y[0]),
                    u.removeChild(y),
                    h &&
                      ((v = w(i, o.x(h[0], h[1]), o.y(h[0], h[1]))),
                      (y.position = v.dx * p + l + v.dy * p)),
                    s.fillsize &&
                      (y.size =
                        s.fillsize[0] * c(e) + l + s.fillsize[1] * c(r)),
                    u.appendChild(y)
                }
                f.visibility = "visible"
              }
            }
          r.toString = function () {
            return (
              "Your browser doesn鈥檛 support SVG. Falling down to VML.\nYou are running Rapha毛l " +
              this.version
            )
          }
          var k = function (t, r, n) {
              for (
                var a = e(r).toLowerCase().split("-"),
                  i = n ? "end" : "start",
                  s = a.length,
                  o = "classic",
                  c = "medium",
                  h = "medium";
                s--;

              )
                switch (a[s]) {
                  case "block":
                  case "classic":
                  case "oval":
                  case "diamond":
                  case "open":
                  case "none":
                    o = a[s]
                    break
                  case "wide":
                  case "narrow":
                    h = a[s]
                    break
                  case "long":
                  case "short":
                    c = a[s]
                }
              var u = t.node.getElementsByTagName("stroke")[0]
              ;(u[i + "arrow"] = o),
                (u[i + "arrowlength"] = c),
                (u[i + "arrowwidth"] = h)
            },
            C = function (a, c) {
              a.attrs = a.attrs || {}
              var u = a.node,
                p = a.attrs,
                d = u.style,
                g =
                  y[a.type] &&
                  (c.x != p.x ||
                    c.y != p.y ||
                    c.width != p.width ||
                    c.height != p.height ||
                    c.cx != p.cx ||
                    c.cy != p.cy ||
                    c.rx != p.rx ||
                    c.ry != p.ry ||
                    c.r != p.r),
                m =
                  b[a.type] &&
                  (p.cx != c.cx ||
                    p.cy != c.cy ||
                    p.r != c.r ||
                    p.rx != c.rx ||
                    p.ry != c.ry),
                v = a
              for (var w in c) c[t](w) && (p[w] = c[w])
              if (
                (g && ((p.path = r._getPath[a.type](a)), (a._.dirty = 1)),
                c.href && (u.href = c.href),
                c.title && (u.title = c.title),
                c.target && (u.target = c.target),
                c.cursor && (d.cursor = c.cursor),
                "blur" in c && a.blur(c.blur),
                ((c.path && "path" == a.type) || g) &&
                  ((u.path = _(
                    ~e(p.path).toLowerCase().indexOf("r")
                      ? r._pathToAbsolute(p.path)
                      : p.path
                  )),
                  "image" == a.type &&
                    ((a._.fillpos = [p.x, p.y]),
                    (a._.fillsize = [p.width, p.height]),
                    E(a, 1, 1, 0, 0, 0))),
                "transform" in c && a.transform(c.transform),
                m)
              ) {
                var C = +p.cx,
                  B = +p.cy,
                  A = +p.rx || +p.r || 0,
                  T = +p.ry || +p.r || 0
                ;(u.path = r.format(
                  "ar{0},{1},{2},{3},{4},{1},{4},{1}x",
                  i((C - A) * x),
                  i((B - T) * x),
                  i((C + A) * x),
                  i((B + T) * x),
                  i(C * x)
                )),
                  (a._.dirty = 1)
              }
              if ("clip-rect" in c) {
                var O = e(c["clip-rect"]).split(h)
                if (4 == O.length) {
                  ;(O[2] = +O[2] + +O[0]), (O[3] = +O[3] + +O[1])
                  var R = u.clipRect || r._g.doc.createElement("div"),
                    P = R.style
                  ;(P.clip = r.format("rect({1}px {2}px {3}px {0}px)", O)),
                    u.clipRect ||
                      ((P.position = "absolute"),
                      (P.top = 0),
                      (P.left = 0),
                      (P.width = a.paper.width + "px"),
                      (P.height = a.paper.height + "px"),
                      u.parentNode.insertBefore(R, u),
                      R.appendChild(u),
                      (u.clipRect = R))
                }
                c["clip-rect"] ||
                  (u.clipRect && (u.clipRect.style.clip = "auto"))
              }
              if (a.textpath) {
                var M = a.textpath.style
                c.font && (M.font = c.font),
                  c["font-family"] &&
                    (M.fontFamily =
                      '"' +
                      c["font-family"]
                        .split(",")[0]
                        .replace(/^['"]+|['"]+$/g, f) +
                      '"'),
                  c["font-size"] && (M.fontSize = c["font-size"]),
                  c["font-weight"] && (M.fontWeight = c["font-weight"]),
                  c["font-style"] && (M.fontStyle = c["font-style"])
              }
              if (
                ("arrow-start" in c && k(v, c["arrow-start"]),
                "arrow-end" in c && k(v, c["arrow-end"], 1),
                null != c.opacity ||
                  null != c["stroke-width"] ||
                  null != c.fill ||
                  null != c.src ||
                  null != c.stroke ||
                  null != c["stroke-width"] ||
                  null != c["stroke-opacity"] ||
                  null != c["fill-opacity"] ||
                  null != c["stroke-dasharray"] ||
                  null != c["stroke-miterlimit"] ||
                  null != c["stroke-linejoin"] ||
                  null != c["stroke-linecap"])
              ) {
                var I = u.getElementsByTagName("fill")
                if (
                  ((I = I && I[0]),
                  !I && (I = N("fill")),
                  "image" == a.type && c.src && (I.src = c.src),
                  c.fill && (I.on = !0),
                  (null != I.on && "none" != c.fill && null !== c.fill) ||
                    (I.on = !1),
                  I.on && c.fill)
                ) {
                  var F = e(c.fill).match(r._ISURL)
                  if (F) {
                    I.parentNode == u && u.removeChild(I),
                      (I.rotate = !0),
                      (I.src = F[1]),
                      (I.type = "tile")
                    var D = a.getBBox(1)
                    ;(I.position = D.x + l + D.y),
                      (a._.fillpos = [D.x, D.y]),
                      r._preload(F[1], function () {
                        a._.fillsize = [this.offsetWidth, this.offsetHeight]
                      })
                  } else
                    (I.color = r.getRGB(c.fill).hex),
                      (I.src = f),
                      (I.type = "solid"),
                      r.getRGB(c.fill).error &&
                        (v.type in { circle: 1, ellipse: 1 } ||
                          "r" != e(c.fill).charAt()) &&
                        S(v, c.fill, I) &&
                        ((p.fill = "none"),
                        (p.gradient = c.fill),
                        (I.rotate = !1))
                }
                if ("fill-opacity" in c || "opacity" in c) {
                  var L =
                    ((+p["fill-opacity"] + 1 || 2) - 1) *
                    ((+p.opacity + 1 || 2) - 1) *
                    ((+r.getRGB(c.fill).o + 1 || 2) - 1)
                  ;(L = o(s(L, 0), 1)),
                    (I.opacity = L),
                    I.src && (I.color = "none")
                }
                u.appendChild(I)
                var z =
                    u.getElementsByTagName("stroke") &&
                    u.getElementsByTagName("stroke")[0],
                  G = !1
                !z && (G = z = N("stroke")),
                  ((c.stroke && "none" != c.stroke) ||
                    c["stroke-width"] ||
                    null != c["stroke-opacity"] ||
                    c["stroke-dasharray"] ||
                    c["stroke-miterlimit"] ||
                    c["stroke-linejoin"] ||
                    c["stroke-linecap"]) &&
                    (z.on = !0),
                  ("none" == c.stroke ||
                    null === c.stroke ||
                    null == z.on ||
                    0 == c.stroke ||
                    0 == c["stroke-width"]) &&
                    (z.on = !1)
                var j = r.getRGB(c.stroke)
                z.on && c.stroke && (z.color = j.hex),
                  (L =
                    ((+p["stroke-opacity"] + 1 || 2) - 1) *
                    ((+p.opacity + 1 || 2) - 1) *
                    ((+j.o + 1 || 2) - 1))
                var U = 0.75 * (n(c["stroke-width"]) || 1)
                if (
                  ((L = o(s(L, 0), 1)),
                  null == c["stroke-width"] && (U = p["stroke-width"]),
                  c["stroke-width"] && (z.weight = U),
                  U && U < 1 && (L *= U) && (z.weight = 1),
                  (z.opacity = L),
                  c["stroke-linejoin"] &&
                    (z.joinstyle = c["stroke-linejoin"] || "miter"),
                  (z.miterlimit = c["stroke-miterlimit"] || 8),
                  c["stroke-linecap"] &&
                    (z.endcap =
                      "butt" == c["stroke-linecap"]
                        ? "flat"
                        : "square" == c["stroke-linecap"]
                          ? "square"
                          : "round"),
                  "stroke-dasharray" in c)
                ) {
                  var X = {
                    "-": "shortdash",
                    ".": "shortdot",
                    "-.": "shortdashdot",
                    "-..": "shortdashdotdot",
                    ". ": "dot",
                    "- ": "dash",
                    "--": "longdash",
                    "- .": "dashdot",
                    "--.": "longdashdot",
                    "--..": "longdashdotdot"
                  }
                  z.dashstyle = X[t](c["stroke-dasharray"])
                    ? X[c["stroke-dasharray"]]
                    : f
                }
                G && u.appendChild(z)
              }
              if ("text" == v.type) {
                v.paper.canvas.style.display = f
                var q = v.paper.span,
                  H = p.font && p.font.match(/\d+(?:\.\d*)?(?=px)/)
                ;(d = q.style),
                  p.font && (d.font = p.font),
                  p["font-family"] && (d.fontFamily = p["font-family"]),
                  p["font-weight"] && (d.fontWeight = p["font-weight"]),
                  p["font-style"] && (d.fontStyle = p["font-style"]),
                  (H = n(p["font-size"] || (H && H[0])) || 10),
                  (d.fontSize = 100 * H + "px"),
                  v.textpath.string &&
                    (q.innerHTML = e(v.textpath.string)
                      .replace(/</g, "&#60;")
                      .replace(/&/g, "&#38;")
                      .replace(/\n/g, "<br>"))
                var W = q.getBoundingClientRect()
                ;(v.W = p.w = (W.right - W.left) / 100),
                  (v.H = p.h = (W.bottom - W.top) / 100),
                  (v.X = p.x),
                  (v.Y = p.y + v.H / 2),
                  ("x" in c || "y" in c) &&
                    (v.path.v = r.format(
                      "m{0},{1}l{2},{1}",
                      i(p.x * x),
                      i(p.y * x),
                      i(p.x * x) + 1
                    ))
                for (
                  var V = [
                      "x",
                      "y",
                      "text",
                      "font",
                      "font-family",
                      "font-weight",
                      "font-style",
                      "font-size"
                    ],
                    Q = 0,
                    Y = V.length;
                  Q < Y;
                  Q++
                )
                  if (V[Q] in c) {
                    v._.dirty = 1
                    break
                  }
                switch (p["text-anchor"]) {
                  case "start":
                    ;(v.textpath.style["v-text-align"] = "left"),
                      (v.bbx = v.W / 2)
                    break
                  case "end":
                    ;(v.textpath.style["v-text-align"] = "right"),
                      (v.bbx = -v.W / 2)
                    break
                  default:
                    ;(v.textpath.style["v-text-align"] = "center"), (v.bbx = 0)
                }
                v.textpath.style["v-text-kern"] = !0
              }
            },
            S = function (t, i, s) {
              t.attrs = t.attrs || {}
              var o = (t.attrs, Math.pow),
                c = "linear",
                h = ".5 .5"
              if (
                ((t.attrs.gradient = i),
                (i = e(i).replace(r._radial_gradient, function (t, e, r) {
                  return (
                    (c = "radial"),
                    e &&
                      r &&
                      ((e = n(e)),
                      (r = n(r)),
                      o(e - 0.5, 2) + o(r - 0.5, 2) > 0.25 &&
                        (r =
                          a.sqrt(0.25 - o(e - 0.5, 2)) * (2 * (r > 0.5) - 1) +
                          0.5),
                      (h = e + l + r)),
                    f
                  )
                })),
                (i = i.split(/\s*\-\s*/)),
                "linear" == c)
              ) {
                var u = i.shift()
                if (((u = -n(u)), isNaN(u))) return null
              }
              var p = r._parseDots(i)
              if (!p) return null
              if (((t = t.shape || t.node), p.length)) {
                t.removeChild(s),
                  (s.on = !0),
                  (s.method = "none"),
                  (s.color = p[0].color),
                  (s.color2 = p[p.length - 1].color)
                for (var d = [], g = 0, m = p.length; g < m; g++)
                  p[g].offset && d.push(p[g].offset + l + p[g].color)
                ;(s.colors = d.length ? d.join() : "0% " + s.color),
                  "radial" == c
                    ? ((s.type = "gradientTitle"),
                      (s.focus = "100%"),
                      (s.focussize = "0 0"),
                      (s.focusposition = h),
                      (s.angle = 0))
                    : ((s.type = "gradient"), (s.angle = (270 - u) % 360)),
                  t.appendChild(s)
              }
              return 1
            },
            B = function (t, e) {
              ;(this[0] = this.node = t),
                (t.raphael = !0),
                (this.id = r._oid++),
                (t.raphaelid = this.id),
                (this.X = 0),
                (this.Y = 0),
                (this.attrs = {}),
                (this.paper = e),
                (this.matrix = r.matrix()),
                (this._ = {
                  transform: [],
                  sx: 1,
                  sy: 1,
                  dx: 0,
                  dy: 0,
                  deg: 0,
                  dirty: 1,
                  dirtyT: 1
                }),
                !e.bottom && (e.bottom = this),
                (this.prev = e.top),
                e.top && (e.top.next = this),
                (e.top = this),
                (this.next = null)
            },
            A = r.el
          ;(B.prototype = A),
            (A.constructor = B),
            (A.transform = function (t) {
              if (null == t) return this._.transform
              var n,
                a = this.paper._viewBoxShift,
                i = a ? "s" + [a.scale, a.scale] + "-1-1t" + [a.dx, a.dy] : f
              a &&
                (n = t = e(t).replace(/\.{3}|\u2026/g, this._.transform || f)),
                r._extractTransform(this, i + t)
              var s,
                o = this.matrix.clone(),
                c = this.skew,
                h = this.node,
                u = ~e(this.attrs.fill).indexOf("-"),
                p = !e(this.attrs.fill).indexOf("url(")
              if ((o.translate(1, 1), p || u || "image" == this.type))
                if (
                  ((c.matrix = "1 0 0 1"),
                  (c.offset = "0 0"),
                  (s = o.split()),
                  (u && s.noRotation) || !s.isSimple)
                ) {
                  h.style.filter = o.toFilter()
                  var d = this.getBBox(),
                    g = this.getBBox(1),
                    m = d.x - g.x,
                    v = d.y - g.y
                  ;(h.coordorigin = m * -x + l + v * -x), E(this, 1, 1, m, v, 0)
                } else
                  (h.style.filter = f),
                    E(this, s.scalex, s.scaley, s.dx, s.dy, s.rotate)
              else
                (h.style.filter = f), (c.matrix = e(o)), (c.offset = o.offset())
              return n && (this._.transform = n), this
            }),
            (A.rotate = function (t, r, a) {
              if (this.removed) return this
              if (null != t) {
                if (
                  ((t = e(t).split(h)),
                  t.length - 1 && ((r = n(t[1])), (a = n(t[2]))),
                  (t = n(t[0])),
                  null == a && (r = a),
                  null == r || null == a)
                ) {
                  var i = this.getBBox(1)
                  ;(r = i.x + i.width / 2), (a = i.y + i.height / 2)
                }
                return (
                  (this._.dirtyT = 1),
                  this.transform(this._.transform.concat([["r", t, r, a]])),
                  this
                )
              }
            }),
            (A.translate = function (t, r) {
              return this.removed
                ? this
                : ((t = e(t).split(h)),
                  t.length - 1 && (r = n(t[1])),
                  (t = n(t[0]) || 0),
                  (r = +r || 0),
                  this._.bbox && ((this._.bbox.x += t), (this._.bbox.y += r)),
                  this.transform(this._.transform.concat([["t", t, r]])),
                  this)
            }),
            (A.scale = function (t, r, a, i) {
              if (this.removed) return this
              if (
                ((t = e(t).split(h)),
                t.length - 1 &&
                  ((r = n(t[1])),
                  (a = n(t[2])),
                  (i = n(t[3])),
                  isNaN(a) && (a = null),
                  isNaN(i) && (i = null)),
                (t = n(t[0])),
                null == r && (r = t),
                null == i && (a = i),
                null == a || null == i)
              )
                var s = this.getBBox(1)
              return (
                (a = null == a ? s.x + s.width / 2 : a),
                (i = null == i ? s.y + s.height / 2 : i),
                this.transform(this._.transform.concat([["s", t, r, a, i]])),
                (this._.dirtyT = 1),
                this
              )
            }),
            (A.hide = function () {
              return !this.removed && (this.node.style.display = "none"), this
            }),
            (A.show = function () {
              return !this.removed && (this.node.style.display = f), this
            }),
            (A._getBBox = function () {
              return this.removed
                ? {}
                : {
                    x: this.X + (this.bbx || 0) - this.W / 2,
                    y: this.Y - this.H,
                    width: this.W,
                    height: this.H
                  }
            }),
            (A.remove = function () {
              if (!this.removed && this.node.parentNode) {
                this.paper.__set__ && this.paper.__set__.exclude(this),
                  r.eve.unbind("raphael.*.*." + this.id),
                  r._tear(this, this.paper),
                  this.node.parentNode.removeChild(this.node),
                  this.shape && this.shape.parentNode.removeChild(this.shape)
                for (var t in this)
                  this[t] =
                    "function" == typeof this[t] ? r._removedFactory(t) : null
                this.removed = !0
              }
            }),
            (A.attr = function (e, n) {
              if (this.removed) return this
              if (null == e) {
                var a = {}
                for (var i in this.attrs)
                  this.attrs[t](i) && (a[i] = this.attrs[i])
                return (
                  a.gradient &&
                    "none" == a.fill &&
                    (a.fill = a.gradient) &&
                    delete a.gradient,
                  (a.transform = this._.transform),
                  a
                )
              }
              if (null == n && r.is(e, "string")) {
                if (
                  "fill" == e &&
                  "none" == this.attrs.fill &&
                  this.attrs.gradient
                )
                  return this.attrs.gradient
                for (
                  var s = e.split(h), o = {}, c = 0, l = s.length;
                  c < l;
                  c++
                )
                  (e = s[c]),
                    e in this.attrs
                      ? (o[e] = this.attrs[e])
                      : r.is(this.paper.customAttributes[e], "function")
                        ? (o[e] = this.paper.customAttributes[e].def)
                        : (o[e] = r._availableAttrs[e])
                return l - 1 ? o : o[s[0]]
              }
              if (this.attrs && null == n && r.is(e, "array")) {
                for (o = {}, c = 0, l = e.length; c < l; c++)
                  o[e[c]] = this.attr(e[c])
                return o
              }
              var f
              null != n && ((f = {}), (f[e] = n)),
                null == n && r.is(e, "object") && (f = e)
              for (var p in f)
                u("raphael.attr." + p + "." + this.id, this, f[p])
              if (f) {
                for (p in this.paper.customAttributes)
                  if (
                    this.paper.customAttributes[t](p) &&
                    f[t](p) &&
                    r.is(this.paper.customAttributes[p], "function")
                  ) {
                    var d = this.paper.customAttributes[p].apply(
                      this,
                      [].concat(f[p])
                    )
                    this.attrs[p] = f[p]
                    for (var g in d) d[t](g) && (f[g] = d[g])
                  }
                f.text &&
                  "text" == this.type &&
                  (this.textpath.string = f.text),
                  C(this, f)
              }
              return this
            }),
            (A.toFront = function () {
              return (
                !this.removed && this.node.parentNode.appendChild(this.node),
                this.paper &&
                  this.paper.top != this &&
                  r._tofront(this, this.paper),
                this
              )
            }),
            (A.toBack = function () {
              return this.removed
                ? this
                : (this.node.parentNode.firstChild != this.node &&
                    (this.node.parentNode.insertBefore(
                      this.node,
                      this.node.parentNode.firstChild
                    ),
                    r._toback(this, this.paper)),
                  this)
            }),
            (A.insertAfter = function (t) {
              return this.removed
                ? this
                : (t.constructor == r.st.constructor && (t = t[t.length - 1]),
                  t.node.nextSibling
                    ? t.node.parentNode.insertBefore(
                        this.node,
                        t.node.nextSibling
                      )
                    : t.node.parentNode.appendChild(this.node),
                  r._insertafter(this, t, this.paper),
                  this)
            }),
            (A.insertBefore = function (t) {
              return this.removed
                ? this
                : (t.constructor == r.st.constructor && (t = t[0]),
                  t.node.parentNode.insertBefore(this.node, t.node),
                  r._insertbefore(this, t, this.paper),
                  this)
            }),
            (A.blur = function (t) {
              var e = this.node.runtimeStyle,
                n = e.filter
              return (
                (n = n.replace(g, f)),
                0 != +t
                  ? ((this.attrs.blur = t),
                    (e.filter =
                      n +
                      l +
                      " progid:DXImageTransform.Microsoft.Blur(pixelradius=" +
                      (+t || 1.5) +
                      ")"),
                    (e.margin = r.format("-{0}px 0 0 -{0}px", i(+t || 1.5))))
                  : ((e.filter = n), (e.margin = 0), delete this.attrs.blur),
                this
              )
            }),
            (r._engine.path = function (t, e) {
              var r = N("shape")
              ;(r.style.cssText = v),
                (r.coordsize = x + l + x),
                (r.coordorigin = e.coordorigin)
              var n = new B(r, e),
                a = { fill: "none", stroke: "#000" }
              t && (a.path = t),
                (n.type = "path"),
                (n.path = []),
                (n.Path = f),
                C(n, a),
                e.canvas.appendChild(r)
              var i = N("skew")
              return (
                (i.on = !0), r.appendChild(i), (n.skew = i), n.transform(f), n
              )
            }),
            (r._engine.rect = function (t, e, n, a, i, s) {
              var o = r._rectPath(e, n, a, i, s),
                c = t.path(o),
                h = c.attrs
              return (
                (c.X = h.x = e),
                (c.Y = h.y = n),
                (c.W = h.width = a),
                (c.H = h.height = i),
                (h.r = s),
                (h.path = o),
                (c.type = "rect"),
                c
              )
            }),
            (r._engine.ellipse = function (t, e, r, n, a) {
              var i = t.path()
              i.attrs
              return (
                (i.X = e - n),
                (i.Y = r - a),
                (i.W = 2 * n),
                (i.H = 2 * a),
                (i.type = "ellipse"),
                C(i, { cx: e, cy: r, rx: n, ry: a }),
                i
              )
            }),
            (r._engine.circle = function (t, e, r, n) {
              var a = t.path()
              a.attrs
              return (
                (a.X = e - n),
                (a.Y = r - n),
                (a.W = a.H = 2 * n),
                (a.type = "circle"),
                C(a, { cx: e, cy: r, r: n }),
                a
              )
            }),
            (r._engine.image = function (t, e, n, a, i, s) {
              var o = r._rectPath(n, a, i, s),
                c = t.path(o).attr({ stroke: "none" }),
                h = c.attrs,
                u = c.node,
                l = u.getElementsByTagName("fill")[0]
              return (
                (h.src = e),
                (c.X = h.x = n),
                (c.Y = h.y = a),
                (c.W = h.width = i),
                (c.H = h.height = s),
                (h.path = o),
                (c.type = "image"),
                l.parentNode == u && u.removeChild(l),
                (l.rotate = !0),
                (l.src = e),
                (l.type = "tile"),
                (c._.fillpos = [n, a]),
                (c._.fillsize = [i, s]),
                u.appendChild(l),
                E(c, 1, 1, 0, 0, 0),
                c
              )
            }),
            (r._engine.text = function (t, n, a, s) {
              var o = N("shape"),
                c = N("path"),
                h = N("textpath")
              ;(n = n || 0),
                (a = a || 0),
                (s = s || ""),
                (c.v = r.format(
                  "m{0},{1}l{2},{1}",
                  i(n * x),
                  i(a * x),
                  i(n * x) + 1
                )),
                (c.textpathok = !0),
                (h.string = e(s)),
                (h.on = !0),
                (o.style.cssText = v),
                (o.coordsize = x + l + x),
                (o.coordorigin = "0 0")
              var u = new B(o, t),
                p = {
                  fill: "#000",
                  stroke: "none",
                  font: r._availableAttrs.font,
                  text: s
                }
              ;(u.shape = o),
                (u.path = c),
                (u.textpath = h),
                (u.type = "text"),
                (u.attrs.text = e(s)),
                (u.attrs.x = n),
                (u.attrs.y = a),
                (u.attrs.w = 1),
                (u.attrs.h = 1),
                C(u, p),
                o.appendChild(h),
                o.appendChild(c),
                t.canvas.appendChild(o)
              var d = N("skew")
              return (
                (d.on = !0), o.appendChild(d), (u.skew = d), u.transform(f), u
              )
            }),
            (r._engine.setSize = function (t, e) {
              var n = this.canvas.style
              return (
                (this.width = t),
                (this.height = e),
                t == +t && (t += "px"),
                e == +e && (e += "px"),
                (n.width = t),
                (n.height = e),
                (n.clip = "rect(0 " + t + " " + e + " 0)"),
                this._viewBox &&
                  r._engine.setViewBox.apply(this, this._viewBox),
                this
              )
            }),
            (r._engine.setViewBox = function (t, e, n, a, i) {
              r.eve("raphael.setViewBox", this, this._viewBox, [t, e, n, a, i])
              var o,
                c,
                h = this.width,
                u = this.height,
                l = 1 / s(n / h, a / u)
              return (
                i &&
                  ((o = u / a),
                  (c = h / n),
                  n * o < h && (t -= (h - n * o) / 2 / o),
                  a * c < u && (e -= (u - a * c) / 2 / c)),
                (this._viewBox = [t, e, n, a, !!i]),
                (this._viewBoxShift = { dx: -t, dy: -e, scale: l }),
                this.forEach(function (t) {
                  t.transform("...")
                }),
                this
              )
            })
          var N
          ;(r._engine.initWin = function (t) {
            var e = t.document
            e.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)")
            try {
              !e.namespaces.rvml &&
                e.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"),
                (N = function (t) {
                  return e.createElement("<rvml:" + t + ' class="rvml">')
                })
            } catch (t) {
              N = function (t) {
                return e.createElement(
                  "<" +
                    t +
                    ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">'
                )
              }
            }
          }),
            r._engine.initWin(r._g.win),
            (r._engine.create = function () {
              var t = r._getContainer.apply(0, arguments),
                e = t.container,
                n = t.height,
                a = t.width,
                i = t.x,
                s = t.y
              if (!e) throw new Error("VML container not found.")
              var o = new r._Paper(),
                c = (o.canvas = r._g.doc.createElement("div")),
                h = c.style
              return (
                (i = i || 0),
                (s = s || 0),
                (a = a || 512),
                (n = n || 342),
                (o.width = a),
                (o.height = n),
                a == +a && (a += "px"),
                n == +n && (n += "px"),
                (o.coordsize = 216e5 + l + 216e5),
                (o.coordorigin = "0 0"),
                (o.span = r._g.doc.createElement("span")),
                (o.span.style.cssText =
                  "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;"),
                c.appendChild(o.span),
                (h.cssText = r.format(
                  "top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden",
                  a,
                  n
                )),
                1 == e
                  ? (r._g.doc.body.appendChild(c),
                    (h.left = i + "px"),
                    (h.top = s + "px"),
                    (h.position = "absolute"))
                  : e.firstChild
                    ? e.insertBefore(c, e.firstChild)
                    : e.appendChild(c),
                (o.renderfix = function () {}),
                o
              )
            }),
            (r.prototype.clear = function () {
              r.eve("raphael.clear", this),
                (this.canvas.innerHTML = f),
                (this.span = r._g.doc.createElement("span")),
                (this.span.style.cssText =
                  "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;"),
                this.canvas.appendChild(this.span),
                (this.bottom = this.top = null)
            }),
            (r.prototype.remove = function () {
              r.eve("raphael.remove", this),
                this.canvas.parentNode.removeChild(this.canvas)
              for (var t in this)
                this[t] =
                  "function" == typeof this[t] ? r._removedFactory(t) : null
              return !0
            })
          var T = r.st
          for (var O in A)
            A[t](O) &&
              !T[t](O) &&
              (T[O] = (function (t) {
                return function () {
                  var e = arguments
                  return this.forEach(function (r) {
                    r[t].apply(r, e)
                  })
                }
              })(O))
        }
      })(),
      B.was ? (S.win.Raphael = r) : (Raphael = r),
      r
    )
  }),
  "function" != typeof define)
)
  var define = require("amdefine")(module)
define("regulex", [
  "./Kit",
  "./NFA",
  "./RegExp",
  "./parse",
  "./visualize",
  "./libs/raphael"
], function (t, e, r, n, a, i) {
  return { Kit: t, NFA: e, RegExp: r, parse: n, Raphael: i, visualize: a }
})
