function sortByAmount(array, order) {
  array.sort((a, b) => (order ? a.amount - b.amount : b.amount - a.amount));
  return array;
}

function sortByType(array, order) {
  array.sort((a, b) =>
    order ? a.type.localeCompare(b.type) : b.type.localeCompare(a.type)
  );
  return array;
}

function sortByDate(array, order) {
  console.log(array);
  console.log(order);
  array.sort((a, b) =>
    order ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)
  );
  return array;
}

function sortByCategory(array, order) {
  array.sort((a, b) =>
    order
      ? a.category.localeCompare(b.category)
      : b.category.localeCompare(a.category)
  );
  return array;
}

function sortByDescription(array, order) {
  array.sort((a, b) =>
    order
      ? a.description.localeCompare(b.description)
      : b.description.localeCompare(a.description)
  );
  return array;
}
