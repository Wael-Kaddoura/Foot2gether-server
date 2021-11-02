const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: storage,
});

module.exports = {
  upload: upload,
};
