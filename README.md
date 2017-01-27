# is-valid-var-name

Single-purpose [node](https://nodejs.org) module that determines whether a string is a valid javascript variable.

This implementation has been optimized for performance.

The primary function is ES6 compatible; ES5 variable names can also be validated.

```
const isVarName = require('is-valid-var-name');

// true
var isValid = isVarName('x');

// false
isValid = isVarName(' not a var ');

// win the respect of your colleagues with this highly maintainable code
isValid = isVarName('ᚢᚫᚱ');
```

**Installation**

```
$ npm install is-valid-var-name
```

**Options**

By default, the validation function assumes ES2015 strict mode.  These values can be overridden.

To provide ES5 evaluation:

```
const isVarName = require('is-valid-var-name').es5;

// valid under ES5
isValid = isVarName('await');
```

To turn off strict mode evaluation:
```
// valid when strict mode is off
isValid = isVarName('arguments', true);
```

## Special Thanks/Acknowledgements
This implementation draws heavily on the excellent research of Matthias Bynens, who did the legwork in explaining valid variable names for [ES5](https://mathiasbynens.be/notes/javascript-identifiers) and [ES6](https://mathiasbynens.be/notes/javascript-identifiers-es6).

## License
Copyright (c) 2017 Steve Westbrook

[MIT](LICENSE)
