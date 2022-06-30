// Router
import { Routes, Route, useLocation } from 'react-router-dom'

// Pages
import Home from './pages/home'
import Generation from './pages/generation'
import Difficulty from './pages/generation/difficulty';
import Game from './pages/generation/game'
import Results from './pages/generation/game/results';
import Incomplete from './pages/generation/game/incomplete';
import GenerationRankings from './pages/generation/rankings';
import NotFound from './pages/404'

// Components
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';

const AnimatedRoutes = () => {
  const location = useLocation()

  function generateKey(current) {
    let key;
    if (current.pathname.includes('game')) {
      key = current.key
    } else {
      key = current.pathname
    }
    return key
  }
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={generateKey(location)}>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/generation/:num' element={<Generation />} />
        <Route exact path='/generation/:num/difficulty' element={<Difficulty />} />
        <Route exact path='/generation/:num/:difficulty/game' element={<Game />} />
        <Route exact path='/generation/:num/:difficulty/game/results' element={<Results />} />
        <Route exact path='/generation/:num/:difficulty/game/incomplete' element={<Incomplete />} />
        <Route exact path='/generation/:generation/rankings' element={<GenerationRankings />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
