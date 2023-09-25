import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css';
import Home from './pages/Home'
import Movie from './pages/Movie'
import Search from './pages/Search'
import { NavbarProvider } from './NavbarContext';

function App() {
  return (
    <>
      <Router>
        <NavbarProvider>
          <Routes>
               <Route path='/' element={<Home/>} />
               <Route path='/movie/:movieId' element={<Movie/>} />
               <Route path="/search" element={<Search />} />
          </Routes>
        </NavbarProvider>
      </Router>
    </>
  );
}

export default App;
