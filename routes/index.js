const router = require('express').Router();
const { HTTP_STATUS_NOT_FOUND  } = require('http2').constants;

router.use('/cards', require('./cards'))
router.use('/users', require('./users'))

router.use('*', function(req, res) {
  res.status(HTTP_STATUS_NOT_FOUND).send({message: 'URL not found'})
});

module.exports = router;