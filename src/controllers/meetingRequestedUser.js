var db = require("../models");

exports.fetch_all_meeting_request= async(req,res,next)=>{
    try{
        let meetingRequestedUsers= await db.MeetingRequestedUser.findAll(
            { include: [
                {
                    model: db.InterestedArea,
                    as: 'interestedAreas',
                },
                {
                    model: db.PreferedDateAndTimeslot,
                    as: 'preferedDateAndTimeslots',
                }
            ]}
        );
        res.status(200).json({
            status: 'success',
            payload: meetingRequestedUsers,
            message: 'MeetingRequestedUsers fetched successfully'
        })

    }
    catch(error){
        console.log("Error ==> " + error)
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching MeetingRequestedUsers'
        });
    }
}

exports.create_meeting_requset=async(req,res,next)=>{

    try {

        const { name,  email ,company, interested_areas,type,preferedDateAndTimeslots } = req.body;
      
        let newMeetingRequestedUser = await db.MeetingRequestedUser.create({
            name:name,
            email:email,
            company:company,
            type:type,
            status:"Active"    
        });
        
        if(interested_areas.length>0){
            for(let i=0;i<interested_areas.length;i++){
                await db.InterestedArea.create({
                    meeting_requested_user_id: newMeetingRequestedUser.id,
                    area_name:interested_areas[i]
                });
            }
        }

        if(preferedDateAndTimeslots.length>0){
            for(let i=0;i<preferedDateAndTimeslots.length;i++){
                await db.PreferedDateAndTimeslot.create({
                    meeting_requested_user_id: newMeetingRequestedUser.id,
                    date:preferedDateAndTimeslots[i].date,
                    time:preferedDateAndTimeslots[i].time,
                    status:"ACTIVE"
                });
            }
        }
  

        let fetchMeetingRequestedUser = await db.MeetingRequestedUser.findOne({
            where: {
                id: newMeetingRequestedUser.id
            },
            include: [
                {
                    model: db.InterestedArea,
                    as: 'interestedAreas',
                },
                {
                    model: db.PreferedDateAndTimeslot,
                    as: 'preferedDateAndTimeslots',
                }
            ]
        }); 

        res.status(200).json({
            'status':'success',
            'payload':fetchMeetingRequestedUser,
            'message':'User created successfully'
        })
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while logging in'
        });
    }
    
}
