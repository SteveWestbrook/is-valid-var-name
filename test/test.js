/**
 * test
 * Copyright(c) 2017 Steve Westbrook
 * MIT Licensed
 */

'use strict'

var assert = require('assert');
var isVarValid = require('../index.js');
var es5Validator = isVarValid.es5;

describe('isValidVar', function() {

  var testGroup = (validator, name) => {

    it(`${name} should recognize a basic variable`, () => {
      assert.ok(validator('x'));
    });

    it(`${name} should allow strange characters`, () => {
      // Valid but not cool
      assert.ok(validator('π'));
    });

    it(`${name} should allow dollar signs and underscores`, () => {
      // Valid but not cool
      assert.ok(validator('$'));
      assert.ok(validator('_'));
      assert.ok(validator('$$'));
      assert.ok(validator('__'));
    });

    it(
      `${name} should reject invalid characters in the first position`, 
      () => {
        assert.ok(!validator(' ab'));
      });

    it(
      `${name} should reject numbers in the first position`, 
      () => {
        assert.ok(!validator('0ab'));
      });

    it(
      `${name} should reject invalid characters in non-first positions`, 
      () => {
        assert.ok(!validator('a b'));
      });

    it(`${name} should allow capitals`, () => {
      assert.ok(validator('X'));
    });

    it(`${name} should allow upper, lower, numbers`, () => {
      assert.ok(validator('xXY1'));
      assert.ok(validator('Xxy2'));
    });

    it(`${name} should not allow numbers in the first position`, () => {
      assert.ok(!validator('1abc'));
    });

    it(`${name} should allow for obscure valid symbols`, () => {
      assert.ok(validator('ᚢᚫᚱ'));
    });

    it(`${name} should allow for weird symbols`, () => {
      assert.ok(validator('$'));
      assert.ok(validator('_'));
      assert.ok(validator('a$'));
      assert.ok(validator('a_'));
      // assert.ok(validator('a\u200C'));
      // assert.ok(validator('a_\u200D'));
    });

    it(`${name} should fail with reserved words`, () => {
      // keywords
      assert.ok(!validator('break'));
      assert.ok(!validator('do'));
      assert.ok(!validator('in'));
      assert.ok(!validator('typeof'));
      assert.ok(!validator('case'));
      assert.ok(!validator('else'));
      assert.ok(!validator('instanceof'));
      assert.ok(!validator('var'));
      assert.ok(!validator('catch'));
      assert.ok(!validator('export'));
      assert.ok(!validator('new'));
      assert.ok(!validator('void'));
      assert.ok(!validator('class'));
      assert.ok(!validator('extends'));
      assert.ok(!validator('return'));
      assert.ok(!validator('while'));
      assert.ok(!validator('const'));
      assert.ok(!validator('finally'));
      assert.ok(!validator('super'));
      assert.ok(!validator('with'));
      assert.ok(!validator('continue'));
      assert.ok(!validator('for'));
      assert.ok(!validator('switch'));
      assert.ok(!validator('yield'));
      assert.ok(!validator('debugger'));
      assert.ok(!validator('function'));
      assert.ok(!validator('this'));
      assert.ok(!validator('default'));
      assert.ok(!validator('if'));
      assert.ok(!validator('throw'));
      assert.ok(!validator('delete'));
      assert.ok(!validator('import'));
      assert.ok(!validator('try'));
      assert.ok(!validator('implements'));
      assert.ok(!validator('package'));
      assert.ok(!validator('protected'));
      assert.ok(!validator('interface'));
      assert.ok(!validator('private'));
      assert.ok(!validator('public'));

      // literals
      assert.ok(!validator('null'));
      assert.ok(!validator('true'));
      assert.ok(!validator('false'));
    });

    it(`${name} should allow reserved words as part of a name`, () => {
      assert.ok(validator('var1'));
    });

    it(`${name} should allow old-style unicode escapes`, () => {
      assert.ok(validator('a\u0041'));
      assert.ok(validator('\u0041a'));
    });
     
  };

  testGroup(isVarValid, 'es2015 strict');

  // Same with strict off
  isVarValid.strict = false;
  testGroup(isVarValid, 'es2015 non-strict');
  testGroup(es5Validator, 'es5 strict');

  // Same with strict off
  es5Validator.strict = false;
  testGroup(es5Validator, 'es5 non-strict');

  // Turn strict back on
  isVarValid.strict = true;
  es5Validator.strict = true;

  it('should fail using es2015 reserved words', () => {
    assert.ok(!isVarValid('enum'));
    assert.ok(!isVarValid('await'));
  });

  it('should allow es2015-style unicode escapes', () => {
    assert.ok(isVarValid('a\u{41}'));
    assert.ok(isVarValid('\u{41}a'));
  });

  it('should succeed with under es5 with es2015 reserved words', () => {
    assert.ok(es5Validator('enum'));
    assert.ok(es5Validator('await'));
  });

  it('should fail using strict-mode reserved words', () => {
    assert.ok(!isVarValid('arguments'));
    assert.ok(!isVarValid('eval'));
  });

  it('should allow strict mode only reserved words', () => {
    isVarValid.strict = false;
    assert.ok(isVarValid('arguments'));
    assert.ok(isVarValid('eval'));

    // Re-enable strict mode evaluation
    isVarValid.strict = true;
  });

  // Not exactly load testing but gives a ballpark which shows it's fine.
  it('should load fastish', () => {
    for (var i=0; i<100000; i++) {
      let ivv = require('../index.js');
    }
  });

  it(
    'ES5 should reject top-range unicode in the first position',
    () => {
      assert.ok(!es5Validator('\u{10001}'));
    });

  it(
    'ES5 should reject top-range unicode in following positions',
    () => {
      assert.ok(!es5Validator('a\u{10001}'));
    });

  it('should not support some characters in ES6', () => {
    assert.ok(!isVarValid('\u2E2F'));
  });

  var content = '$';
  for (var i=0; i<10; i++) {
    content += Math.floor(Math.random() * 9).toString();
  }

  it('should perform ok', () => {
    for (var i=0; i<1000000; i++) {
      assert.ok(isVarValid(content));
    }
  });

  content = '$';
  for (var i=0; i<4; i++) {
    content += Math.floor(Math.random() * 9).toString();
  }

  it('should perform ok with short variables', () => {
    for (var i=0; i<1000000; i++) {
      assert.ok(isVarValid(content));
    }
  });

});
