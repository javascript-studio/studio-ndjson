/*eslint-env mocha*/
'use strict';

const assert = require('assert');
const sinon = require('sinon');
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
      assert.equal(str, '{"a":1}\n{"b":2}\n');
      done();
    });

    input.write({ a: 1 });
    input.write({ b: 2 });
    input.end();
  });

  it('handles stringify error', () => {
    const transform = new StringifyTransform();
    const fake = sinon.fake();
    transform.on('error', fake);

    transform.write({ toJSON: () => { throw new Error('Ouch!'); } });

    sinon.assert.calledOnce(fake);
    sinon.assert.calledWithMatch(fake, {
      name: 'Error',
      message: 'Ouch!',
      code: 'ERR_JSON_STRINGIFY'
    });
  });

});
