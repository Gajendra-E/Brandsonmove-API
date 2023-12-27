var db = require("../models");

exports.fetch_all_meeting_links= async(req,res,next)=>{
    try{
        let meetinglinks= await db.MeetingLink.findAll();
        res.status(200).json({
            status: 'success',
            payload: meetinglinks,
            message: 'Meetinglinks fetched successfully'
        })

    }
    catch(error){
        console.log("Error ==> " + error)
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching meetinglinks'
        });
    }
}

exports.create_meeting_link=async(req,res,next)=>{
    try{
        let {link,pass_code,meeting_type}=req.body
         let newMeetingLink =await db.MeetingLink.create({
            meeting_type:meeting_type,
            link:link,
            pass_code:pass_code,
         });
         res.status(200).json({
             'status':'success',
             'payload':newMeetingLink,
             'message':'MeetingLink created successfully'
         })
    }
    catch(error){
        console.log("Error=========>"+error)
        res.status(500).json({
            'status':'failed',
            'payload':{},
            'message':'MeetingLink failed to create'
        })

    }
}

exports.update_meeting_link= async(req,res,next) =>{
    try{
        let { id } = req.params;
        let {link,pass_code,meeting_type}=req.body;
        let fetchMeetingLink = await db.MeetingLink.findOne({
            where: {
                id: id
            }
        });
        if(fetchMeetingLink===null){
            res.json({
                "status":"failed",
                "message":"fetchMeetingLink failed"
            })
        }
        let updateMeetingLink= await db.MeetingLink.update({
            link:link,
           pass_code:pass_code,
           meeting_type:meeting_type
           
        },{
            where: {
                id: id
            },
            returning: true
        }
        )
        let fetcUpdateMeetingLinks = updateMeetingLink[1].length > 0 ? (updateMeetingLink[1])[0] : null;
        res.status(200).json({
            'status':'success',
            'payload':fetcUpdateMeetingLinks,
            'message':'Meeting link updated successfully'
        })

    }catch(error) {
        console.log("Error=====>"+error)
        res.status(500).json({
            'status':'failed',
            'payload':{},
            'message':'Meeting Link failed to update'
        })
    }
}