# Changes

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
