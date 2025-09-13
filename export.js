const exportButton = document.getElementById('export-button');

function handleExport() {
  const data = getLocalStorage(KEY);
  if (data.length === 0) {
    return;
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `spending-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}

exportButton.addEventListener('click', handleExport);
