var db = require("../models");

exports.fetch_all_contact_infos= async(req,res,next)=>{
    try{
        let fetchAllManageContactInfos= await db.ManageContactInfo.findAll();
        res.status(200).json({
            status: 'success',
            payload: fetchAllManageContactInfos,
            message: 'ManageContactInfos fetched successfully'
        })

    }
    catch(error){
        console.log("Error ==> " + error)
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching ManageContactInfos'
        });
    }
}

exports.create_contact_info=async(req,res,next)=>{
    try{
        let {phone_number,alternate_phone_number,email,address}=req.body
         let newManageContactInfo =await db.ManageContactInfo.create({
            phone_number:phone_number,
            alternate_phone_number:alternate_phone_number,
            email: email,
            address:address,
         });
         res.status(200).json({
             'status':'success',
             'payload':newManageContactInfo,
             'message':'ManageContactInfo created successfully'
         })
    }
    catch(error){
        console.log("Error=========>"+error)
        res.status(500).json({
            'status':'failed',
            'payload':{},
            'message':'ManageContactInfo failed to create'
        })

    }
}

exports.update_contact_info= async(req,res,next) =>{
    try{
        let { id } = req.params;
        let {phone_number,alternate_phone_number,email,address}=req.body;
        let fetchManageContactInfo = await db.ManageContactInfo.findOne({
            where: {
                id: id
            }
        });
        if(fetchManageContactInfo===null){
            res.json({
                "status":"failed",
                "message":"fetch ManageContactInfo failed"
            })
        }
        let updateManageContactInfo= await db.ManageContactInfo.update({
            phone_number:phone_number,
            alternate_phone_number:alternate_phone_number,
            email: email,
            address:address,
        },{
            where: {
                id: id
            },
            returning: true
        }
        )
        let fetchUpdateManageContactInfos = updateManageContactInfo[1].length > 0 ? (updateManageContactInfo[1])[0] : null;
        res.status(200).json({
            'status':'success',
            'payload':fetchUpdateManageContactInfos,
            'message':'UpdateManageContactInfo updated successfully'
        })

    }catch(error){
        console.log("Error=====>"+error)
        res.status(500).json({
            'status':'failed',
            'payload':{},
            'message':'ManageContactInfos failed to update'
        })
    }
}