/*eslint-env mocha*/
'use strict';

const { assert } = require('@sinonjs/referee-sinon');
const StringifyTransform = require('../stringify');
const ParseTransform = require('../parse');
const index = require('..');

describe('index', () => {

  it('exports StringifyTransform', () => {
    assert.same(index.StringifyTransform, StringifyTransform);
  });

  it('exports ParseTransform', () => {
    assert.same(index.ParseTransform, ParseTransform);
  });

});
