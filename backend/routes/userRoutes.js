const app = require('express');
const { userRegister, loginUser, validateUserController, logoutUser, editUserCredientials, getUsers, deleteUser, getParticularUser, editUser } = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate');
const router = app.Router();

router.post('/register', userRegister);
router.post('/login', loginUser);
router.get('/getUsers', getUsers);
// router.post('/editUser', authenticate, editUserCredientials);
router.get('/validuser', authenticate, validateUserController);
router.get('/logout', authenticate, logoutUser);
router.delete('/deleteUser/:id', deleteUser);
router.get('/getParticularUser/:id', getParticularUser)
router.put('/editUser', authenticate, editUser);

module.exports = router;
