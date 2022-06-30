import path, { dirname } from 'path'
import { fileURLToPath } from 'url';
import fs from 'fs'



const __dirname = path.dirname(dirname(fileURLToPath(import.meta.url)))
const imageFolder = `${__dirname}/images`


export const get_Image = async (req, res) => {
    const { generation, id } = req.params

    try {
        const imgPath = `${imageFolder}/${generation}/${id}.png`
        const img = fs.readFileSync(imgPath)
        // console.log(generation, id)
        //response header, use set
        res.set('Content-Type', 'image/png')
        res.send(img)
    } catch (e) {
        res.status(404)
    }
}