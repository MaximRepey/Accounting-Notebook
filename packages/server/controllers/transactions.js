const express = require('express');
const transactions = require('../services/transactions');

const router = express.Router();

router.get('/transactions', (req, res, next) => {
    transactions
        .getAll()
        .then(allTransactions => res.status(200).json(allTransactions))
        .catch(e => next(e));
});

router.post('/transactions', (req, res, next) => {
    const { type, amount } = req.body;
    transactions
        .commit(type, parseFloat(amount))
        .then(() => res.status(200).send())
        .catch(e => next(e));
});

module.exports = router;
