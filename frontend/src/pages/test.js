import { useState } from 'react'

function Test() {
    const [gen, setGen] = useState(1)
    const [id, setId] = useState(1)
    const [imgSrc, setImgSrc] = useState('')
    function handleSubmit(e) {
        e.preventDefault()
        setImgSrc(`/pokemon/${gen}/${id}.png`)
    }
    return (
        <div>

            <form onSubmit={handleSubmit} className='flex flex-col space-y-2'>
                <label>
                    Generation

                    <input
                        value={gen}
                        onChange={(e) => setGen(e.target.value)}
                    />
                </label>
                <label>
                    Pokedex

                    <input
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </label>

                <button className='bg-blue-500 text-white py-3'>Submit</button>
            </form>

            <img src={imgSrc} alt={imgSrc} />
        </div>
    )
}

export default Test