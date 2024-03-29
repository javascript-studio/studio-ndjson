/*eslint-env mocha*/
'use strict';

const { assert, refute, sinon } = require('@sinonjs/referee-sinon');
const PassThrough = require('stream').PassThrough;
const ParseTransform = require('../parse');

describe('ParseTransform', () => {
  it('parses JSON', (done) => {
    const input = new PassThrough();
    const output = new PassThrough({ objectMode: true });

    input.pipe(new ParseTransform()).pipe(output);

    const entries = [];
    output.on('data', (entry) => {
      entries.push(entry);
    });
    output.on('end', () => {
      assert.equals(entries.length, 2);
      assert.equals(entries[0], { a: 1 });
      assert.equals(entries[1], { b: 2 });
      done();
    });

    input.write('{"a":1}\n');
    input.write('{"b":2}\n');
    input.end();
  });

  function testParse(done) {
    const transform = new ParseTransform();

    const entries = [];
    transform.on('data', (entry) => {
      entries.push(entry);
    });
    transform.on('end', () => {
      assert.equals(entries.length, 2);
      assert.equals(entries[0], { a: 1 });
      assert.equals(entries[1], { b: 2 });
      done();
    });
    return transform;
  }

  it('parses multiple lines of JSON in one chunk', (done) => {
    const transform = testParse(done);

    transform.write('{"a":1}\n{"b":2}\n');
    transform.end();
  });

  it('stores remainder between writes', (done) => {
    const transform = testParse(done);

    transform.write('{"a":1}\n{"b":');
    transform.write('2}\n');
    transform.end();
  });

  it('flushes remainder if final newline is missing', (done) => {
    const transform = testParse(done);

    transform.write('{"a":1}\n{"b":2}');
    transform.end();
  });

  it('handles parse error', (done) => {
    const transform = new ParseTransform();
    const fake = sinon.fake();
    transform.on('error', fake);

    transform.write('no json\n');
    transform.end();
    setTimeout(() => {
      assert.calledOnce(fake);
      assert.calledWithMatch(fake, {
        name: 'SyntaxError',
        code: 'ERR_JSON_PARSE',
        line: 'no json'
      });
      done();
    }, 1);
  });

  it('handles parse error when flushing remainder', (done) => {
    const transform = new ParseTransform();
    const fake = sinon.fake();
    transform.on('error', fake);

    transform.write('no json');
    transform.end();

    setTimeout(() => {
      assert.calledOnce(fake);
      assert.calledWithMatch(fake, {
        name: 'SyntaxError'
      });
      done();
    }, 1);
  });

  describe('loose', () => {
    it('ignores line without `{`', (done) => {
      const transform = new ParseTransform({ loose: true });
      const fake = sinon.fake();
      transform.on('error', fake);
      transform.on('data', () => {
        throw new Error('Unexpected data');
      });
      transform.on('end', () => {
        refute.called(fake);
        done();
      });

      transform.write('no json\n');
      transform.end();
    });

    it('ignores data before first `{`', (done) => {
      const transform = new ParseTransform({ loose: true });
      const fake = sinon.fake();
      transform.on('error', fake);
      const entries = [];
      transform.on('data', (entry) => {
        entries.push(entry);
      });
      transform.on('end', () => {
        refute.called(fake);
        assert.equals(entries, [{ some: 'json' }]);
        done();
      });

      transform.write('no json {"some":"json"}\n');
      transform.end();
    });
  });

  describe('loose_out', () => {
    it('passes line without `{` through', (done) => {
      const out = new PassThrough();
      const transform = new ParseTransform({ loose_out: out });
      transform.on('data', () => {
        throw new Error('Unexpected data');
      });
      let str = '';
      out.on('data', (chunk) => {
        str += chunk;
      });
      transform.on('end', () => {
        assert.equals(str, 'no json\n');
        done();
      });

      transform.write('no json\n');
      transform.end();
    });

    it('passes data before `{` through', (done) => {
      const out = new PassThrough();
      const transform = new ParseTransform({ loose_out: out });
      const entries = [];
      transform.on('data', (entry) => {
        entries.push(entry);
      });
      let str = '';
      out.on('data', (chunk) => {
        str += chunk;
      });
      transform.on('end', () => {
        assert.equals(str, 'no json ');
        assert.equals(entries, [{ some: 'json' }]);
        done();
      });

      transform.write('no json {"some":"json"}\n');
      transform.end();
    });

    it('passes data before `{` through in remainder', (done) => {
      const out = new PassThrough();
      const transform = new ParseTransform({ loose_out: out });
      const entries = [];
      transform.on('data', (entry) => {
        entries.push(entry);
      });
      let str = '';
      out.on('data', (chunk) => {
        str += chunk;
      });
      transform.on('end', () => {
        assert.equals(str, 'no json ');
        assert.equals(entries, [{ some: 'json' }]);
        done();
      });

      transform.write('no json {"some":"json"}');
      transform.end();
    });

    it('passes line through on JSON parse error', (done) => {
      const out = new PassThrough();
      const transform = new ParseTransform({ loose_out: out });
      const entries = [];
      transform.on('data', (entry) => {
        entries.push(entry);
      });
      let str = '';
      out.on('data', (chunk) => {
        str += chunk;
      });
      transform.on('end', () => {
        assert.equals(str, '{ console: "message" }\n');
        assert.equals(entries, []);
        done();
      });

      transform.write('{ console: "message" }');
      transform.end();
    });
  });
});
