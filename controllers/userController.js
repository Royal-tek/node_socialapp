const User = require('../models/user')
const bcrypt = require('bcrypt')




//UPDATE A USER ACCOUNT
exports.updateUser = async (req, res)=>{
    if(req.body.id === req.params.id || req.body.isAdmin){
        if(req.body.password) {
                try {
                    const salt = await bcrypt.genSalt(10)
                    req.body.password = await bcrypt.hash(req.body.password, salt)
                } catch (error) {
                    return res.status(500).json({error})
                }
        }
        try{
        const user = await User.findByIdAndUpdate(req.params.id, {$set : req.body})
        res.status(200).json({user, message : 'Account has been updated'})
        }
        catch(error){
            return res.status(500).json({error})
        }
        
    }else{
        return res.status(403).json({ message : 'You Cannot Update Another Users Account'})
    }
}

//DELETE A USER ACCOUNT
exports.deleteUser = async (req, res)=>{
    if(req.body.id === req.params.id || req.body.isAdmin){
        
        try{
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json({message : 'Account has been deleted'})
        }
        catch(error){
            return res.status(500).json({error})
        }
        
    }else{
        return res.status(403).json({ message : 'You Cannot Update Another Users Account'})
    }
}

// GET A USER
exports.getUser = async (req, res)=>{
    try{
        const user = await User.findById({ _id : req.params.id})
        if(!user)  res.status(400).json({ message : 'User Not Found'})
        const {password, updatedAt, ...other} = user._doc
        
        res.status(200).json({other})
    }
    catch(error){
        res.status(400).json({error})
    }
}