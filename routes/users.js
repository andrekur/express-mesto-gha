const router = require('express').Router();
const { getUsers, getUser, updateSelfUser, updateSelfAvatar } = require('../controllers/users')

router.get('/', getUsers);
router.get('/:userId', getUser);
router.patch('/me', updateSelfUser);
router.patch('/me/avatar', updateSelfAvatar);

module.exports = router;