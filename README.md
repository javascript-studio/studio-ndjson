# Studio ndjson

☯️ Transforms to parse and stringify [ndjson][1].

## Usage

To stringify an object stream into ndjson:

```js
const StringifyTransform = require('@studio/ndjson/stringify');

object_stream.pipe(new StringifyTransform()).pipe(process.stdout);
```

To parse ndjson into an object stream:

```js
const ParseTransform = require('@studio/ndjson/parse');

process.stdin.pipe(new ParseTransform()).pipe(object_stream);
```

## Install

```bash
$ npm install @studio/ndjson --save
```

## API

Require the transform you need:

- `@studio/ndjson/stringify`: Exports the `StringifyTransform` class which
  reads objects and writes strings.
- `@studio/ndjson/parse`: Exports the `ParseTransform` class which reads
  strings and writes objects.

The module main exports `StringifyTransform` and `ParseTransform` if you need
both:

```js
const { StringifyTransform, ParseTransform } = require('@studio/ndjson');
```

### ParseTransform options

The `ParseTransform` constructor accepts an `options` object with these
properties:

- `loose`: Whether to ignore data before the first `{` in each line.
- `loose_out`: A stream to receive data that was found before the first `{` in
  each line. Implies `loose`.

### Error handling

If `JSON.parse` or `JSON.stringify` throw an error, the transform emits an
`error` event with the error object having a `code` property with
`ERR_JSON_PARSE` or `ERR_JSON_STRINGIFY`. For parse errors, the `line` property
on the error is the string that could not be parsed.

## Related modules

- 👻 [Studio Log][2]: This module was refactored out of the logger for
  [JavaScript Studio][3].
- 📦 [Studio Changes][4] is used to create the changelog for this module.

## License

MIT

<div align="center">Made with ❤️ on 🌍</div>

[1]: http://ndjson.org/
[2]: https://github.com/javascript-studio/studio-log
[3]: https://javascript.studio
[4]: https://github.com/javascript-studio/studio-changes
