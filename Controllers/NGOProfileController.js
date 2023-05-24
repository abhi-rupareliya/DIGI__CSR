const NGO = require("../Models/NGO");
const fs = require("fs");

exports.getNGOProfile = async (req,res) => {
    try {
        const NGOId = req.params.id;
    
        // Retrieve the NGO document by its ID
        const NGO = await NGO.findById(NGOId);
    
        if (!NGO) {
          return res
            .status(404)
            .json({ success: false, message: "NGO not found." });
        }
    
        // Prepare the response data
        const responseData = {
          NGO_name: NGO.NGO_name,
          email: NGO.email,
          profile: {
            
          },
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

exports.getNGOCertificate = async (req,res) => {};

exports.AddNGOProfile = async (req,res) => {};