const User = require('../models/user');

const register = async(req, res) => {
    try {
        const {firstname, secondname, username, email, password, confirmpassword} = req.body;
        if(!firstname || !username || !email || !password || !confirmpassword){
            return res.status(400).json({success: false, msg: "Please provide required fields"});
        }
        if(password !== confirmpassword){
            return res.status(400).json({success: false, msg: "Passwords doesent match"});
        }
    
        const user = await User.create({
            firstName: firstname,
            secondName: secondname,
            userName: username,
            email,
            password
        });
    
        const token = await user.createToken();
    
        res.status(200).json({success: true, user, token})
    } catch (error) {
        res.status(200).json({success: false, error})

    }
}

const login = async(req, res) => { 
    try {
        
        const {username, password} = req.body;
        console.log(username);
        if(!username || !password){
            return res.status(400).json({success: false, msg: "Please fill all fields"})
        }
        let user;
        if(username.includes("@")){
            user = await User.findOne({email: username});
        }else{
            user = await User.findOne({userName: username});
        }
        console.log(user);
    
        if(!user){
            return res.status(404).json({success: false, msg: `No user found ${username}`});
        }
    
        const validPassword = await user.validatePassword(password);
        console.log(validPassword);
        if(!validPassword){
            return res.status(400).json({success: false, msg: `Incorrect Password`});
        }
        const token = await user.createToken();
        res.status(200).json({success: true, user, token})
    } catch (error) {
        res.status(200).json({success: false, error})
    }
}

module.exports = {
    login,
    register
}