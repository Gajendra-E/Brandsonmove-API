var express = require('express');
var router = express.Router();
var contentController =require('../../controllers/content') 
 import checkAuth from "../../middleware/check-auth";

router.get('/',  contentController.fetch_all_contents)
router.post('/',  contentController.create_content)
router.put('/:id',  contentController.update_content)
router.delete('/:id',contentController.delete_content )

module.exports = router;