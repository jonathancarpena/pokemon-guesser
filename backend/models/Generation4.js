import pkg from "mongoose"
const { Schema, model } = pkg


const Score = new Schema({
    day: {
        type: Date,
        required: false,
        default: Date.now()
    },
    score: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})


const Generation4Schema = new Schema({
    difficulty: {
        type: String,
        required: true
    },
    scores: {
        type: [Score],
        required: false,
    }
})

const Generation4 = model('generation4', Generation4Schema)
export default Generation4