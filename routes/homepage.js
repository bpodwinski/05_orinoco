const express = require('express');
const router = express.Router();

const cameraCtrl = require('../controllers/camera');

router.get('/', cameraCtrl.getAxiosAllCameras);

module.exports = router;