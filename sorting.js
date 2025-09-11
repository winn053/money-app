function sortByAmount(array, order) {
  array.sort((a, b) => (order ? a.amount - b.amount : b.amount - a.amount));
  return array;
}
