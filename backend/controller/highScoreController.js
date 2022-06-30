import Gen1 from '../models/Generation1.js'
import Gen2 from '../models/Generation2.js'
import Gen3 from '../models/Generation3.js'
import Gen4 from '../models/Generation4.js'
import Gen5 from '../models/Generation5.js'
import Gen6 from '../models/Generation6.js'
import Gen7 from '../models/Generation7.js'
import Gen8 from '../models/Generation8.js'

// Public Access
export const get_Scores = async (req, res) => {
    console.log('GET: High Scores')

    try {
        const gen1 = await Gen1.find()
        const gen2 = await Gen2.find()
        const gen3 = await Gen3.find()
        const gen4 = await Gen4.find()
        const gen5 = await Gen5.find()
        const gen6 = await Gen6.find()
        const gen7 = await Gen7.find()
        const gen8 = await Gen8.find()

        return res.status(200).json([...gen1, ...gen2, ...gen3, ...gen4, ...gen5, ...gen6, ...gen7, ...gen8])
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

export const get_ScoresByGeneration = async (req, res) => {
    console.log('GET: High Scores By Generation')

    const { generation } = req.params

    try {
        let scores;
        if (generation === '1') {
            scores = await Gen1.find()
        } else if (generation === '2') {
            scores = await Gen2.find()
        } else if (generation === '3') {
            scores = await Gen3.find()
        } else if (generation === '4') {
            scores = await Gen4.find()
        } else if (generation === '5') {
            scores = await Gen5.find()
        } else if (generation === '6') {
            scores = await Gen6.find()
        } else if (generation === '7') {
            scores = await Gen7.find()
        } else if (generation === '8') {
            scores = await Gen8.find()
        }

        return res.status(200).json(scores)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

export const get_ScoresByGenerationAndDifficulty = async (req, res) => {
    console.log('GET: High Scores By Generation and Difficulty')

    const { generation, difficulty } = req.params

    try {
        let scores;
        if (generation === '1') {
            scores = await Gen1.findOne({ difficulty })
        } else if (generation === '2') {
            scores = await Gen2.findOne({ difficulty })
        } else if (generation === '3') {
            scores = await Gen3.findOne({ difficulty })
        } else if (generation === '4') {
            scores = await Gen4.findOne({ difficulty })
        } else if (generation === '5') {
            scores = await Gen5.findOne({ difficulty })
        } else if (generation === '6') {
            scores = await Gen6.findOne({ difficulty })
        } else if (generation === '7') {
            scores = await Gen7.findOne({ difficulty })
        } else if (generation === '8') {
            scores = await Gen8.findOne({ difficulty })
        }

        return res.status(200).json(scores.scores)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

export const post_Score = async (req, res) => {
    console.log('POST: High Scores')

    const { difficulty, generation, name, score } = req.body
    let newScore = {
        score: score,
        name: name,
    }

    try {
        if (generation === '1') {
            let currentScores = await Gen1.findOne({ difficulty })
            let flag = false
            let oldScore;

            let updatedScores = []
            currentScores.scores.forEach((item, idx) => {
                oldScore = item
                if ((item.score > score) && !flag) {
                    console.log('NEW SCORE')
                    flag = true
                    updatedScores[idx] = newScore
                    updatedScores[idx + 1] = oldScore
                } else {
                    updatedScores.push(item)
                }
            })

            currentScores.scores = [...updatedScores.splice(0, 10)]
            await Gen1.findByIdAndUpdate(currentScores._id, currentScores)
            return res.status(200).json(currentScores)
        } else if (generation === '2') {
            let currentScores = await Gen2.findOne({ difficulty })
            let flag = false
            let oldScore;

            let updatedScores = []
            currentScores.scores.forEach((item, idx) => {
                oldScore = item
                if ((item.score > score) && !flag) {
                    console.log('NEW SCORE')
                    flag = true
                    updatedScores[idx] = newScore
                    updatedScores[idx + 1] = oldScore
                } else {
                    updatedScores.push(item)
                }
            })

            currentScores.scores = [...updatedScores.splice(0, 10)]
            await Gen2.findByIdAndUpdate(currentScores._id, currentScores)
            return res.status(200).json(currentScores)
        } else if (generation === '3') {
            let currentScores = await Gen3.findOne({ difficulty })
            let flag = false
            let oldScore;

            let updatedScores = []
            currentScores.scores.forEach((item, idx) => {
                oldScore = item
                if ((item.score > score) && !flag) {
                    console.log('NEW SCORE')
                    flag = true
                    updatedScores[idx] = newScore
                    updatedScores[idx + 1] = oldScore
                } else {
                    updatedScores.push(item)
                }
            })

            currentScores.scores = [...updatedScores.splice(0, 10)]
            await Gen3.findByIdAndUpdate(currentScores._id, currentScores)
            return res.status(200).json(currentScores)
        } else if (generation === '4') {
            let currentScores = await Gen4.findOne({ difficulty })
            let flag = false
            let oldScore;

            let updatedScores = []
            currentScores.scores.forEach((item, idx) => {
                oldScore = item
                if ((item.score > score) && !flag) {
                    console.log('NEW SCORE')
                    flag = true
                    updatedScores[idx] = newScore
                    updatedScores[idx + 1] = oldScore
                } else {
                    updatedScores.push(item)
                }
            })

            currentScores.scores = [...updatedScores.splice(0, 10)]
            await Gen4.findByIdAndUpdate(currentScores._id, currentScores)
            return res.status(200).json(currentScores)
        } else if (generation === '5') {
            let currentScores = await Gen5.findOne({ difficulty })
            let flag = false
            let oldScore;

            let updatedScores = []
            currentScores.scores.forEach((item, idx) => {
                oldScore = item
                if ((item.score > score) && !flag) {
                    console.log('NEW SCORE')
                    flag = true
                    updatedScores[idx] = newScore
                    updatedScores[idx + 1] = oldScore
                } else {
                    updatedScores.push(item)
                }
            })

            currentScores.scores = [...updatedScores.splice(0, 10)]
            await Gen5.findByIdAndUpdate(currentScores._id, currentScores)
            return res.status(200).json(currentScores)
        } else if (generation === '6') {
            let currentScores = await Gen6.findOne({ difficulty })
            let flag = false
            let oldScore;

            let updatedScores = []
            currentScores.scores.forEach((item, idx) => {
                oldScore = item
                if ((item.score > score) && !flag) {
                    console.log('NEW SCORE')
                    flag = true
                    updatedScores[idx] = newScore
                    updatedScores[idx + 1] = oldScore
                } else {
                    updatedScores.push(item)
                }
            })

            currentScores.scores = [...updatedScores.splice(0, 10)]
            await Gen6.findByIdAndUpdate(currentScores._id, currentScores)
            return res.status(200).json(currentScores)
        } else if (generation === '7') {
            let currentScores = await Gen7.findOne({ difficulty })
            let flag = false
            let oldScore;

            let updatedScores = []
            currentScores.scores.forEach((item, idx) => {
                oldScore = item
                if ((item.score > score) && !flag) {
                    console.log('NEW SCORE')
                    flag = true
                    updatedScores[idx] = newScore
                    updatedScores[idx + 1] = oldScore
                } else {
                    updatedScores.push(item)
                }
            })

            currentScores.scores = [...updatedScores.splice(0, 10)]
            await Gen7.findByIdAndUpdate(currentScores._id, currentScores)
            return res.status(200).json(currentScores)
        } else if (generation === '8') {
            let currentScores = await Gen8.findOne({ difficulty })
            let flag = false
            let oldScore;

            let updatedScores = []
            currentScores.scores.forEach((item, idx) => {
                oldScore = item
                if ((item.score > score) && !flag) {
                    console.log('NEW SCORE')
                    flag = true
                    updatedScores[idx] = newScore
                    updatedScores[idx + 1] = oldScore
                } else {
                    updatedScores.push(item)
                }
            })

            currentScores.scores = [...updatedScores.splice(0, 10)]
            await Gen8.findByIdAndUpdate(currentScores._id, currentScores)
            return res.status(200).json(currentScores)
        }


    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}


