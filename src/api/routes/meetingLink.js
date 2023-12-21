var express = require('express');
var router = express.Router();
var meetingLinkController =require('../../controllers/meetingLink') 
 import checkAuth from "../../middleware/check-auth";

router.get('/',  meetingLinkController.fetch_all_meeting_links)
router.post('/',  meetingLinkController.create_meeting_link)
 router.put('/:id',  meetingLinkController.update_meeting_link)

module.exports = router;