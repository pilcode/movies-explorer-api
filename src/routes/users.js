const router = require('express').Router();

const {
  getUsers,
  updateUser,
  getUserByToken,
  //   getUserById,
} = require('../controllers/users');

const {
  validateUpdateUser,
  validateUserBody,
} = require('../middlewares/validations');

// router.get('/', getUsers);
// router.patch('/me', validateUpdateUser, updateUser);
// router.get('/me', getUserByToken);
// router.get('/:userId', validateUser, getUserById);
// router.patch('/me/avatar', validateAvatar, updateAvatar);

router.get('/', getUsers);
router.get('/me', validateUserBody, getUserByToken);
router.patch('/me', validateUpdateUser, updateUser);

module.exports = router;
