// Uncomment for Develpment
// const BASE_API = 'http://localhost:5000/api'

const BASE_API = 'https://pokemon-guesser-web.herokuapp.com/api';

const urls = {
  audio: `/cries`,
  image: `/shape`,
  scores: `${BASE_API}/scores`,
  addScore: `${BASE_API}/scores/add`,
};

export default urls;
