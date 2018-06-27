# glob-args

Simple utility for parsing CLI globs. Matched files can be quoted, unmatched patterns will be returned unchanged. Uses [glob](https://www.npmjs.com/package/glob), so on Windows use `test/*.js` not `test\*.js`.

# Usage

```javascript
const globArgs = require('glob-args')
const globbed = globArgs(['--option', '*/*.js'])
// globbed: ['--options', 'test/test.js', 'test/test2.js', etc]
```

You can pass optional `{ escape: true }` - it will escape matched files:
```javascript
const globbed = globArgs(['--option', '*/*.js'], { escape: true })
// globbed: ['--options', '"test/test.js"', '"test/test2.js"', etc]
```

Especially useful for all those apps that do not support globing. E.g., running:
```console
glob-args some-app --v test/*.js
```
will execute `some-app --v "test/test.js" "test/test2.js"`.

