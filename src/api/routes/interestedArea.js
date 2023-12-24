var express = require('express');
var router = express.Router();
var requestController =require('../../controllers/siteVisitRequests') 
 import checkAuth from "../../middleware/check-auth";

router.get('/',  requestController.fetch_all_requests)
router.post('/',  requestController.create_request)
router.put('/:id',  requestController.update_request)

module.exports = router;