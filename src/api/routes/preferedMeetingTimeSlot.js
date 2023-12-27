var express = require('express');
var router = express.Router();
var preferedMeetingTimeSlotController =require('../../controllers/preferedMeetingTimeSlot')
 import checkAuth from "../../middleware/check-auth";

router.put('/:timeSlotId',  preferedMeetingTimeSlotController.update_meeting_time_slot_status)

module.exports = router;