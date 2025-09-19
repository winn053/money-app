const deleteRowModal = document.getElementById('delete-modal');
const deleteKey = document.getElementById('delete-key');
const deleteYesButton = document.getElementById('delete-yes-button');
const deleteNoButton = document.getElementById('delete-no-button');

function getDeletionKeyValue(row) {
  deleteKey.value = row?.children[0].textContent;
}

function deleteData(id) {
  const storedFormData = getLocalStorage(KEY);
  const index = findIndexFromKey(storedFormData, id);

  storedFormData.splice(index, 1);
  saveData(KEY, storedFormData);
}

function handleDeleteRowOfSpendingData() {
  deleteData(Number(deleteKey.value));
  deleteRowModal.close();
  updateAllSpendingAmounts();

  const event = new Event('submit');
  searchForm.dispatchEvent(event);
}

function cancelDeletion() {
  deleteRowModal.close();
}

deleteYesButton.addEventListener('click', handleDeleteRowOfSpendingData);
deleteNoButton.addEventListener('click', cancelDeletion);
