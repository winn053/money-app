const deleteRowModal = document.getElementById('delete-modal');
const deleteKey = document.getElementById('delete-key');
const deleteYesButton = document.getElementById('delete-yes-button');
const deleteNoButton = document.getElementById('delete-no-button');

function getDeletionKeyValue(row) {
  deleteKey.value = row?.children[0].textContent;
}

function deleteData(formData) {
  const storedFormData = getLocalStorage(KEY);
  const index = findIndexFromKey(storedFormData, formData?.key);

  storedFormData.splice(index, 1);
  saveData(KEY, storedFormData);
}

function deleteRowOfSpendingData() {
  const formData = {
    key: Number(deleteKey.value),
    amount: '',
    source: 0,
    date: '',
    category: '',
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

deleteYesButton.addEventListener('click', deleteRowOfSpendingData);
deleteNoButton.addEventListener('click', cancelDeletion);
