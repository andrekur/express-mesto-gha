const router = require('express').Router();
const auth = require('../middlewares/auth')
const { HTTP_STATUS_NOT_FOUND  } = require('http2').constants;

router.use('/', require('./login'))
router.use('/cards', auth, require('./cards'))
router.use('/users', auth, require('./users'))


router.use('*', function(req, res) {
  res.status(HTTP_STATUS_NOT_FOUND).send({message: 'URL not found'})
});


module.exports = router;