import { Link, useLocation } from 'react-router-dom';
import { ArrowLeftRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <ArrowLeftRight className="header-logo-icon" />
          <span className="header-logo-text">UnitConvert</span>
        </Link>
        <nav className="header-nav">
          <Link to="/" className="header-nav-link">Home</Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;
