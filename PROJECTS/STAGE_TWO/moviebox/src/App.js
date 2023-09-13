import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css';
import Home from './pages/Home'
import Movie from './pages/Movie'

function App() {
  return (
    <>
      <Router>
          <Routes>
               <Route path='/' element={<Home/>} />
               <Route path='/movie/:movieId
               ' element={<Movie/>} />
          </Routes>
      </Router>
    </>
  );
}

export default App;
