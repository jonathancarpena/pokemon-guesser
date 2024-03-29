import React, { useEffect, useRef, useState } from 'react';

// Utilities
import { DIFFICULTY } from '../../../lib/constants';
import API from '../../../lib/api';

// Icons
import { FaRegQuestionCircle } from 'react-icons/fa';
import { AiFillSound } from 'react-icons/ai';

export const SingleSilhoutte = ({
  name,
  onAudioLoad = () => null,
  onImgLoad = () => null,
  random = false,
  correct = true,
  id,
  generation,
  shape = true,
  cry = true,
  idx,
  result = null,
}) => {
  const audioRef = useRef();
  const [soundOn, setSoundOn] = useState(false);

  function PokemonCry() {
    if (cry || correct) {
      audioRef.current.play();
      setSoundOn(true);
    }
  }

  return (
    <div
      onClick={PokemonCry}
      className={`${
        correct || cry ? 'active:scale-110' : ''
      }  w-[120px] h-[120px] relative cursor-pointer flex items-center justify-center transition-transform ease-linear duration-100 overflow-hidden`}>
      <div
        className={`
            ${
              result === null
                ? 'bg-white  opacity-40 '
                : `${
                    result === 'correct'
                      ? 'bg-green-400  opacity-90'
                      : 'bg-red-400  opacity-90'
                  }`
            }
            w-full h-full  absolute rounded-xl
            `}></div>
      {/* Pokedex ID */}
      {(!random || correct) && (
        <span className='border-[3px] w-[40px] h-[40px] absolute top-0 left-0 flex items-center justify-center   font-arcade font-semibold text-black border-black rounded-full'>
          <span className=''>{id}</span>
        </span>
      )}

      {/* Question Mark */}
      <FaRegQuestionCircle
        className={`
                ${correct ? 'opacity-0' : 'opacity-100'}
                ${shape ? 'text-white' : 'text-black'}
                absolute  text-[35px] 
                z-[20] top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%]
                transition-all ease-in-out duration-200
                `}
      />

      {/* Pokemon Cry Audio */}
      {(cry || correct) && (
        <>
          <audio
            onEnded={() => setSoundOn(false)}
            onLoadStart={onAudioLoad}
            ref={audioRef}
            src={`${API.audio}/${generation}/${id}.wav`}
          />
          {soundOn && (
            <AiFillSound
              className={`absolute text-[20px] z-[20] 
                             ${
                               correct
                                 ? 'top-[50%] -translate-y-[50%] text-white'
                                 : 'bottom-1 text-black'
                             }  left-[50%] -translate-x-[50%]
                             transition-all ease-in-out duration-200`}
            />
          )}
        </>
      )}

      {/* Pokemon Image & Name */}
      <span
        className={`
            relative
            ${
              correct
                ? `brightness-100`
                : `${!shape ? 'opacity-0' : 'opacity-100'} brightness-0`
            }
                
            transition-all ease-in-out duration-200 z-0 select-none
            `}>
        <img
          className='w-[80px] h-[80px] max-w-[80px] max-h-[80px] object-contain'
          onLoad={onImgLoad}
          src={`${API.image}/${generation}/${id}.png`}
          alt={`pokemon-order-${idx}`}
        />

        <span
          className={`${
            correct ? 'visible -bottom-5' : 'hidden'
          }  w-max absolute left-[50%] -translate-x-[50%] capitalize font-semibold`}>
          {name}
        </span>
      </span>
    </div>
  );
};

function Silhouttes({
  random,
  pokemons,
  guesses,
  difficulty,
  generation,
  setLoading,
  results = null,
}) {
  const [images, setImages] = useState(0);
  const [audios, setAudios] = useState(0);

  useEffect(() => {
    const totalPokemon = pokemons.length;

    if (DIFFICULTY[difficulty].cry && DIFFICULTY[difficulty].shape) {
      if (audios === totalPokemon && images === totalPokemon) {
        setLoading(false);
      }
    } else if (DIFFICULTY[difficulty].cry && !DIFFICULTY[difficulty].shape) {
      if (audios === totalPokemon) {
        setLoading(false);
      }
    } else if (!DIFFICULTY[difficulty].cry && DIFFICULTY[difficulty].shape) {
      if (images === totalPokemon) {
        setLoading(false);
      }
    } else if (difficulty === 'master') {
      setLoading(false);
    }
  }, [images, audios, pokemons.length, difficulty, setLoading]);

  function onAudioLoad() {
    setAudios((prevState) => prevState + 1);
  }

  function onImgLoad() {
    setImages((prevState) => prevState + 1);
  }

  return (
    <>
      {pokemons.map((item, idx) => (
        <SingleSilhoutte
          onImgLoad={onImgLoad}
          onAudioLoad={onAudioLoad}
          random={random}
          key={`${item}-${idx}`}
          cry={DIFFICULTY[difficulty].cry}
          shape={DIFFICULTY[difficulty].shape}
          generation={generation}
          id={item.id}
          name={item.name}
          correct={guesses ? guesses[idx] === '' : true}
          idx={idx}
          result={item.result ? item.result : null}
        />
      ))}
    </>
  );
}

export default Silhouttes;
