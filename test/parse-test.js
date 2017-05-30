/*eslint-env mocha*/
'use strict';

const assert = require('assert');
const sinon = require('sinon');
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
      assert.equal(entries.length, 2);
      assert.deepEqual(entries[0], { a: 1 });
      assert.deepEqual(entries[1], { b: 2 });
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
      assert.equal(entries.length, 2);
      assert.deepEqual(entries[0], { a: 1 });
      assert.deepEqual(entries[1], { b: 2 });
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

  it('handles parse error', () => {
    const transform = new ParseTransform();
    const spy = sinon.spy();
    transform.on('error', spy);

    transform.write('no json\n');
    transform.end();

    sinon.assert.calledOnce(spy);
    sinon.assert.calledWithMatch(spy, {
      name: 'SyntaxError'
    });
  });

  it('handles parse error when flushing remainder', () => {
    const transform = new ParseTransform();
    const spy = sinon.spy();
    transform.on('error', spy);

    transform.write('no json');
    transform.end();

    sinon.assert.calledOnce(spy);
    sinon.assert.calledWithMatch(spy, {
      name: 'SyntaxError'
    });
  });

});
