const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, res, callback) => {
    callback(null, path.join(__dirname, '../public/event/images'));
  },
  filename: (req, file, callback) => {
    callback(
      null,
      `${req.params.eventId}-${Date.now()}${path
        .extname(file.originalname)
        .toLowerCase()}`
    );
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 1024 * 5,
  },
  fileFilter: (req, file, callback) => {
    console.log({ file });
    const types = /jpeg|jpg|png/;
    const extName = types.test(path.extname(file.originalname).toLowerCase());
    const mimeTypes = types.test(file.mimetype);

    if (extName && mimeTypes) {
      callback(null, true);
    } else {
      callback(new Error('Only support error'));
    }
  },
});

module.exports = upload;
