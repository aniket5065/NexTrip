const paymentService = require('./payment.service');

(async () => {
    try {
        const amount = 500; // Amount in INR
        const order = await paymentService.createOrder(amount);
        console.log('Order created successfully:', order);
    } catch (error) {
        console.error('Error creating order:', error.message);
    }
})();