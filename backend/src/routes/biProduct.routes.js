const express = require('express');
const router = express.Router();
const biProductController = require('../controllers/biProduct.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const { createBiProductValidator } = require('../validators/biProduct.validator');
const validate = require('../middlewares/validation.middleware');

// All routes require authentication
router.use(authenticate);

// GET all reports — all authenticated users can view
router.get('/', biProductController.getAllReports);

// GET single report
router.get('/:id', biProductController.getReportById);

// POST create — admin and lab_incharge (quality_incharge/chemist in this system)
router.post(
  '/',
  authorize('admin', 'lab_incharge'),
  createBiProductValidator,
  validate,
  biProductController.createReport
);

// PUT update — admin and lab_incharge
router.put(
  '/:id',
  authorize('admin', 'lab_incharge'),
  biProductController.updateReport
);

// DELETE — admin only
router.delete(
  '/:id',
  authorize('admin'),
  biProductController.deleteReport
);

module.exports = router;
