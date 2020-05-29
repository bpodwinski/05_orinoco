const express = require('express');
const router = express.Router();

const cameraCtrl = require('../controllers/camera');

router.get('/api/cameras', cameraCtrl.getAllCameras);
router.get('/api/cameras/:id', cameraCtrl.getOneCamera);
router.post('/api/cameras/order', cameraCtrl.orderCameras);

router.get('/categorie/cameras', cameraCtrl.getAxiosCatCameras);
router.get('/camera/:id', cameraCtrl.getAxiosOneCamera);

module.exports = router;