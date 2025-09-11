const searchButton = document.getElementById('search-button');
const searchClearButton = document.getElementById('clear-search-button');
const searchDiv = document.getElementById('search-div');
const searchForm = document.getElementById('search-form');
const searchAmount = document.getElementById('search-amount');
const searchSource = document.getElementById('search-source');
const searchFrom = document.getElementById('search-from');
const searchTo = document.getElementById('search-to');
const searchCategory = document.getElementById('search-category');
const searchDescription = document.getElementById('search-description');
const searchTableSection = document.getElementById('search-table-section');
const searchTable = document.getElementById('search-table');
const searchTableBody = document.getElementById('search-table-body');
const searchTableNotFound = document.getElementById('search-table-not-found');

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

let searchData = [];

function toggleSearchForm() {
  searchDiv.hidden = !searchDiv.hidden;
  if (searchDiv.hidden) {
    clearSearchTable();
  }
}

function doSearch(formData, savedData) {
  let amountFilter = savedData;

  if (formData.amount !== '') {
    amountFilter = amountFilter.filter(
      data => data.amount.includes(formData.amount) === true
    );
  }
  if (formData.source !== 'any') {
    amountFilter = amountFilter.filter(data => data.source === formData.source);
  }
  if (formData.dateFrom !== '') {
    amountFilter = amountFilter.filter(
      data => new Date(data.date) >= new Date(formData.dateFrom)
    );
  }
  if (formData.dateTo !== '') {
    amountFilter = amountFilter.filter(
      data => new Date(data.date) <= new Date(formData.dateTo)
    );
  }
  if (formData.category !== '') {
    amountFilter = amountFilter.filter(
      data => data?.category?.includes(formData.category.trim()) === true
    );
  }
  if (formData.description !== '') {
    amountFilter = amountFilter.filter(
      data => data.description.includes(formData.description.trim()) === true
    );
  }
  console.log(amountFilter);
  return amountFilter;
}

function fillSearchTable() {
  for (let i = 0; i < searchData.length; i++) {
    const row = document.createElement('tr');

    let cell = document.createElement('td');
    cell.setAttribute('hidden', 1);
    let cellText = document.createTextNode(searchData[i].key);
    cell.appendChild(cellText);
    row.appendChild(cell);

    cell = document.createElement('td');
    cellText = document.createTextNode(
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(searchData[i].amount)
    );
    // cell.setAttribute('style', 'text-align: right');
    cell.appendChild(cellText);
    row.appendChild(cell);

    cell = document.createElement('td');
    cellText = document.createTextNode(searchData[i].source);
    cell.appendChild(cellText);
    row.appendChild(cell);

    cell = document.createElement('td');
    cellText = document.createTextNode(searchData[i].date);
    cell.appendChild(cellText);
    row.appendChild(cell);

    cell = document.createElement('td');
    cellText = document.createTextNode(searchData[i].category);
    cell.appendChild(cellText);
    row.appendChild(cell);

    cell = document.createElement('td');
    cellText = document.createTextNode(searchData[i].description);
    cell.appendChild(cellText);
    row.appendChild(cell);

    cell = document.createElement('button');
    cell.className = 'button-green';
    cellText = document.createTextNode('Edit');
    cell.addEventListener('click', editTransactionRow);
    cell.appendChild(cellText);
    row.appendChild(cell);

    cell = document.createElement('button');
    cell.className = 'button-green';
    cellText = document.createTextNode('Delete');
    cell.addEventListener('click', deleteTransactionRow);
    cell.appendChild(cellText);
    row.appendChild(cell);

    searchTableBody.appendChild(row);
  }

  // add total to bottom of table
  const totalSpent = searchData.reduce(
    (total, current) => total + Number(current.amount),
    0
  );
  console.log(totalSpent);

  const row = document.createElement('tr');

  // hide a dummy field for needless missing key
  let cell = document.createElement('td');
  cell.setAttribute('hidden', 1);
  row.appendChild(cell);

  cell = document.createElement('td');
  let cellText = document.createTextNode(
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(totalSpent)
  );
  cell.appendChild(cellText);
  row.appendChild(cell);

  cell = document.createElement('td');
  cellText = document.createTextNode('Total');
  cell.appendChild(cellText);
  row.appendChild(cell);

  searchTableBody.appendChild(row);
}

function startSearch(e) {
  e.preventDefault();

  searchData = [];
  clearSearchTable();

  const formData = {
    amount: searchAmount.value,
    source: searchSource.value,
    dateFrom: searchFrom.value,
    dateTo: searchTo.value,
    category: searchCategory.value,
    description: searchDescription.value,
  };

  const storedFormData = getLocalStorage(KEY);

  // console.log(formData.amount);
  // console.log(formData.source);
  // console.log(formData.dateFrom);
  // console.log(formData.dateTo);
  // console.log(formData.category);
  // console.log(formData.Description);

  // console.log(storedFormData);

  if (
    formData.amount === '' &&
    formData.source === 'any' &&
    formData.dateFrom === '' &&
    formData.dateTo === '' &&
    formData.category === '' &&
    formData.description === ''
  ) {
    searchData = storedFormData; // shallow copy
  } else {
    searchData = doSearch(formData, storedFormData);
    // console.log(searchData);
  }

  if (searchData.length !== 0) {
    fillSearchTable();
  } else {
    searchTableNotFound.hidden = false;
  }

  searchTableSection.hidden = false;
}

function clearSearchTable() {
  while (searchTableBody.firstChild) {
    searchTableBody.lastChild.removeEventListener('click', editTransactionRow);
    searchTableBody.lastChild.removeEventListener(
      'click',
      deleteTransactionRow
    );
    searchTableBody.lastChild.remove();
  }

  searchTableSection.hidden = true;
  searchTableNotFound.hidden = true;
}

function editTransactionRow() {
  getEditData(this.parentNode);
  editModal.showModal();
}

function deleteTransactionRow() {
  getDeletionKeyValue(this.parentNode);
  deleteRowModal.showModal();
}

function createToggleSortAmount() {
  let sortOrder = false;
  return function () {
    sortOrder = !sortOrder;
    return sortOrder;
  };
}

const sortAmountOrder = createToggleSortAmount();

function handleSortAmount() {
  const order = sortAmountOrder();
  console.log(order);
  console.log(searchData);

  if (searchData.length > 0) {
    sortByAmount(searchData, order);
    clearSearchTable();
    fillSearchTable();

    searchTableSection.hidden = false;
  }
}

searchButton.addEventListener('click', toggleSearchForm);
searchForm.addEventListener('submit', startSearch);
searchClearButton.addEventListener('click', clearSearchTable);

searchTableAmountSortButton.addEventListener('click', handleSortAmount);
