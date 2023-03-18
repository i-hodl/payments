// Import dependencies
import './styles.css';
import { createHeader, createMain, createFooter } from './components/components';
// Import environment variable
const apiKey = process.env.COINBASE_API_KEY;

// Use API key in your code
const checkout = CoinbaseCommerce.Checkout.configure({
  apiKey: apiKey,
  // other configuration options...
});

// Initialize application
const header = createHeader();
const main = createMain();
const footer = createFooter();

// Render application to the DOM
const app = document.getElementById('app');
app.appendChild(header);
app.appendChild(main);
app.appendChild(footer);

module.exports = {
    mode: 'development',
    // other options
  };
  
