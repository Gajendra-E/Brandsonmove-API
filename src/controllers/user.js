import db from '../models'
import { registerUser } from '../helpers/userHelper'
import jwt from "jsonwebtoken";
import Email from '../helpers/email'
require('dotenv').config();

exports.fetch_all_users= async (req, res, next) => {
    try {
        let fetchUsers = await db.User.findAll({include: [
            {
                model: db.UserRole,
                as: 'userRole',
                include: [
                    {
                        model: db.Role,
                        as: "role",
                    },
                ],
            }
        ]});
        res.status(200).json({
            status: 'success',
            payload: fetchUsers,
            message: 'Users fetched successfully'
        });
    } catch (error) {
        console.log("Error ==> " + error)
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching Users'
        });
    }

}

exports.login = async (req, res) => {
    
    try {
        const { email,password} = req.body;
       
        let fetchUser = await db.User.findOne({
            where: {
                email: email,
            },
            include: [
                {
                    model: db.UserRole,
                    as: 'userRole',
                    include: [
                        { 
                          model: db.Role,
                          as: 'role'
                        }
                    ]
                }
            ]
        });
      
        if(fetchUser === null){
            return res.json({
                status: 'failed',
                payload: fetchUser,
                message: 'Invalid username'
            });
        }
        else{
         
        let isExistUser = await db.User.authenticate(fetchUser, req.body);

        if(isExistUser !== null){

            let userObj = {};
            userObj.user_id = fetchUser.id;
            userObj.name =fetchUser.name
            userObj.email =fetchUser.email;
            userObj.phone_number =fetchUser.phone_number
            userObj.user_type = fetchUser.userRole.role.code;
            userObj.user_role_name = fetchUser.userRole.role.name;
          
            // let token = jwt.sign(userObj, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' });
        let token = jwt.sign(userObj, process.env.JWT_PRIVATE_KEY);
            // console.log("--5555555----"+token);
            res.status(200).json({
                status: 'success',
                token:token,
                payload: userObj,
                message: 'User loggedin successfully'
            });
        }
        
        else{
            res.json({
                status: 'failed',
                payload: {},
                message: 'Invalid username or password'
            });
        }

    }
        
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while logging in'
        });
    }
}

exports.createUser = async (req, res) => {
    
    try {
        const { name ,phone_number, email,  password } = req.body;
      
        let  user_type ="ADM"
        let  fetchUser = await db.User.findOne({
            where:{
                email:email
            }
        })
        if(fetchUser!==null){
               return res.status(500).json({
                    'status':"failed",
                    'message':"user already exist"
                })
        }

        let fetchRole = await db.Role.findOne({
            where:{
                code:user_type
            }
        })
        if (fetchRole === null) {
           return res.status(500).json({
                'status':'failed',
                'message':'Role does not exist'
            })
        }
       
        let newUser = await db.User.create({
            name:name,
            phone_number:phone_number,
            email: email,
            password: password !== undefined && password !== null ? password : null,
            status: 'ACTIVE'
        });
        
        await db.UserRole.create({
            role_id: fetchRole.id,
            user_id: newUser.id,
            status:"ACTIVE"
        });

        let fetchCreatedUser = await db.User.findOne({
            where: {
                id: newUser.id
            },
            include: [
                {
                    model: db.UserRole,
                    as: 'userRole',
                },
            ]
        }); 

       return res.status(200).json({
            'status':'success',
            'payload':fetchCreatedUser,
            'message':'User created successfully'
        })
    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while creating user'
        });
    }
}



exports.sendEmail = async (req, res, next) => {
    try {
         await Email.send_email(req.body)
         return  res.status(200).json({
            status: 'success',
            message: 'Email sent successfully'
        }); 
    
      
    } catch (error) {
       return res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while sending email'
        });
    }
}




