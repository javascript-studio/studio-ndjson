/*
 * Copyright (c) Maximilian Antoni <max@javascript.studio>
 *
 * @license MIT
 */
'use strict';

const Transform = require('stream').Transform;

module.exports = class extends Transform {

  constructor() {
    super({
      readableObjectMode: true
    });
    this.str = '';
  }

  _transform(data, encoding, callback) {
    let str = this.str + data;
    let p = str.indexOf('\n');
    while (p !== -1) {
      let parsed;
      try {
        parsed = JSON.parse(str.substring(0, p));
      } catch (e) {
        callback(e);
        return;
      }
      this.push(parsed);
      str = str.substring(p + 1);
      p = str.indexOf('\n');
    }
    this.str = str;
    callback();
  }

  _flush(callback) {
    if (this.str) {
      let parsed;
      try {
        parsed = JSON.parse(this.str);
      } catch (e) {
        callback(e);
        return;
      }
      this.push(parsed);
    }
    callback();
  }

};
