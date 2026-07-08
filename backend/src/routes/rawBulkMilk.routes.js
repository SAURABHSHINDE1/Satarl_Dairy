const express = require('express');
const router = express.Router();
const rawBulkMilkController = require('../controllers/rawBulkMilk.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const { createRawBulkMilkValidator } = require('../validators/rawBulkMilk.validator');
const validate = require('../middlewares/validation.middleware');

router.use(authenticate);

// GET list — all authenticated users
router.get('/', rawBulkMilkController.getAllRecords);

// GET single
router.get('/:id', rawBulkMilkController.getRecordById);

// POST create — admin and lab_incharge (quality_incharge/chemist)
router.post('/', authorize('admin', 'lab_incharge'), createRawBulkMilkValidator, validate, rawBulkMilkController.createRecord);

// PUT update — admin and lab_incharge
router.put('/:id', authorize('admin', 'lab_incharge'), rawBulkMilkController.updateRecord);

// DELETE — admin only
router.delete('/:id', authorize('admin'), rawBulkMilkController.deleteRecord);

module.exports = router;
