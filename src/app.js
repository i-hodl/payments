import $ from 'jquery';
import backend from './backend';

function calculateTotal() {
  const locationSelect = document.getElementById('location');
  const paymentTypeSelect = document.getElementById('paymentType');
  const modelSelect = document.getElementById('model');
  const cryptoTypeSelect = document.getElementById('cryptoType');

  if (!locationSelect.value || !paymentTypeSelect.value || !modelSelect.value || !cryptoTypeSelect.value) {
    $('#totalDiv').hide();
  } else {
    $('#totalDiv').show();
    let modelPrice = getModelPrice(modelSelect.value);
    const total = modelPrice * parseFloat(cryptoTypeSelect.value);
    $('#totalAmount').text('$' + total.toFixed(2));
  }
}

function getModelPrice(selectedModel) {
  let modelPrice = 0;
    
  switch (selectedModel) {
    case '64GB':
      modelPrice = 100.00;
      break;
    case '128GB':
      modelPrice = 123.45;
      break;
    case '256GB':
      modelPrice = 133.70;
      break;
    case '512GB':
      modelPrice = 177.95;
      break;
    case '1TB':
      modelPrice = 229.99;
      break;
  }
    
  return modelPrice;
}

$('#location, #paymentType, #model, #cryptoType').change(function() {
  calculateTotal();
});


function createInvoice(description, amount, currency) {
  alert('Creating invoice for ' + description + '...');
  backend.createInvoice(amount, currency)
    .then((invoice) => {
      alert(`Invoice created with id ${invoice.id}.`);
      // Redirect to the Coinbase Commerce checkout page
      window.open(invoice.hosted_url, '_blank');
    })
    .catch((error) => {
      alert(`Error creating invoice: ${error.message}`);
    });
};

$('#payButton').click(function() {
  const modelSelect = document.getElementById('model');
  const cryptoTypeSelect = document.getElementById('cryptoType');
  const description = modelSelect.value + ' (' + cryptoTypeSelect.value + ')';
  const amount = parseFloat($('#totalAmount').text().substr(1)); // remove $ sign from total amount
  const currency = cryptoTypeSelect.value;
  createInvoice(description, amount, currency);
});

$('#nextButton').click(function() {
  const totalDiv = $('#totalDiv');
  if (totalDiv.is(':visible')) {
    const paymentTypeSelect = document.getElementById('paymentType').value;
    
    if (paymentTypeSelect === 'CRYPTO') {
      $('#cryptoDiv').show();
    } else {
      const location = $('#location').val().toLowerCase();
      const paymentType = paymentTypeSelect.toLowerCase();
      const model = $('#model').val().toLowerCase();
      const url = `https://h0dl.xyz/${location}/${paymentType}/${model}`;
      window.location.href = url;
    }
  } else {
    alert('Please select location, payment type, model, and crypto type.');
  }
});
