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

  var testGroup = (validator, name, strictOff) => {
    
    let isVar = (data) => {
      return validator(data, strictOff)
    };

    it(`${name} should recognize a basic variable`, () => {
      assert.ok(isVar('x'));
    });

    it(`${name} should allow strange characters`, () => {
      // Valid but not cool
      assert.ok(isVar('π'));
    });

    it(`${name} should allow dollar signs and underscores`, () => {
      // Valid but not cool
      assert.ok(isVar('$'));
      assert.ok(isVar('_'));
      assert.ok(isVar('$$'));
      assert.ok(isVar('__'));
    });

    it(
      `${name} should reject invalid characters in the first position`, 
      () => {
        assert.ok(!isVar(' ab'));
      });

    it(
      `${name} should reject numbers in the first position`, 
      () => {
        assert.ok(!isVar('0ab'));
      });

    it(
      `${name} should reject invalid characters in non-first positions`, 
      () => {
        assert.ok(!isVar('a b'));
      });

    it(`${name} should allow capitals`, () => {
      assert.ok(isVar('X'));
    });

    it(`${name} should allow upper, lower, numbers`, () => {
      assert.ok(isVar('xXY1'));
      assert.ok(isVar('Xxy2'));
    });

    it(`${name} should not allow numbers in the first position`, () => {
      assert.ok(!isVar('1abc'));
    });

    it(`${name} should allow for obscure valid symbols`, () => {
      assert.ok(isVar('ᚢᚫᚱ'));
    });

    it(`${name} should allow for weird symbols`, () => {
      assert.ok(isVar('$'));
      assert.ok(isVar('_'));
      assert.ok(isVar('a$'));
      assert.ok(isVar('a_'));
      // assert.ok(isVar('a\u200C'));
      // assert.ok(isVar('a_\u200D'));
    });

    it(`${name} should fail with reserved words`, () => {
      // keywords
      assert.ok(!isVar('break'));
      assert.ok(!isVar('do'));
      assert.ok(!isVar('in'));
      assert.ok(!isVar('typeof'));
      assert.ok(!isVar('case'));
      assert.ok(!isVar('else'));
      assert.ok(!isVar('instanceof'));
      assert.ok(!isVar('var'));
      assert.ok(!isVar('catch'));
      assert.ok(!isVar('export'));
      assert.ok(!isVar('new'));
      assert.ok(!isVar('void'));
      assert.ok(!isVar('class'));
      assert.ok(!isVar('extends'));
      assert.ok(!isVar('return'));
      assert.ok(!isVar('while'));
      assert.ok(!isVar('const'));
      assert.ok(!isVar('finally'));
      assert.ok(!isVar('super'));
      assert.ok(!isVar('with'));
      assert.ok(!isVar('continue'));
      assert.ok(!isVar('for'));
      assert.ok(!isVar('switch'));
      assert.ok(!isVar('yield'));
      assert.ok(!isVar('debugger'));
      assert.ok(!isVar('function'));
      assert.ok(!isVar('this'));
      assert.ok(!isVar('default'));
      assert.ok(!isVar('if'));
      assert.ok(!isVar('throw'));
      assert.ok(!isVar('delete'));
      assert.ok(!isVar('import'));
      assert.ok(!isVar('try'));
      assert.ok(!isVar('implements'));
      assert.ok(!isVar('package'));
      assert.ok(!isVar('protected'));
      assert.ok(!isVar('interface'));
      assert.ok(!isVar('private'));
      assert.ok(!isVar('public'));

      // literals
      assert.ok(!isVar('null'));
      assert.ok(!isVar('true'));
      assert.ok(!isVar('false'));
    });

    it(`${name} should allow reserved words as part of a name`, () => {
      assert.ok(isVar('var1'));
    });

    it(`${name} should allow old-style unicode escapes`, () => {
      assert.ok(isVar('a\u0041'));
      assert.ok(isVar('\u0041a'));
    });
     
  };

  testGroup(isVarValid, 'es2015 strict');
  testGroup(isVarValid, 'es2015 non-strict', true);
  testGroup(es5Validator, 'es5 strict');
  testGroup(es5Validator, 'es5 non-strict', true);

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
    assert.ok(isVarValid('arguments', true));
    assert.ok(isVarValid('eval', true));
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
      assert.ok(!es5Validator('\u{10001}', false));
    });

  it(
    'ES5 should reject top-range unicode in following positions',
    () => {
      assert.ok(!es5Validator('a\u{10001}', false));
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
