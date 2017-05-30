/*eslint-env mocha*/
'use strict';

const assert = require('assert');
const StringifyTransform = require('../stringify');
const ParseTransform = require('../parse');
const index = require('..');

describe('index', () => {

  it('exports StringifyTransform', () => {
    assert.strictEqual(index.StringifyTransform, StringifyTransform);
  });

  it('exports ParseTransform', () => {
    assert.strictEqual(index.ParseTransform, ParseTransform);
  });

});
