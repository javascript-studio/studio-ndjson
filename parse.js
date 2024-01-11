/*
 * Copyright (c) Maximilian Antoni <max@javascript.studio>
 *
 * @license MIT
 */
'use strict';

const Transform = require('stream').Transform;

module.exports = class extends Transform {

  constructor(options) {
    super({
      readableObjectMode: true
    });
    this.str = '';
    if (options) {
      this.loose = options.loose || options.loose_out;
      this.loose_out = options.loose_out;
    } else {
      this.loose = false;
    }
  }

  _transform(data, encoding, callback) {
    let str = this.str + data;
    for (;;) {
      const p = str.indexOf('\n');
      if (p === -1) {
        break;
      }
      if (this._line(str.substring(0, p), callback)) {
        return;
      }
      str = str.substring(p + 1);
    }
    this.str = str;
    callback();
  }

  _flush(callback) {
    if (this.str && this._line(this.str, callback)) {
      return;
    }
    callback();
  }

  _line(line, callback) {
    if (this.loose) {
      const s = line.indexOf('{');
      if (s === -1) {
        if (this.loose_out) {
          this.loose_out.write(line);
          this.loose_out.write('\n');
        }
        return false;
      }
      if (this.loose_out) {
        this.loose_out.write(line.substring(0, s));
      }
      line = line.substring(s);
    }
    let parsed;
    try {
      parsed = JSON.parse(line);
    } catch (e) {
      if (this.loose_out) {
        this.loose_out.write(line);
        this.loose_out.write('\n');
        return false;
      }
      e.code = 'ERR_JSON_PARSE';
      e.line = line;
      callback(e);
      return true;
    }
    this.push(parsed);
    return false;
  }

};
