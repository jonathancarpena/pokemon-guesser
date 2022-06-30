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


const GenerationSchema = new Schema({
    difficulty: {
        type: String,
        required: true
    },
    scores: {
        type: [Score],
        required: false,
    }
})

const Generation7 = model('generation7', GenerationSchema)
export default Generation7