var express = require('express');
var router = express.Router();
var db = require('../../models');
var checkAuth = require('../../middleware/check-auth')

router.get('/',  async function(req,res,next){
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
})

router.post('/',  async function(req,res,next){
    try{
        
        const socket = req.app.get('socket')

        let {phone_number,alternate_phone_number,email,address}=req.body
         let newManageContactInfo =await db.ManageContactInfo.create({
            phone_number:phone_number,
            alternate_phone_number:alternate_phone_number,
            email: email,
            address:address,
         });
         socket.emit("contact-info");
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
})

router.put('/:id', async function(req,res,next) {
    try{
        const socket = req.app.get('socket')
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
        socket.emit("contact-info");
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
})

module.exports = router;