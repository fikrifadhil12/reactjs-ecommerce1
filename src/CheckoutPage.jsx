// File: server.js (Backend)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock database
let orders = [];
let orderIdCounter = 1;

// Checkout endpoint
app.post('/checkout', async (req, res) => {
  try {
    // Validate authentication
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Validate request data
    const { name, email, address, city, postalCode, phone, paymentMethod, cartItems, totalAmount } = req.body;
    
    if (!name || !email || !address || !cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    // Process payment (mock)
    const paymentSuccess = mockProcessPayment(paymentMethod, totalAmount);
    if (!paymentSuccess) {
      return res.status(402).json({ error: 'Payment failed' });
    }

    // Create order
    const order = {
      id: orderIdCounter++,
      customerInfo: { name, email, address, city, postalCode, phone },
      items: cartItems,
      total: totalAmount,
      paymentMethod,
      status: 'completed',
      date: new Date().toISOString()
    };

    orders.push(order);

    // Send success response
    res.status(201).json({
      success: true,
      orderId: order.id,
      message: 'Order created successfully'
    });

  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

function mockProcessPayment(method, amount) {
  // Simulate payment processing
  return Math.random() > 0.1; // 90% success rate for demo
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
