require("dotenv").config({ path: "../.env" });
const Company = require("../Models/Company");
const speakeasy = require("speakeasy");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.MAILER,
    pass: process.env.EMAILPASS,
  },
});

exports.CompanySignup = async (req, res) => {
  try {
    const { crn, company_name, email } = req.body;

    const exist = await Company.findOne({
      $or: [{ crn: crn }, { company_name: company_name }, { email: email }],
    });

    if (exist) {
      return res.status(400).send({
        success: false,
        message: "Company with this CRN, name or email already exists.",
      });
    }

    const otp = speakeasy.totp({
      secret: email + process.env.OTPSEC,
      digits: 6,
    });

    const mailOptions = {
      from: process.env.MAILER,
      to: email,
      subject: "OTP VERIFICATION",
      text: "Your One time password is : " + otp,
    };

    transporter.sendMail(mailOptions, (e, info) => {
      if (e) {
        res.status(400).send({
          success: false,
          message: "Error Sending mail.",
        });
      } else {
        res.status(200).send({ success: true, message: "OTP sent" });
      }
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error creating company.",
    });
  }
};

// exports.AddCompanyProfile = async (req, res) => {};

exports.VerifyCompany = async (req, res) => {
  try {
    const { crn, company_name, email, otp } = req.body;

    const is_verified = speakeasy.totp.verify({
      secret: email + process.env.OTPSEC,
      token: otp,
      window: 2,
      encoding: "ascii",
    });

    if (is_verified) {
      const newCompany = await new Company({ crn, company_name, email });
      await newCompany.save();
      res.status(200).send({ success: true, result: newCompany });
    } else res.status(400).send({ success: false, message: "Wrong OTP" });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error creating company.",
    });
  }
};
