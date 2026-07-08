const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const tankRoutes = require('./tank.routes');
const reportRoutes = require('./report.routes');
const activityRoutes = require('./activity.routes');
const settingsRoutes = require('./settings.routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/tank-records', tankRoutes);
router.use('/reports', reportRoutes);
router.use('/activities', activityRoutes);
router.use('/settings', settingsRoutes);

router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
