# is-valid-var-name

Single-function [node](https://nodejs.org) module that determines whether a string is a valid javascript variable.

This implementation provides a performance improvement over the existing [is-valid-identifier](https://www.npmjs.com/package/is-valid-identifier) npm module.

```
const isVar = require('is-valid-var-name');

// true
var isValid = isVar('x');

// this is a great idea
isVar('π');

// false
isValid = isVar(' not a var ');
```

**Installation**

```
$ npm install is-valid-var-name
```

**Options**

By default, the validation function assumes ES2015 strict mode.  These values can be overridden.

To provide ES5 evaluation:

```
// valid under ES5
isValid = isVar('await', false, true);
```

To turn off strict mode evaluation:
```
// valid when strict mode is off
isValid = isVar('arguments', true);
```

## Special Thanks
This implementation draws heavily on the excellent blogs of Matthias Bynens, who did the legwork in explaining valid variable names for [ES5](https://mathiasbynens.be/notes/javascript-identifiers) and [ES6](https://mathiasbynens.be/notes/javascript-identifiers-es6).

## Links
[Github](https://www.github.com/stevewestbrook/is-valid-var-name)

[npm](https://www.npmjs.com/package/is-valid-var-name)

## License
Copyright (c) 2017 Steve Westbrook

[MIT](LICENSE)
