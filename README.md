# Studio ndjson

Transforms to parse and stringify [ndjson][1].

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

## API

Require the transform you need:

- `@studio/ndjson/stringify`: Exports the `StringifyTransform` class which
  reads objects and writes strings.
- `@studio/ndjson/parse`: Exports the `ParseTransform` class which reads
  strings and writes objects.

The module also exports `StringifyTransform` and `ParseTransform` if you need
both:

```js
const { StringifyTransform, ParseTransform } = require('@studio/ndjson');
```

## ParseTransform options

- `loose`: Whether to ignore data before the first `{` in each line.
- `loose_out`: A stream to receive data that was found before the first `{` in
  each line. Implies `loose`.

## Error handling

If `JSON.parse` or `JSON.stringify` throw an error, the transform emits an
`error` event.

## License

MIT

<div align="center">Made with ❤️ on 🌍</div>

[1]: http://ndjson.org/
