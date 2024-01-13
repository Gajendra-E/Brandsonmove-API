var express = require('express');
var router = express.Router();
var db = require('../../models');
var checkAuth = require('../../middleware/check-auth')
var jwt = require("jsonwebtoken");
var Email = require('../../helpers/email')
require('dotenv').config();

/*
  * Method: GET
  * query Parameter: None
  * Return: Return all user array of objects 
  * URl:/user
*/
router.get("/", async function (req, res, next) {
    try {
        let fetchUsers = await db.User.findAll({
            include: [
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
            ]
        });
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
});

router.post('/create', async function (req, res) {

    try {
        const { name, phone_number, email, password } = req.body;

        let user_type = "ADM"
        let fetchUser = await db.User.findOne({
            where: {
                email: email
            }
        })
        if (fetchUser !== null) {
            return res.status(500).json({
                'status': "failed",
                'message': "email already exist"
            })
        }

        let fetchRole = await db.Role.findOne({
            where: {
                code: user_type
            }
        })
        if (fetchRole === null) {
            return res.status(500).json({
                'status': 'failed',
                'message': 'Role does not exist'
            })
        }

        let newUser = await db.User.create({
            name: name,
            phone_number: phone_number,
            email: email,
            password: password !== undefined && password !== null ? password : null,
            status: 'ACTIVE'
        });

        await db.UserRole.create({
            role_id: fetchRole.id,
            user_id: newUser.id,
            status: "ACTIVE"
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
            'status': 'success',
            'payload': fetchCreatedUser,
            'message': 'User created successfully'
        })
    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while creating user'
        });
    }
});
/*
  * Method: POST
  * query Parameter: None
  * Body Parameters: email and password
  * Return: Return user object 
  * URl:/user/login
*/
router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;

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

        if (fetchUser === null) {
            return res.json({
                status: 'failed',
                payload: fetchUser,
                message: 'Invalid username'
            });
        }
        else {

            let isExistUser = await db.User.authenticate(fetchUser, req.body);

            if (isExistUser !== null) {
                let userObj = {};
                userObj.user_id = fetchUser.id;
                userObj.name = fetchUser.name
                userObj.email = fetchUser.email;
                userObj.phone_number = fetchUser.phone_number
                userObj.user_type = fetchUser.userRole.role.code;
                userObj.user_role_name = fetchUser.userRole.role.name;

                // let token = jwt.sign(userObj, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' });
                let token = jwt.sign(userObj, process.env.JWT_PRIVATE_KEY);
                // console.log("--5555555----"+token);
                res.status(200).json({
                    status: 'success',
                    token: token,
                    payload: userObj,
                    message: 'User loggedin successfully'
                });
            }

            else {
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

);

router.post('/send-email', async function (req, res) {
    try {
        await Email.send_email(req.body)
        return res.status(200).json({
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
})

//Delete user
router.delete('/:id', async function (req, res) {
    let id = req.params.id
    try {
        let fetchUser = await db.User.findOne({
            where: {
                id: id
            }
        });

        if (fetchUser === null) {
            return res.json({
                status: 'failed',
                payload: null,
                message: 'Error while fetching User'
            });
        }

        await db.User.destroy({
            where: {
                id: fetchUser.id
            }
        })

        await db.UserRole.destroy({
            where: {
                user_id: fetchUser.id
            }
        })

        res.status(200).json({
            status: 'success',
            payload: null,
            message: 'User deleted successfully'
        });
    }
    catch (error) {
        console.log("Error at User delete method- DELETE /:id:" + error);
        res.status(500).json({
            status: 'failed',
            message: error
        });
    }
})

module.exports = router;
