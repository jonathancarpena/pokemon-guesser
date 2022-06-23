import dotenv from "dotenv"

// Express
import express, { json, urlencoded } from 'express'
import cors from 'cors'

// Database
import connectDB from './config/db.js'

// Routes
import scoreRoutes from './routes/scoreRoutes.js'
import imageRoutes from './routes/imageRoute.js'
import audioRoutes from './routes/audioRoute.js'

// import path, { dirname } from 'path'
// import { fileURLToPath } from 'url';
// import fs from 'fs'

// const __dirname = path.dirname(dirname(fileURLToPath(import.meta.url)))
// const audioPath = `${__dirname}/backend/audio/4`

// fs.readdir(audioPath, (err, filenames) => {
//     if (err) {
//         console.error(err)
//         return
//     } else {

//         filenames.forEach((item, idx) => {
//             const id = item.split(' - ')[0]
//             let originalName = `${audioPath}/${item}`
//             let newName = `${audioPath}/${id}.wav`
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

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))

// For JSON Data
app.use(json())
app.use(urlencoded({
    extended: false
}))



// Routes: (extension, routes)
app.use("/api/scores", scoreRoutes)
app.use('/image', imageRoutes)
app.use('/audio', audioRoutes)


// Port server is running on
const PORT = process.env.PORT || 5000
app.listen(PORT,
    () => console.log(`Server running on port ${PORT}`)
)



