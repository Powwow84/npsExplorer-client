import { useState } from 'react';
import { Link } from 'react-router-dom';
import Hamburger from 'hamburger-react';

export default function Header() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="header">
      <div className='bar'>
      {!isOpen && <p>NPS Explorer</p>}
      <Hamburger toggled={isOpen} toggle={setOpen} direction="left"/>
      {isOpen && (
        <div className="menu">
          <Link to="/" className="navIcon" >
            Home
          </Link>
          <Link to="/destinations" className="navIcon" >
            Destinations
          </Link>
          <Link to="/users/profile" className="navIcon" >
            Profile
          </Link>
        </div>
      )}
      </div>
      <div className='largeHeader'>
        <div>
        <p>NPS Explorer</p>
        </div>
        <div className="menu">
          <Link to="/" className="navIcon" >
            Home
          </Link>
          <Link to="/destinations" className="navIcon" >
            Destinations
          </Link>
          <Link to="/users/profile" className="navIcon" >
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
}