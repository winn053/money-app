const resetButton = document.getElementById('clear-data-button');

function clearAll() {
  if (confirm('This will delete ALL transactions. Continue?')) {
    const data = [];
    saveData(KEY, data);
    clearSearchTable();
    updateAllSpendingAmounts();
  }
}

resetButton.addEventListener('click', clearAll);
