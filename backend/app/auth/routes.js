const express = require('express')
const router = express.Router();
const {SendVerigicationEmail, verifyCode} = require('./contollers')

router.post('/api/auth/sendmail', SendVerigicationEmail)
router.post('/api/auth/verifycode', verifyCode)

module.exports = router;