var db = require('../models')

module.exports ={
    registerUser: (body)=> {
        return new Promise(async (resolve, reject)=> {
            try {
                let {name,phone_number, email,  password  } = body;
               let  user_type ="ADM"
                let  fetchUser = await db.User.findOne({
                    where:{
                        email:email
                    }
                })
                if(fetchUser!==null){
                        reject("user already exist");
                }

                let fetchRole = await db.Role.findOne({
                    where:{
                        code:user_type
                    }
                })
                if (fetchRole === null) {
                    reject("Role does not exist");
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
                        }
                    ]
                });
                resolve(fetchCreatedUser);
            } catch (error) {
                console.log('Error at register user function => '+error);
                resolve(null);
            }
        });
    },
}