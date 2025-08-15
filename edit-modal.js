const editModal = document.getElementById('edit-modal');
const editForm = document.getElementById('edit-modal-form');
const editCancelButton = document.getElementById('edit-cancel-button');
const editKey = document.getElementById('edit-key');
const editAmountInput = document.getElementById('edit-amount');
const editAmountSourceInput = document.getElementById('edit-money-type');
const editSpendDate = document.getElementById('edit-spend-date');
const editSpendDesc = document.getElementById('edit-spend-description');

function getEditData(row) {
  console.log('getEditData row = ', row);
  // const editData = row.children.map(() => this.value);
  console.log(row.children);
  editKey.value = row.children[0].textContent;
  editAmountInput.value = row.children[1].textContent;
  editAmountSourceInput.value = row.children[2].textContent;
  editSpendDate.value = row.children[3].textContent;
  editSpendDesc.textContent = row.children[4].textContent;

  console.log(editKey.value);
  console.log(editAmountInput.value);
  console.log(editAmountSourceInput.value);
  console.log(editSpendDate.value);
  console.log(editSpendDesc.textContent);
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
  const storedFormData =
    JSON.parse(localStorage.getItem('moneyTrackerFormData')) || [];

  // console.log('storedFormData: ', storedFormData);
  // console.log('formData: ', formData);

  // search for correct row, using key
  const index = storedFormData.findIndex(data => data.key === formData.key);
  // console.log('index: ', index);
  // console.log(storedFormData.length);

  if (index < 0) {
    throw new Error('error: key not found in data array');
  } else if (index >= storedFormData.length) {
    throw new Error('error: out of range of data array');
  }

  storedFormData.splice(index, 1, formData);
  console.log('storedFormData', storedFormData);

  localStorage.setItem('moneyTrackerFormData', JSON.stringify(storedFormData));
}

function editModalCancelHandler(e) {
  e.preventDefault();
  editModal.close();
}

editForm.addEventListener('submit', editModalSubmitHandler);
editCancelButton.addEventListener('click', editModalCancelHandler);
