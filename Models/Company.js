const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema({
  cin: {
    type: String,
    required: true,
    unique: true,
  },
  company_name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profile: {
    location: {
      city: String,
      state: String,
      pincode: String,
    },
    establishment_year: {
      type: Number,
    },
    comunication_person: {
      cp_name: {
        type: String,
      },
      cp_email: {
        type: String,
      },
      cp_designation: {
        type: String,
      },
    },
    registration_certificate: {
      type: Buffer,
    },
    tax_comp: {
      _80G: {
        type: Boolean,
      },
      _35AC: {
        type: Boolean,
      },
      _12AA: {},
      FCRA: {
        type: Boolean,
      },
    },
    sectors: [{ type: String }],
  },
  initial_data: [
    {
      year: {
        type: Number,
      },
      sector: {
        type: String,
      },
      amount: {
        type: Number,
      },
    },
  ],
});

const Company = mongoose.model("Company", CompanySchema);
module.exports = Company;