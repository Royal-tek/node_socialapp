const User = require('../models/user')
const bcrypt = require('bcrypt')
const router = require('../routes/userRoutes')

// REGISTER A USER
exports.register = async (req, res)=>{
    try {

        // HASH THE INCOMING PASSWORD
        const salt = await bcrypt.genSalt(10)    
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        
        // CREATING THE USER
        const user = new User({
            username : req.body.username,
            email : req.body.email,
            password : hashedPassword
        })
        const newUser = await user.save()
        res.status(201).json({newUser})
    } catch (error) {
        res.status(400).json({error})
        console.log(error)
    }
}

// LOGIN A USER
exports.login = async (req, res)=>{
    try {
        const user = await User.findOne({ email : req.body.email})
        if(!user) return res.status(400).json({ message : 'User Not Found'})
        const validatePwd = await bcrypt.compare(req.body.password, user.password)
        if(! validatePwd) return res.status(400).json({message : 'Username or Password Invalid'})

        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({error})
    }
}