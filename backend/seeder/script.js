import dotenv from "dotenv"
dotenv.config()

// Models
import Gen1 from '../models/Generation1.js'
import Gen2 from '../models/Generation2.js'
import Gen3 from '../models/Generation3.js'
import Gen4 from '../models/Generation4.js'

// Sample Data
import defaultScores from './data.js'

// MongoDB Connect
import connectDB from '../config/db.js'

connectDB()


// Deletes Everything in Database
// Inputs default Data
const importData = async () => {

    try {
        // Deletes Everything
        console.log('CLEARING DB')
        await Gen1.deleteMany({})
        await Gen2.deleteMany({})
        await Gen3.deleteMany({})
        await Gen4.deleteMany({})

        console.log('INPUTTING DATA')
        await Gen1.insertMany([...defaultScores])
        await Gen2.insertMany([...defaultScores])
        await Gen3.insertMany([...defaultScores])
        await Gen4.insertMany([...defaultScores])

        console.log('Data Import Success')
        process.exit()
    } catch (error) {
        console.error("Error with data import", error)
        process.exit(1)
    }
}


importData()
