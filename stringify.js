/*
 * Copyright (c) Maximilian Antoni <max@javascript.studio>
 *
 * @license MIT
 */
/*eslint-disable prefer-template*/
'use strict';

const Transform = require('stream').Transform;

module.exports = class extends Transform {

  constructor() {
    super({
      writableObjectMode: true
    });
  }

  _transform(data, encoding, callback) {
    let str;
    try {
      str = JSON.stringify(data);
    } catch (e) {
      e.code = 'ERR_JSON_STRINGIFY';
      callback(e);
      return;
    }
    callback(null, str + '\n');
  }

};
