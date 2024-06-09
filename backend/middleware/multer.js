const multer = require("multer");
const path = require("path");

// Setarea locației și numelui fișierului
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Utilizează timestamp pentru unicitatea numelui fișierului
  },
});

// Filtrarea fișierelor după tip
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Tipul fișierului nu este permis");
    error.code = "LIMIT_FILE_TYPES";
    return cb(error, false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1000000 }, // Limita de 1MB
});

module.exports = upload;
