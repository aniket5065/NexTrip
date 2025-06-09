const Razorpay = require('razorpay');

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, 
    key_secret: process.env.RAZORPAY_KEY_SECRET 
});

module.exports.createOrder = async (amount, currency = 'INR') => {
    const options = {
        amount: amount * 100, // Amount in paise
        currency,
        receipt: `receipt_${Date.now()}`
    };

    const order = await razorpayInstance.orders.create(options);
    return order;
};