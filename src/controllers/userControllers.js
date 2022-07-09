import userServices from '../services/userService'


let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    
    if (!email || !password) {
        return res.status(500).json({
            errorCode : 1,
            error: 'email hoac password khong duoc nhap !'
        })
    }
    
    let userData = await userServices.handleUserLogin(email, password);
    
    //check email nguoi dung co ton tai hay khong ?
    //so sanh password co dung khong ?
    //neu dugn tra ve thong ti nguoi dung !!

    return res.status(200).json({
        errorCode: userData.errorCode,
        message: userData.message,
        user: userData.user ? userData.user : {},
    })
    
}

module.exports = {
    handleLogin: handleLogin,
}