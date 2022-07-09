import db from '../models/index';
import CRUDService from '../services/CRUDService';


let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();

        return res.render('homepage.ejs',{
            data: JSON.stringify(data)
        });

    }
    catch (e) {
        console.log(e);
    }
}
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}
let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    // console.log(message);
    return res.send('crud post from server')
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUsers();
    // console.log(data);
    // return res.send('display get crud from controllers');

    return res.render('displayCRUD.ejs',{
        data: data,
    });

}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        // console.log(userData);
        return res.render('editCRUD.ejs',{
            userData: userData,
        });
    }
    else {
        return res.send('user not find')

    }
    // console.log(req.query.id);
}

let putCRUD = async (req, res) => {
    let data = req.body;
    // console.log(data);
    await CRUDService.updateUserData(data);
    let dataAll = await CRUDService.getAllUsers();
    // console.log(data);
    // return res.send('display get crud from controllers');

    return res.render('displayCRUD.ejs',{
        data: dataAll,
    });
}


let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUser(id);
        return res.send('user delete successfully!!');
    } else {
        return res.send('user not find!!');

    }
}


module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD:getEditCRUD,
    putCRUD:putCRUD,
    deleteCRUD: deleteCRUD,
}