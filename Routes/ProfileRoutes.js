const multer = require("multer");

const {
  getCompanyProfile,
  AddCompanyProfile,
  getCertificate,
} = require("../Controllers/CompanyProfileController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Set the filename of the uploaded file
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const ProfileRoutes = (app) => {
  app.get("/company/profile/:id", getCompanyProfile);
  app.get("/company/certificate/:id" , getCertificate)
  app.post(
    "/company/add-profile/:id",
    upload.single("registration_certificate"),
    AddCompanyProfile
  );
};
module.exports = ProfileRoutes;
