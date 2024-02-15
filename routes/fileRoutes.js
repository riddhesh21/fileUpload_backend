const express = require('express')
const route = express.Router();
const{localUpload,imageUpload,videoUpload} = require('../controllers/fileUpload')



route.post('/local/upload',localUpload)
route.post('/cloud/imageUpload',imageUpload)
route.post('/cloud/videoUpload',videoUpload)

module.exports  = route