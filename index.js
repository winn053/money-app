const form = document.getElementById('spending-form');
const amountInput = document.getElementById('amount');
const amountSourceInput = document.getElementById('money-type');
const spendDate = document.getElementById('spend-date');
const spendCategory = document.getElementById('spend-category');
const spendDesc = document.getElementById('spend-description');
// const totalSpendingButton = document.getElementById('total-spending-button');
const totalSpendingOutput = document.getElementById('total-spending-output');
const lastMonthSpendingOutput = document.getElementById(
  'last-month-spending-output'
);
const cashSpendingOutput = document.getElementById('cash-spending-output');
const checkSpendingOutput = document.getElementById('check-spending-output');
const creditSpendingOutput = document.getElementById('credit-spending-output');
const zelleSpendingOutput = document.getElementById('zelle-spending-output');

const KEY = 'moneyTrackerFormData';
let currentKeyCounter = null;

(function () {
  setMaxDate();
  currentKeyCounter = createKeyCounter();
  clearForm();
  updateAllSpendingAmounts();
})();

function createKeyCounter() {
  let currentKey = 0; // Private variable
  const storedFormData = getLocalStorage(KEY);
  if (storedFormData?.length > 0) {
    currentKey = storedFormData.at(-1).key;
    // console.log('currentKeyCounter', currentKey);
  }
  return function () {
    currentKey++;
    return currentKey;
  };
}

function setMaxDate() {
  const date = new Date();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    timeZone: timeZone,
    dateStyle: 'short',
  }).format(date);
  // console.log(formattedDate);
  spendDate.max = new Date(Date.parse(formattedDate))
    .toISOString()
    .split('T')[0];
}

function getLocalStorage(key) {
  const storedData = JSON.parse(localStorage.getItem(key)) || [];
  if (!storedData) {
    throw new Error('Error: No local data to be found');
  }
  return storedData;
}

function submitSpendingForm(e) {
  e.preventDefault();

  const formData = {
    key: currentKeyCounter(),
    amount: amountInput.value.trim(),
    source: amountSourceInput.value,
    date: spendDate.value,
    category: spendCategory.value.trim(),
    description: spendDesc.value.trim(),
  };

  saveFormData(formData);
  clearForm();
  updateAllSpendingAmounts();
}

function saveFormData(formData) {
  const storedFormData = getLocalStorage(KEY);
  storedFormData.push(formData);
  // console.log('saveFormData.key', formData.key);
  saveData(KEY, storedFormData);
  currentKeyCounter();
}

function saveData(key, dataToStore) {
  localStorage.setItem(key, JSON.stringify(dataToStore));
}

function clearForm() {
  amountInput.value = '';
  amountSourceInput.selectedIndex = 0;
  spendDate.value = spendDate.max;
  spendCategory.value = '';
  spendDesc.value = '';
}

// function formatNumber(n) {
//   // format number 1000000 to 1,234,567
//   return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
// }

// function formatCurrency(input, blur) {
//   // appends $ to value, validates decimal side
//   // and puts cursor back in right position.

//   // get input value
//   var input_val = input.val();

//   // don't validate empty input
//   if (input_val === "") { return; }

//   // original length
//   var original_len = input_val.length;

//   // initial caret position
//   var caret_pos = input.prop("selectionStart");

//   // check for decimal
//   if (input_val.indexOf(".") >= 0) {

//     // get position of first decimal
//     // this prevents multiple decimals from
//     // being entered
//     var decimal_pos = input_val.indexOf(".");

//     // split number by decimal point
//     var left_side = input_val.substring(0, decimal_pos);
//     var right_side = input_val.substring(decimal_pos);

//     // add commas to left side of number
//     left_side = formatNumber(left_side);

//     // validate right side
//     right_side = formatNumber(right_side);

//     // On blur make sure 2 numbers after decimal
//     if (blur === "blur") {
//       right_side += "00";
//     }

//     // Limit decimal to only 2 digits
//     right_side = right_side.substring(0, 2);

//     // join number by .
//     input_val = "$" + left_side + "." + right_side;

//   } else {
//     // no decimal entered
//     // add commas to number
//     // remove all non-digits
//     input_val = formatNumber(input_val);
//     input_val = "$" + input_val;

//     // final formatting
//     if (blur === "blur") {
//       input_val += ".00";
//     }
//   }

//   // send updated string to input
//   input.val(input_val);

//   // put caret back in the right position
//   var updated_len = input_val.length;
//   caret_pos = updated_len - original_len + caret_pos;
//   input[0].setSelectionRange(caret_pos, caret_pos);
// }

function toggleSpendingAmount() {
  const storedFormData = getLocalStorage(KEY);

  if (totalSpendingOutput.textContent === '') {
    const totalSpent = storedFormData.reduce(
      (total, current) => total + Number(current.amount),
      0
    );

    totalSpendingOutput.textContent = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(totalSpent);
  } else {
    totalSpendingOutput.textContent = '';
  }

  console.log('totalSpent = ', totalSpendingOutput.textContent);
}

function convertToUSDFormat(amountSpent) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amountSpent);
}

function getSpendingAmount(source = '', date = false) {
  const storedFormData = getLocalStorage(KEY);
  let filteredData = storedFormData;

  if (source === '' && !date) {
    return storedFormData.reduce(
      (total, current) => total + Number(current.amount),
      0
    );
  } else if (date) {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 1);
    const oneMonthAgo = currentDate.toISOString().split('T')[0];
    // console.log(oneMonthAgo);

    filteredData = filteredData.filter(
      data => new Date(data.date) >= new Date(oneMonthAgo)
    );

    return filteredData.reduce(
      (total, current) => total + Number(current.amount),
      0
    );
  } else {
    filteredData = filteredData.filter(data => data.source === source);

    return filteredData.reduce(
      (total, current) => total + Number(current.amount),
      0
    );
  }
}

function getTotalSpendingAmount() {
  const totalSpent = getSpendingAmount();
  totalSpendingOutput.textContent = convertToUSDFormat(totalSpent);
}

function getMonthlySpendingAmount() {
  const monthlySpent = getSpendingAmount('', true);
  lastMonthSpendingOutput.textContent = convertToUSDFormat(monthlySpent);
}

function getCashSpendingAmount() {
  const cashSpent = getSpendingAmount('cash');
  cashSpendingOutput.textContent = convertToUSDFormat(cashSpent);
}

function getCheckSpendingAmount() {
  const checkSpent = getSpendingAmount('check');
  checkSpendingOutput.textContent = convertToUSDFormat(checkSpent);
}

function getCreditSpendingAmount() {
  const creditSpent = getSpendingAmount('credit');
  creditSpendingOutput.textContent = convertToUSDFormat(creditSpent);
}

function getZelleSpendingAmount() {
  const zelleSpent = getSpendingAmount('zelle');
  zelleSpendingOutput.textContent = convertToUSDFormat(zelleSpent);
}

function updateAllSpendingAmounts() {
  getTotalSpendingAmount();
  getMonthlySpendingAmount();
  getCashSpendingAmount();
  getCheckSpendingAmount();
  getCreditSpendingAmount();
  getZelleSpendingAmount();
}

spendDate.addEventListener('click', setMaxDate);
form.addEventListener('submit', submitSpendingForm);
// totalSpendingButton.addEventListener('click', toggleSpendingAmount);
