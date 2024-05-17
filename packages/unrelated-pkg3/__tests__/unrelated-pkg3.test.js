'use strict';

const unrelatedPkg3 = require('..');
const assert = require('assert').strict;

assert.strictEqual(unrelatedPkg3(), 'Hello from unrelatedPkg3');
console.info('unrelatedPkg3 tests passed');
