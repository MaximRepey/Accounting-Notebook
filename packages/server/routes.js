const express = require('express');
const router = express.Router();

router.use(require('./controllers/transactions'));

module.exports = router;
