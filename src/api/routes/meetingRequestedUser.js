var express = require('express');
var router = express.Router();
var meetingRequestController =require('../../controllers/meetingRequestedUser') 
 import checkAuth from "../../middleware/check-auth";

router.get('/',  meetingRequestController.fetch_all_meeting_request)
router.post('/',  meetingRequestController.create_meeting_requset)
router.put('/:meetingRequestUserId',  meetingRequestController.update_meeting_request_status)

module.exports = router;