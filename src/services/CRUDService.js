import bcrypt from 'bcryptjs';
import db from '../models/index';


var salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            let hashPassword = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleid,
            });
            resolve('tao user thanh cong !!');
        } catch (error) {
            reject(error);
        }
    })
}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }

    })
}

let getAllUsers = async () => {
    return new Promise((resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });

            resolve(users);
        } catch (error) {
            reject(error);
        }
    })
}

let getUserInfoById = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: id},
                raw: true
            })
            if (user) {
                resolve(user);
            }
            else {
                resolve([]);
            }
        } catch (error) {
            reject(error);
        }
    })
}


let updateUserData = async (data) => {
    // console.log(data);
    return new Promise( async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: data.id}
            });
            // console.log(user);
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();
                resolve();
            }
            else{
                resolve([])
            }
        } catch (error) {
            reject(error);
        }
    })
}

let deleteUser = async (id) => {
    new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: id}
            });
            // console.log(user);
            if (user) {
                await user.destroy();
            }
            resolve();
        } catch (error) {
            reject(error);
        }
    })
}



module.exports = {
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    getUserInfoById:getUserInfoById,
    updateUserData:updateUserData,
    deleteUser: deleteUser,
}