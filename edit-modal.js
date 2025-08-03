const editModal = document.getElementById('edit-modal');
const editForm = document.getElementById('edit-modal-form');
const editAmountInput = document.getElementById('edit-amount');
const editAmountSourceInput = document.getElementById('edit-money-type');
const editSpendDate = document.getElementById('edit-spend-date');
const editSpendDesc = document.getElementById('edit-spend-description');

function getEditData(row) {
  console.log('getEditData row = ', row);
  // const editData = row.children.map(() => this.value);
  console.log(row.children);
  editAmountInput.value = row.children[0].textContent;
  editAmountSourceInput.value = row.children[1].textContent;
  editSpendDate.value = row.children[2].textContent;
  editSpendDesc.textContent = row.children[3].textContent;

  console.log(editAmountInput.value);
  console.log(editAmountSourceInput.value);
  console.log(editSpendDate.value);
  console.log(editSpendDesc.textContent);
}

editForm.addEventListener('submit', () => editModal.close());
