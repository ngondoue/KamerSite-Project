import express from "express"
import dotenv from "dotenv"
import User from "./models/user.js"
import cors from "cors"
import mongoose from "mongoose"

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log(`MongoDB SUCCESFULLY CONNECTED`))
    .catch((err) => err.message)


// signup endpoint
app.post("/api/signup", async(req,res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password){
        res.status(401).json({success: false, message: "Name, email, password required"})
    }
    const existingUser = await User.findOne({ email })
    if(existingUser){
        return res.status(409).json({success: false, message: "User already exists"})
    }
    const newUser = new User({ name, email, password })
    await newUser.save()
    res.status(201).json({success: true, message: "User created successfully"})
})

//login endpoint
app.post("/api/login", async(req,res) => {
    const {email, password} = req.body

    if(!email || !password){
        return res.status(401).json({success: false, message: "Email and password required"})
    }
    const existingUser = await User.findOne({ email: email })
    if(!existingUser){
        return res.status(404).json({success: false, message: "User not found"})
    }
    if(existingUser.password !== password){
        return res.status(401).json({success: false, message: "Invalid password"})
    }
    res.status(200).json({success: true, message: "Login successful"})
})    
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})





