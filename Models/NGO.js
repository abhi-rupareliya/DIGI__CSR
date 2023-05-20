const mongoose = require("mongoose");

const ngoSchema = new mongoose.Schema({
  csr: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  ngo_name: {
    type: String,
    required: true,
  },

  summary: {
    type: String,
  },

  board_members: [
    {
      bm_name: {
        type: String,
      },

      bm_gender: {
        type: String,
      },

      bm_din: {
        type: String,
      },

      bm_phone: {
        type: String,
      },

      bm_designation: {
        type: String,
      },
    },
  ],
  csr_budget: {
    type: Number,
  },

  operation_area: [
    {
      type: String,
    },
  ],

  sectors: [
    {
      type: String,
    },
  ],
});

const NGO = mongoose.model("NGO", ngoSchema);
module.exports = NGO;