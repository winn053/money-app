const importButton = document.getElementById('import-file');

async function importFile(e) {
  const input = e.target;
  const file = e.target.files[0];
  if (!file) {
    console.log('File not found');
    // ensure the file input is cleared so the user can re-select the same file later
    input.value = '';
    return;
  }

  try {
    console.log('Getting file');
    const text = await file.text();
    console.log('Finished getting file');
    const data = JSON.parse(text);
    if (!Array.isArray(data)) {
      throw new Error('Invalid file format');
    }
    const ok = confirm('Import will replace current data. Continue?');
    if (!ok) {
      // user cancelled — clear the input so change event can fire next time
      input.value = '';
      return;
    }

    // normalize
    const items = data.map(item => ({
      key: item.key,
      date: item.date || new Date().toISOString().slice(0, 10),
      amount: item.amount || '',
      source: ['cash', 'credit', 'check', 'zelle'].includes(item.source)
        ? item.source
        : 'cash',
      category: item.category || '',
      description: item.description || '',
    }));
    saveData(KEY, items);
  } catch (err) {
    alert('Import failed: ' + err.message);
  } finally {
    input.value = '';
  }
}

importButton.addEventListener('change', importFile);
