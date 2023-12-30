var express = require('express');
var router = express.Router();
import userController from '../../controllers/user'
import { registerUser } from '../../helpers/userHelper'
 import checkAuth from "../../middleware/check-auth";

/*
  * Method: GET
  * query Parameter: None
  * Return: Return all user array of objects 
  * URl:/user
*/
router.get("/",  userController.fetch_all_users);

router.post('/create', userController.createUser);
/*
  * Method: POST
  * query Parameter: None
  * Body Parameters: email and password
  * Return: Return user object 
  * URl:/user/login
*/
router.post('/login', userController.login);

router.post('/send-email', userController.sendEmail)

//Delete user
router.delete('/:id',userController.deleteUser)

module.exports = router;
