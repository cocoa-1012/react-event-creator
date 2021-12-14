const router = require('express').Router();
const { eventCreateValidator } = require('../validator/eventValidation');

const {
  create,
  getAll,
  find,
  update,
  remove,
  imageUpload,
  getImages,
  imageDelete,
} = require('../controller/eventController');
const { validationErrorResponse } = require('../utils/errorResponses');
const authenticate = require('../middleware/auth/authenticate');
const upload = require('../middleware/upload');

router.get('/', authenticate, getAll);
router.post(
  '/',
  authenticate,
  eventCreateValidator,
  validationErrorResponse,
  create
);
router.get('/:id', authenticate, find);
router.put(
  '/:id',
  authenticate,
  eventCreateValidator,
  validationErrorResponse,
  update
);
router.delete('/:id', authenticate, remove);
router.get('/:eventId/image', getImages);
router.post('/:eventId/image', upload.single('image'), imageUpload);
router.delete('/image/:imageId', imageDelete);

module.exports = router;
