const deleteRowSection = document.getElementById('delete-row-section');
const deleteRowModal = document.getElementById('delete-modal');
const deleteKey = document.getElementById('delete-key');
const deleteYesButton = document.getElementById('delete-yes-button');
const deleteNoButton = document.getElementById('delete-no-button');

function getDeletionKeyValue(row) {
  console.log('getDeletionKeyValue row = ', row);
  console.log(row.children);
  deleteKey.value = row.children[0].textContent;
  console.log(deleteKey.value);
}

function deleteData(formData) {
  const storedFormData =
    JSON.parse(localStorage.getItem('moneyTrackerFormData')) || [];

  // console.log('storedFormData: ', storedFormData);
  console.log('formData: ', formData);

  // search for correct row, using key
  const index = storedFormData.findIndex(data => data.key === formData.key);
  console.log('index: ', index);
  // console.log(storedFormData.length);

  if (index < 0) {
    throw new Error('error: key not found in data array');
  } else if (index >= storedFormData.length) {
    throw new Error('error: out of range of data array');
  }

  storedFormData.splice(index, 1);
  console.log('storedFormData', storedFormData);

  localStorage.setItem('moneyTrackerFormData', JSON.stringify(storedFormData));
}

function deleteRowOfSpendingData() {
  const formData = {
    key: Number(deleteKey.value),
    amount: '',
    source: 0,
    date: '',
    description: '',
  };

  deleteData(formData);
  deleteRowModal.close();

  const event = new Event('submit');
  searchForm.dispatchEvent(event);
}

function cancelDeletion() {
  deleteRowModal.close();
}

deleteNoButton.addEventListener('click', cancelDeletion);
deleteYesButton.addEventListener('click', deleteRowOfSpendingData);
