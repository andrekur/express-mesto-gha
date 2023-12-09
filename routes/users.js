const router = require('express').Router();
const { createUser, getUsers, getUser, updateSelfUser, updateSelfAvatar } = require('../controllers/users')

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:userId', getUser);
router.patch('/me', updateSelfUser);
router.patch('/me/avatar', updateSelfAvatar);

module.exports = router;