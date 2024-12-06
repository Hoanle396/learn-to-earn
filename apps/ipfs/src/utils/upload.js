const multer = require("multer");
const fs = require("node:fs");

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    if (!fs.existsSync("public/uploads")) {
      fs.mkdirSync("public");
      fs.mkdirSync("public/uploads");
    }
    cb(null, "public/uploads");
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => cb(null, true),
});

module.exports = {
  upload,
};
