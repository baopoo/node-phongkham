import db from "../models/index"
import bcrypt from 'bcryptjs';


let handleUserLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {};

            let isExits = await checkUserEmail(email);
            if (isExits) {
                //neu user ton tai
                let user = await db.User.findOne({
                    where: { email: email},
                    raw: true,
                })
                if (user) {
                    //toi day minh phai doi hasd password ve binh thuong
                   let checkPassword = await bcrypt.compareSync(password, user.password);
                   if (checkPassword) {
                        userData.errorCode = 0;
                        userData.message = 'OK !';
                        delete user.password;
                        userData.user = user;

                   }
                   else {
                        userData.errorCode = 3;
                        userData.message = 'User sai mat khau !';
                   }
                    
                }
                else {
                    userData.errorCode = 2;
                    userData.message = 'user khong ton tai !'
                
                }

                resolve(userData);
            }
            else {
                //return error
                userData.errorCode = 1;
                userData.message = 'user khong ton tai !'
                resolve(userData);
            }
        } catch (error) {
            reject(error);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail}
            })
            if (user) {
                resolve(true);
            }
            else {
                resolve('user khong ton tai checkUserEmail !!');
            }
        } catch (error) {
            reject(error);
        }
    })
}


module.exports = {
    handleUserLogin: handleUserLogin,
}