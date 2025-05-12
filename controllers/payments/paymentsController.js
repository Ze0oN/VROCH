const { client } = require('../../utils/paypalClient');
const paypal = require('@paypal/checkout-server-sdk');

exports.createOrder = async (req, res) => {
  const { amount } = req.body;

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: amount // Dynamic total from frontend
      }
    }]
  });

  try {
    const response = await client().execute(request);
    res.json({ id: response.result.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.captureOrder = async (req, res) => {
  const orderId = req.body.orderID;
  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const response = await client().execute(request);
    res.json({ status: response.result.status, details: response.result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
