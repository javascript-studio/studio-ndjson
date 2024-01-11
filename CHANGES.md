# Changes

## 2.1.0

- 🍏 [`115d96d`](https://github.com/javascript-studio/studio-ndjson/commit/115d96dcc2293d049ed002a7e438f14d78d67590)
  Pass line through to loose_out if JSON.parse fails
- 🐛 [`cc497b8`](https://github.com/javascript-studio/studio-ndjson/commit/cc497b818223574dc8ffb594884bec0af53c78e7)
  Fix tests on new node
- ✨ [`1df2afc`](https://github.com/javascript-studio/studio-ndjson/commit/1df2afc507a2f608a3aea81f176249884dda8d8b)
  Install prettier
- ✨ [`83c7269`](https://github.com/javascript-studio/studio-ndjson/commit/83c7269e65e934ecb62f494f044c8756236147b0)
  Upgrade Studio Changes
- ✨ [`9ea1ec3`](https://github.com/javascript-studio/studio-ndjson/commit/9ea1ec34708b8e6bea40ac3e31e922f2023cf521)
  Upgrade eslint and eslint-config
- ✨ [`961c065`](https://github.com/javascript-studio/studio-ndjson/commit/961c065f0697152131e338b786da2fd58c154673)
  Upgrade mocha and use new mochify with esbuild
- ✨ [`796f0c2`](https://github.com/javascript-studio/studio-ndjson/commit/796f0c2d660e35ec2de1945eda142f087ef6aa1b)
  Use @sinonjs/referee-sinon

_Released by [Maximilian Antoni](https://github.com/mantoni) on 2024-01-11._

## 2.0.0

- 🍏 [`2b6f648`](https://github.com/javascript-studio/studio-ndjson/commit/2b6f64878c85891e5f7956080feaab33f5df5877)
  Browser support using [Studio Browser Stream][stream] as the `stream` shim

[stream]: https://github.com/javascript-studio/studio-browser-stream

## 1.2.0

- 🍏 Add more details to emitted errors

    - `JSON.parse` errors have `code` set to `"ERR_JSON_PARSE"` and `line` to
      the string causing the parse error.
    - `JSON.stringify` errors have `code` set to `"ERR_JSON_STRINGIFY"`.

## 1.1.2

- 📚 Add install instructions
- 📚 Improve API documentation
- 📚 Add related modules section

## 1.1.1

- 🐛 Fix typo in git URL

## 1.1.0

- 🍏 Add `loose` and `loose_out` options to parser

    > - If `loose` is set to `true`, any data received before `{` is ignored.
    > - If `loose_out` is given, it is expected to a stream. It receives any
    >   data that is found before `{`. Implies `loose`.

## 1.0.0

- ✨ Initial release
