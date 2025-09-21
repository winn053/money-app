const resetButton = document.getElementById('clear-data-button');

function handleDeleteAllData() {
  if (confirm('This will delete ALL transactions. Continue?')) {
    const data = [];
    saveData(KEY, data);
    clearSearchTable();
    updateAllSpendingAmounts();
  }
}

resetButton.addEventListener('click', handleDeleteAllData);
