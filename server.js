import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"


dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {console.log(`MongoDB SUCCESFULLY CONNECTED`)})
    .catch((err) => err.message)

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})





