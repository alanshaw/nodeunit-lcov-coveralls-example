nodeunit-lcov-coveralls-example
===

Example showing how to use the new nodeunit lcov reporter to publish coverage data to Coveralls from Travis.

Our example code is the quicksort algorithm.

How to
---

### Setup package.json

You should alter you package.json file so that it depends on nodeunit, jscoverage and coveralls:

```javascript
"devDependencies": {
  "nodeunit": "git://github.com/alanshaw/nodeunit.git#8c199d7bde425e099d3097789309ac23348aa8e5",
  "jscoverage": "~0.3.7",
  "coveralls": "~2.0.9"
}
```

Next, add a coveralls script to "scripts"

```javascript
"scripts": {
  "test": "nodeunit test",
  "coveralls": "jscoverage lib && QUICKSORT_COV=1 nodeunit --reporter=lcov test | coveralls"
}
```

By creating our own custom NPM script, we can still use the `npm test` command without having to instrument and send data to coveralls.

The "coveralls" script does a few things:

0. Run [jscoverage](https://npmjs.org/package/jscoverage) for all files in the `lib` directory. By default jscoverage will output instrumented files to `lib-cov`.
1. Define a env variable called `QUICKSORT_COV` to signal to the application it should use code that has been [instrumented by jscoverage](http://siliconforks.com/jscoverage/manual.html).
2. Run nodeunit for all files in the directory `test`, using the lcov reporter to output the coverage report to stdout.
3. Pipe the lcov report to [coveralls](https://npmjs.org/package/coveralls), which in turn submits the report to [coveralls.io](https://coveralls.io/).

You can run the coveralls script via `npm run-script coveralls`

### Require instrumented code

Above we hinted that by defining an environment variable called `QUICKSORT_COV` our tests would use instrumented code. Our `index.js` looks like:

```javascript
module.exports = process.env.QUICKSORT_COV
  ? require('./lib-cov/quicksort')
  : require('./lib/quicksort')
```

When nodeunit runs `test/quicksort.js`, it requires the quicksort `index.js` file:

```javascript
var quickSort = require('../');
```

### Submit to coveralls

To submit to coveralls you'll either need to add a `.coveralls.yml` file with your repo secret key to your project root (which you shouldn't commit to github!) or submit your coverage via [Travis](https://travis-ci.org/). If you're using a `.coveralls.yml` file you can simply run `npm run-script coveralls` and your code coverage will appear (assuming you first enabled the repository on the coveralls website). If you're using Travis, you need to add a `.travis.yml` file that runs your tests and submits the report:

```yaml
language: node_js
node_js:
  - "0.10"
after_script:
  - npm run-script coveralls
```