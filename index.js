const form = document.getElementById('spending-form');
const amountInput = document.getElementById('amount');
const amountSourceInput = document.getElementById('money-type');
const spendDate = document.getElementById('spend-date');
const spendDesc = document.getElementById('spend-description');
const totalSpendingButton = document.getElementById('total-spending-button');
const totalSpendingOutput = document.getElementById('total-spending-output');

spendDate.max = new Date().toISOString().split('T')[0];

let currentKey = 0;
(function () {
  const storedFormData =
    JSON.parse(localStorage.getItem('moneyTrackerFormData')) || [];

  if (storedFormData) {
    currentKey = storedFormData.at(-1)?.key + 1; // one more than current max key
    // console.log(currentKey);
  }
})();

function submitSpendingForm(e) {
  e.preventDefault();

  const formData = {
    key: currentKey,
    amount: amountInput.value,
    source: amountSourceInput.value,
    date: spendDate.value,
    description: spendDesc.value,
  };

  saveFormData(formData);
  clearForm();
}

function saveFormData(formData) {
  const storedFormData =
    JSON.parse(localStorage.getItem('moneyTrackerFormData')) || [];

  storedFormData.push(formData);

  localStorage.setItem('moneyTrackerFormData', JSON.stringify(storedFormData));

  currentKey++;
}

function clearForm() {
  amountInput.value = '';
  amountSourceInput.selectedIndex = 0;
  spendDate.value = '';
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

function getSpendingAmount() {
  const storedFormData =
    JSON.parse(localStorage.getItem('moneyTrackerFormData')) || [];

  const totalSpent = storedFormData.reduce(
    (total, current) => total + Number(current.amount),
    0
  );

  console.log('Get spending amount = ', totalSpent);

  totalSpendingOutput.textContent = `$${totalSpent}`;
}

form.addEventListener('submit', submitSpendingForm);
totalSpendingButton.addEventListener('click', getSpendingAmount);
