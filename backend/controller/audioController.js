import path, { dirname } from 'path'
import { fileURLToPath } from 'url';
import fs from 'fs'

const __dirname = path.dirname(dirname(fileURLToPath(import.meta.url)))
const audioFolder = `${__dirname}/audio`


export const get_Audio = async (req, res) => {
    const { generation, id } = req.params

    try {
        const audioPath = `${audioFolder}/${generation}/${id}.wav`
        const audio = fs.readFileSync(audioPath)
        //response header, use set
        // res.set('Content-Type', 'image/png')
        res.send(audio)
    } catch (e) {
        res.status(404)
    }
}