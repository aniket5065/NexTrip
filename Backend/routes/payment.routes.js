const express = require('express');
const router = express.Router();
const paymentService = require('../services/payment.service');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create-order', authMiddleware.authUser, async (req, res) => {
    try {
        const { amount } = req.body;
        if (!amount) {
            return res.status(400).json({ message: 'Amount is required' });
        }

        const order = await paymentService.createOrder(amount);
        res.status(201).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create payment order' });
    }
});

module.exports = router;