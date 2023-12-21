var express = require('express');
var router = express.Router();
var contactInfoController =require('../../controllers/contactInfo') 
 import checkAuth from "../../middleware/check-auth";

router.get('/',  contactInfoController.fetch_all_contact_infos)
router.post('/',  contactInfoController.create_contact_info)
router.put('/:id', contactInfoController.update_contact_info)

module.exports = router;