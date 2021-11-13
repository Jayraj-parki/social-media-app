const router=require("express").Router()
const bcrypt=require("bcrypt")
const User=require("../models/User")
// get user
router.get("/:username",async(req,res)=>{
    // const arr=Object.keys(req.query)
    const {username}=req.params
    try{
        const user=await User.findOne({username:username})
        const {password,updateAt,...other}=user._doc
        // console.log("here came1")
        res.status(200).json(other)
    } 
    catch(err){ 
        res.status(500).json(err)
    } 
})
router.get("/byId/:userId",async(req,res)=>{
    // const arr=Object.keys(req.query)
    const {userId}=req.params
    try{
        const user=await User.findById(userId)
        const {password,updateAt,...other}=user._doc
        // console.log("here came1")
        res.status(200).json(other)
    } 
    catch(err){ 
        res.status(500).json(err)
    } 
})

// get friends
router.get("/friends/:userId",async(req,res)=>{
    // const arr=Object.keys(req.query)
    const {userId}=req.params
    console.log("userId")
    try{
        const user=await User.findById(userId)
        const friends=await Promise.all(
            user.followings.map(fId=>{
                return User.findById(fId)
            })
            )
        let friendList=[]
        friends.map(friend=>{
            const {_id,username,profilePicture}=friend;
            friendList.push({_id,username,profilePicture})
        })  

        console.log("here came1")
        res.status(200).json(friendList)
    } 
    catch(err){ 
        console.log(err)
        res.status(500).json(err)
    }  
})



// get home page user
router.get("/post/:id",async(req,res)=>{
    // console.log("here came2")
    const id=req.params.id

    try{ 
        if(id){
            const user=await  User.findById(id)
            const {password,updatedAt,...other}=user._doc
            // console.log(other)
            res.status(200).json(other)
        } 
        else{
            res.status(400).send("Invalid user")

        } 
    }
    catch(err){ 
        res.status(500).json(err)
    } 
})
// update user 
router.put("/:id",async(req,res)=>{
    if(req.body.userId===req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt=await bcrypt.genSalt(10)
                req.body.password=await bcrypt.hash(req.body.password,salt)
            }
            catch(err){
                return res.status(500).json(err)
            }
        }
        try{
            const user=await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            })
            res.status(200).json("Account has been updated")
        }
        catch(err){
            res.status(500).json(err)
        }
    }
    else{
        return res.status(403).json("You can update only your account")
    }
    
})
// delete user
router.delete("/:id",async(req,res)=>{
    if(req.body.userId===req.params.id || req.body.isAdmin){ 
        try{
            const user=await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Account has been deleted")
        }
        catch(err){
            res.status(500).json(err)
        }
    }
    else{
        return res.status(403).json("You can delete only your account")
    }
    
})

// follow a user
router.put("/:id/follow",async(req,res)=>{
    if(req.body.userId !==req.params.id){
        try{
            const user=await User.findById(req.params.id)
            // console.log(user)
            const currentUser=await User.findById(req.body.userId)
            if(!user.followers?.includes(req.body.userId)){
               const add= await user.updateOne({$push:{followers:req.body.userId}})
                // console.log(add)
                await currentUser.updateOne({$push:{followings:req.params.id}})
                res.status(200).json("user has been followed")
            }
            else{
                res.status(403).json("you allready follow")
            }
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    }
    else{
        res.status(403).json("you can't follow yourself")
    }
})  
// unfollow a user
router.put("/:id/unfollow",async(req,res)=>{
    if(req.body.userId !==req.params.id){
        try{
            const user=await User.findById(req.params.id)
            const currentUser=await User.findById(req.body.userId)
            if(user.followers?.includes(req.body.userId)){
                await user.updateOne({$pull:{followers:req.body.userId}})
                await currentUser.updateOne({$pull:{followings:req.params.id}})
                res.status(200).json("user has been unfollowed")
            }
            else{
                console.log("yes")
                res.status(403).json("you don't follow this user")
            }
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    }
    else{
        res.status(403).json("you can't unfollow yourself")
    }
})

module.exports=router