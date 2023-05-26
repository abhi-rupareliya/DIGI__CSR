const NGO = require("../Models/NGO");
const fs = require("fs");

exports.getNGOProfile = async (req,res) => {
    try {
        const NGOId = req.params.id;
    
        // Retrieve the NGO document by its ID
        const ngo = await NGO.findById(NGOId);
    
        if (!ngo) {
          return res
            .status(404)
            .json({ success: false, message: "NGO not found." });
        }
    
        // Prepare the response data
        const responseData = {
          NGO_name: ngo.NGO_name,
          email: ngo.email,

          profile : {
            summary : ngo.profile.summary,
            board_members : {
            bm_name : ngo.profile.board_members.bm_name,
            bm_gender : ngo.profile.board_members.bm_gender,
            bm_din : ngo.profile.board_members.bm_din,
            bm_phone : ngo.profile.board_members.bm_phone,
            bm_designation : ngo.profile.board_members.bm_designation,
          },
          csr_budget : ngo.profile.csr_budget,
          operation_area : ngo.profile.operation_area,
          sectors : ngo.profile.sectors,
          }
        };
    
        res.status(200).json({
          success: true,
          data: responseData,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error." });
      }
};

// exports.getNGOCertificate = async (req,res) => {};

exports.AddNGOProfile = async (req,res) => {
  try {
        const NGOId = req.params.id;
        const {
            NGO_name,
            summary,
            bm_name,
            bm_gender,
            bm_din,
            bm_phone,
            bm_designation,
            csr_budget,
            operation_area,
            sectors,
        } = req.body;

        let updatedFields = {
            NGO_name,
            "profile.summary" : summary,
            "profile.board_members.bm_name" : bm_name,
            "profile.board_members.bm_gender" : bm_gender,
            "profile.board_members.bm_din" : bm_din,
            "profile.board_members.bm_phone" : bm_phone,
            "profile.board_members.bm_designation" : bm_designation,
            "profile.csr_budget" : csr_budget,
            "profile.operation_area" : operation_area,
            "profile.sectors" : sectors,

        };

    const ngo = await NGO.findByIdAndUpdate(
      companyId,
      { $set: updatedFields },
      { new: true }
    );

    if (!ngo) {
      return res
        .status(404)
        .json({ success: false, message: "NGO not found." });
    }

    res.status(200).json({
      success: true,
      message: ngo,
    });
  }catch(err) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};