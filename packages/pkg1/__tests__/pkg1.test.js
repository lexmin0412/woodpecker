'use strict';

const pkg1 = require('..');
const assert = require('assert').strict;

assert.strictEqual(pkg1(), 'Hello from pkg1');
console.info('pkg1 tests passed');
