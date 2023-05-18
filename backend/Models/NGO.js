const mongoose = require('mongoose');

const ngoSchema = new mongoose.Schema({
    crn : {
        type : String ,
        required : true
    },

    email : {
        type : String ,
        required : true
    },

    ngo_name : {
        type : String ,
        required : true
    },

    summury : {
        type : String ,
        required : true
    },

    board_members : [
        {
            bm_name : {
                type : String ,
                required : true
            },

            bm_genders : {
                type : String ,
                required : true               
            },

            bm_din : {
                type : String ,
                required : true
            },

            bm_number :{
                type : String ,
                required : true
            },

            bm_designation : {
                type : String ,
                required : true
            }
        }
    ]
    ,

    csr_budget : {
        type : Number ,
        required : true
    },

    operation_area : [
        {
        type : String ,
        required : true
    }
],

    sectors : [
        {
            type : String ,
            required : true
        }
    ] 
});

const  NGO = mongoose.model("NGO",ngoSchema);

module.exports = NGO;