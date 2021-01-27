const express = require('express');

const dataController = require('../controllers/data-controller');

const router = express.Router();

// router.get('/:selectDate', dataController.getDataByDate);
router.get('/getAllDate', dataController.getAllDate);
router.get('/', dataController.getData);

module.exports = router;