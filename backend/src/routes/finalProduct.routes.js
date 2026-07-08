const express = require('express');
const router = express.Router();
const finalProductController = require('../controllers/finalProduct.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const { createFinalProductValidator } = require('../validators/finalProduct.validator');
const validate = require('../middlewares/validation.middleware');

// All routes require authentication
router.use(authenticate);

// GET list (all authenticated users can view)
router.get('/', finalProductController.getAllRecords);

// GET single record
router.get('/:id', finalProductController.getRecordById);

// POST create — admin and lab_incharge only
// (quality_incharge / chemist roles map to lab_incharge in existing role system)
router.post(
  '/',
  authorize('admin', 'lab_incharge'),
  createFinalProductValidator,
  validate,
  finalProductController.createRecord
);

// PUT update — admin and lab_incharge only
router.put(
  '/:id',
  authorize('admin', 'lab_incharge'),
  finalProductController.updateRecord
);

// DELETE — admin only
router.delete(
  '/:id',
  authorize('admin'),
  finalProductController.deleteRecord
);

module.exports = router;
