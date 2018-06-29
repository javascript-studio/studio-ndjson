# Changes

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
