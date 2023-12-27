var db = require("../models");

exports.update_meeting_time_slot_status= async(req,res,next) =>{
    try{
        let { timeSlotId } = req.params;
        let {status}=req.body;
        let fetchPreferedDateAndTimeslot = await db.PreferedDateAndTimeslot.findOne({
            where: {
                id: timeSlotId
            }
        });
        if(fetchPreferedDateAndTimeslot===null){
            res.json({
                "status":"failed",
                "message":"fetchPreferedDateAndTimeslot failed"
            })
        }
        let updatePreferedDateAndTimeslot= await db.PreferedDateAndTimeslot.update({
            meeting_requested_user_id: fetchPreferedDateAndTimeslot.meeting_requested_user_id,
            date:fetchPreferedDateAndTimeslot.date,
            time:fetchPreferedDateAndTimeslot.time,
            status:status
           
        },{
            where: {
                id: timeSlotId
            },
            returning: true
        }
        )
        let fetchPreferedDateAndTimeslots = updatePreferedDateAndTimeslot[1].length > 0 ? (updatePreferedDateAndTimeslot[1])[0] : null;
        res.status(200).json({
            'status':'success',
            'payload':fetchPreferedDateAndTimeslots,
            'message':'PreferedDateAndTimeslots updated successfully'
        })

    }catch(error) {
        console.log("Error=====>"+error)
        res.status(500).json({
            'status':'failed',
            'payload':{},
            'message':'PreferedDateAndTimeslot failed to update'
        })
    }
}