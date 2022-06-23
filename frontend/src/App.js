// Router
import { Routes, Route, useLocation } from 'react-router-dom'

// Pages
import Home from './pages/home'
import Generation from './pages/generation'
import Difficulty from './pages/generation/difficulty';
import Game from './pages/generation/game'
import Results from './pages/generation/game/results';
import Incomplete from './pages/generation/game/incomplete';
import GenerationRankings from './pages/rankings/generation';
import NotFound from './pages/404'


function App() {
  const location = useLocation()

  return (
    <Routes location={location} key={location.pathname}>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/generation/:num' element={<Generation />} />
      <Route exact path='/generation/:num/difficulty' element={<Difficulty />} />
      <Route exact path='/generation/:num/:difficulty/game' element={<Game />} />
      <Route exact path='/generation/:num/:difficulty/game/results' element={<Results />} />
      <Route exact path='/generation/:num/:difficulty/game/incomplete' element={<Incomplete />} />
      <Route exact path='/rankings/generation/:generation' element={<GenerationRankings />} />
      <Route path='*' element={<NotFound />} />
    </Routes>

  );
}

export default App;
