const editModal = document.getElementById('edit-modal');
const editForm = document.getElementById('edit-modal-form');
const editCancelButton = document.getElementById('edit-cancel-button');
const editKey = document.getElementById('edit-key');
const editAmountInput = document.getElementById('edit-amount');
const editAmountSourceInput = document.getElementById('edit-money-type');
const editSpendDate = document.getElementById('edit-spend-date');
const editSpendDesc = document.getElementById('edit-spend-description');

function getEditData(row) {
  const storedData = getLocalStorage(KEY);

  const keyNumber = Number(row?.children[0]?.textContent);

  const index = findIndexFromKey(storedData, keyNumber);

  editKey.value = storedData[index].key;
  editAmountInput.value = storedData[index].amount;
  editAmountSourceInput.value = storedData[index].source;
  editSpendDate.value = storedData[index].date;
  editSpendDesc.textContent = storedData[index].description;
}

function editModalSubmitHandler(e) {
  e.preventDefault();

  const formData = {
    key: Number(editKey.value),
    amount: editAmountInput.value,
    source: editAmountSourceInput.value,
    date: editSpendDate.value,
    description: editSpendDesc.value,
  };

  saveEditFormData(formData);

  editModal.close();

  const event = new Event('submit');
  searchForm.dispatchEvent(event);
}

function saveEditFormData(formData) {
  const storedFormData = getLocalStorage(KEY);
  const index = findIndexFromKey(storedFormData, formData?.key);

  storedFormData.splice(index, 1, formData);

  saveData(KEY, storedFormData);
}

function findIndexFromKey(dataArray, key) {
  const index = dataArray.findIndex(data => data.key === key);
  if (index < 0) {
    throw new Error('error: key not found in data array');
  } else if (index >= dataArray.length) {
    throw new Error('error: out of range of data array');
  }
  return index;
}

function editModalCancelHandler() {
  editModal.close();
}

editForm.addEventListener('submit', editModalSubmitHandler);
editCancelButton.addEventListener('click', editModalCancelHandler);
