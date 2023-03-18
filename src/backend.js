import axios from 'axios';

async function createInvoice(amount, currency) {
  const response = await axios.post('/create_invoice', {
    amount,
    currency,
  });
  return response.data;
}

export default {
  createInvoice,
};