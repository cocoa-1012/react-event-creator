const router = require('express').Router();
const {
  login,
  me,
  updateName,
  updatePassword,
  tokenValidate,
} = require('../controller/authController');
const {
  userLoginValidator,
  userNameValidator,
  userPasswordUpdateValidator,
} = require('../validator/userValidation');
const { validationErrorResponse } = require('../utils/errorResponses');
const authenticate = require('../middleware/auth/authenticate');

router.post('/login', userLoginValidator, validationErrorResponse, login);
router.get('/me', authenticate, me);
router.post(
  '/me/name',
  authenticate,
  userNameValidator,
  validationErrorResponse,
  updateName
);
router.put(
  '/me/password',
  authenticate,
  userPasswordUpdateValidator,
  validationErrorResponse,
  updatePassword
);
router.get('/validate', authenticate, tokenValidate);
module.exports = router;
