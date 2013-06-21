module.exports = process.env.QUICKSORT_COV
  ? require('./lib-cov/quicksort')
  : require('./lib/quicksort')