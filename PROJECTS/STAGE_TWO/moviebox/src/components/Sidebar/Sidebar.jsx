import React from 'react';
import { NavLink } from 'react-router-dom';
import logoimg from '../../assets/Logo.png';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <>
      <div className='sidebarContainer'>
        <div className='logoimg'>
          <NavLink to="/" > 
            <img src={logoimg} alt='logo' />
          </NavLink>
        </div>
        <div className='sidebarLinks'>
          <NavLink to="/" className="sidebar-navlink" > 
            <li><i className="fa-solid fa-house"></i>Home</li>
          </NavLink>
          <NavLink to="/movie" className="sidebar-navlink" > 
            <li><i className="fa-solid fa-clapperboard"></i>Movies</li>
          </NavLink>
          <NavLink to="/" className="sidebar-navlink" >
            <li><i className="fa-solid fa-tv"></i>TV Series</li>
          </NavLink>
          <NavLink to="/" className="sidebar-navlink" > 
            <li><i className="fa-solid fa-calendar-days"></i>Upcoming</li>
          </NavLink>
          <div className='playQuiz'>
            <h3>Play movie quizzes and earn free tickets</h3>
            <p>50k people are playing now</p>
            <button>Start playing</button>
          </div>
          <NavLink to="/" className='sidebar-navlink' > 
            <li><i className="fa-solid fa-right-from-bracket"></i>Log out</li>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
