import dotenv from "dotenv"

// Express
import express, { json, urlencoded } from 'express'
import cors from 'cors'

// Database
import connectDB from './config/db.js'

// Routes
import scoreRoutes from './routes/scoreRoutes.js'

// import path, { dirname } from 'path'
// import { fileURLToPath } from 'url';
// import fs from 'fs'

// const __dirname = path.dirname(dirname(fileURLToPath(import.meta.url)))
// const audioPath = `${__dirname}/backend/audio/7`

// fs.readdir(audioPath, (err, filenames) => {
//     if (err) {
//         console.error(err)
//         return
//     } else {

//         filenames.forEach((item, idx) => {
//             const id = item.split('.')[0]

//             let originalName = `${audioPath}/${item}`
//             let newName = `${audioPath}/${id}.wav`
//             console.log(id)
//             fs.rename(originalName, newName, () => {
//                 console.log("\nFile Renamed!\n");
//             })
//         })

//     }
// })

dotenv.config()

// Conncet to MongoDB
connectDB();

// Express Server
const app = express()

app.use(cors())

// For JSON Data
app.use(json())
app.use(urlencoded({
    extended: false
}))



// Routes: (extension, routes)
app.use("/api/scores", scoreRoutes)


// Port server is running on
const PORT = process.env.PORT || 5000
app.listen(PORT,
    () => console.log(`Server running on port ${PORT}`)
)



