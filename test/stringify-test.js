/*eslint-env mocha*/
'use strict';

const { assert, sinon } = require('@sinonjs/referee-sinon');
const PassThrough = require('stream').PassThrough;
const StringifyTransform = require('../stringify');

describe('StringifyTransform', () => {
  it('stringifies data', (done) => {
    const input = new PassThrough({ objectMode: true });
    const output = new PassThrough();

    input.pipe(new StringifyTransform()).pipe(output);

    let str = '';
    output.on('data', (data) => {
      str += data;
    });
    output.on('end', () => {
      assert.equals(str, '{"a":1}\n{"b":2}\n');
      done();
    });

    input.write({ a: 1 });
    input.write({ b: 2 });
    input.end();
  });

  it('handles stringify error', (done) => {
    const transform = new StringifyTransform();
    const fake = sinon.fake();
    transform.on('error', fake);

    transform.write({
      toJSON: () => {
        throw new Error('Ouch!');
      }
    });

    setTimeout(() => {
      assert.calledOnce(fake);
      assert.calledWithMatch(fake, {
        name: 'Error',
        message: 'Ouch!',
        code: 'ERR_JSON_STRINGIFY'
      });
      done();
    }, 1);
  });
});
