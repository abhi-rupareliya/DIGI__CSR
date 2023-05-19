const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema({
  crn: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  establishment_year: {
    type: Number,
    required: true,
  },
  comunication_person: {
    cp_name: {
      type: String,
      required: true,
    },
    cp_email: {
      type: String,
      required: true,
    },
    cp_designation: {
      type: String,
      required: true,
    },
  },
  registration_certificate: {
    type: Buffer,
    required: true,
  },
  tax_comp: {
    _80G: {
      type: Boolean,
      default: false,
    },
    _35AC: {
      type: Boolean,
      default: false,
    },
    _12AA: {
      type: Boolean,
      default: false,
    },
    FCRA: {
      type: Boolean,
      default: false,
    },
  },
  sectors: [
    {
      type: String,
      require: true,
    },
  ],
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

