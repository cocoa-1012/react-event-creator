const router = require('express').Router();
const { create, getAll, remove } = require('../controller/userController');
const { userRegisterValidator } = require('../validator/userValidation');
const { validationErrorResponse } = require('../utils/errorResponses');
const authenticate = require('../middleware/auth/authenticate');
const isAdmin = require('../middleware/auth/isAdmin');
const deleteNoAdmin = require('../middleware/deleteNoAdmin');

router.get('/', authenticate, isAdmin, getAll);
router.post(
  '/',
  authenticate,
  isAdmin,
  userRegisterValidator,
  validationErrorResponse,
  create
);
router.delete('/:id', authenticate, isAdmin, deleteNoAdmin, remove);
module.exports = router;
