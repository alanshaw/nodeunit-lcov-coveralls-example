var quickSort = require('../');

module.exports = {
  "Test quicksort sorts correctly": function (test) {
    var items = [4, 2, 6, 5, 3, 9]
      , sortedItems = items.slice().sort()
      , quickSortedItems = quickSort(items.slice());

    // Assert that the items sorted by Array.sort are in the same order as those sorted by quickSort
    sortedItems.forEach(function (item, i) {
      test.equal(item, quickSortedItems[i]);
    });

    test.done();
  }
}