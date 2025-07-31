const searchButton = document.getElementById('search-button');
const searchDiv = document.getElementById('search-div');
const searchForm = document.getElementById('search-form');
const searchAmount = document.getElementById('search-amount');
const searchSource = document.getElementById('search-source');
const searchFrom = document.getElementById('search-from');
const searchTo = document.getElementById('search-to');
const searchTableSection = document.getElementById('search-table-section');
const searchTable = document.getElementById('search-table');

function openSearchForm() {
  searchDiv.hidden = false;
}

function doSearch(formData, savedData) {
  let amountFilter = savedData;
  if (formData.amount !== '') {
    amountFilter = amountFilter.filter(data => data.amount === formData.amount);
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
  return amountFilter;
}

function startSearch(e) {
  let searchData = [];

  e.preventDefault();

  const formData = {
    amount: searchAmount.value,
    source: searchSource.value,
    dateFrom: searchFrom.value,
    dateTo: searchTo.value,
  };

  const storedFormData =
    JSON.parse(localStorage.getItem('moneyTrackerFormData')) || [];

  console.log(formData.amount);
  console.log(formData.source);
  console.log(formData.dateFrom);
  console.log(formData.dateTo);

  console.log(storedFormData);

  if (
    formData.amount === '' &&
    formData.source === 'any' &&
    formData.dateFrom === '' &&
    formData.dateTo === ''
  ) {
    searchData = storedFormData; // shallow copy
  } else {
    searchData = doSearch(formData, storedFormData);
    console.log(searchData);
  }

  if (searchData) {
    const tableBody = document.createElement('tbody');

    for (let i = 0; i < searchData.length; i++) {
      const row = document.createElement('tr');

      let cell = document.createElement('td');
      let cellText = document.createTextNode(searchData[i].amount);
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
      cellText = document.createTextNode(searchData[i].description);
      cell.appendChild(cellText);
      row.appendChild(cell);

      tableBody.appendChild(row);
    }

    searchTable.appendChild(tableBody);
    searchTable.setAttribute('border', '1');

    searchTableSection.hidden = false;
  }
}

searchButton.addEventListener('click', openSearchForm);
searchForm.addEventListener('submit', startSearch);
