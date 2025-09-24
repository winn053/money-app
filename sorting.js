const searchTableAmountSortButton = document.getElementById(
  'search-table-amount-sort-button'
);
const searchTableTypeSortButton = document.getElementById(
  'search-table-type-sort-button'
);
const searchTableDateSortButton = document.getElementById(
  'search-table-date-sort-button'
);
const searchTableCategorySortButton = document.getElementById(
  'search-table-category-sort-button'
);
const searchTableDescSortButton = document.getElementById(
  'search-table-desc-sort-button'
);

function sortByAmount(array, order) {
  array.sort((a, b) => (order ? a.amount - b.amount : b.amount - a.amount));
  return array;
}

function sortByType(array, order) {
  array.sort((a, b) =>
    order ? a.source.localeCompare(b.source) : b.source.localeCompare(a.source)
  );
  return array;
}

function sortByDate(array, order) {
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

function createToggleSort() {
  let sortOrder = true;
  return {
    toggle: () => (sortOrder = !sortOrder),
    reset: () => (sortOrder = true),
    getState: () => sortOrder,
  };
}

const sortOrderAmount = createToggleSort();
const sortOrderType = createToggleSort();
const sortOrderDate = createToggleSort();
const sortOrderCategory = createToggleSort();
const sortOrderDescription = createToggleSort();

function handleSort(e) {
  // console.log(e);

  if (searchData.length > 0) {
    switch (e.target.innerText) {
      case 'Amount':
        sortByAmount(searchData, sortOrderAmount.toggle());
        break;
      case 'Type':
        sortByType(searchData, sortOrderType.toggle());
        break;
      case 'Date':
        sortByDate(searchData, sortOrderDate.toggle());
        break;
      case 'Category':
        sortByCategory(searchData, sortOrderCategory.toggle());
        break;
      case 'Description':
        sortByDescription(searchData, sortOrderDescription.toggle());
        break;
      default:
        throw Error('Missing sort element innerText');
    }
    clearSearchTable();
    fillSearchTable();

    searchTableSection.hidden = false;
  }
}

searchTableAmountSortButton.addEventListener('click', handleSort);
searchTableTypeSortButton.addEventListener('click', handleSort);
searchTableDateSortButton.addEventListener('click', handleSort);
searchTableCategorySortButton.addEventListener('click', handleSort);
searchTableDescSortButton.addEventListener('click', handleSort);
