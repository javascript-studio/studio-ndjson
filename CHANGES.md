# Changes

## 1.1.0

- 🍏 Add `loose` and `loose_out` options to parser

    > - If `loose` is set to `true`, any data received before `{` is ignored.
    > - If `loose_out` is given, it is expected to a stream. It receives any
    >   data that is found before `{`. Implies `loose`.

## 1.0.0

- ✨ Initial release
