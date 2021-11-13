const router = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/User")

// register
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body
        // generate hash password
        console.log("start here")
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        // create new user
        const user = new User({ username, email, password: hashedPassword })
        await user.save()
        res.send("ok")
    } 
    catch (err) {
        console.log(err)
    }  
}) 

// login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        if(!email=="" || !password==""){
            // find user
            const user = await User.findOne({ email })
            if(!user?.email){
                res.status(404).send("user not found")
            }
            else{
                const validPassword=await bcrypt.compare(password,user.password)
                console.log(validPassword)
                validPassword ?res.status(200).json(user):res.status(400).send("Invalid credentials")
            }
            // check valud password     
        } 
        else{ 
            res.status(400).send("please fill all the fields")
        } 
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router