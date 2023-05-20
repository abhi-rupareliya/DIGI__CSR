require("dotenv").config({ path: "../.env" });
const NGO = require("../Models/NGO");
const speakeasy = require("speakeasy");
const nodemailer = require("nodemailer");
const CRN = require("../Models/CRN");

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

exports.NGOSignup = async (req, res) => {
  try {
    const { csr, email } = req.body;

    const checkCSR = await CRN.findOne({ csr: csr });
    const checkEmail = await CRN.findOne({ email: email });
    if (
      (checkCSR && checkCSR.email != email) ||
      (checkEmail && checkEmail.csr != csr)
    ) {
      return res.status(400).send({
        success: false,
        message: "CSR or Email doesnt match.",
      });
    }

    const exist = await NGO.findOne({
      $or: [{ csr: csr } , { email: email }],
    });

    if (exist) {
      return res.status(400).send({
        success: false,
        message: "NGO with this CSR or Email has already exists.",
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

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(400).send({
          success: false,
          message: "Error Sending mail.",
        });
      } else {
        res.status(200).send({ success: true, message: "OTP has sent to your mail" });
      }
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error creating NGO.",
    });
  }
};
