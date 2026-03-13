function validateRegister(req, res, next){

    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({
            message:"Username and password required"
        });
    }

    if(password.length < 6){
        return res.status(400).json({
            message:"Password must be at least 6 characters"
        });
    }

    next();
}

module.exports = validateRegister;