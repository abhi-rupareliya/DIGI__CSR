require("dotenv").config({ path: "../.env" });
const Company = require("../Models/Company");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "cerificate");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });

const upload = multer({ storage: storage });
app.post("/company/detail/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

exports.CompanyDetails = async (req,res) => {
    try{
        const {comp_name , establishment_year , state , city , pin , p_name , p_email , p_number , p_designation , sector , certificate , taxEligibility} = req.body;

        const newCompanyDetails = await new Company({comp_name , establishment_year , state , city , pin , p_name , p_email , p_number , p_designation , sector , certificate , taxEligibility})

        await new newCompanyDetails.Save();
    }

    catch(err){
        console.warn(err);
    }
}