import { ArrowLeftRight } from 'lucide-react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <ArrowLeftRight className="footer-icon" />
          <span className="footer-name">UnitConvert</span>
        </div>
        <p className="footer-text">
          Fast, accurate unit conversions for everyday use.
        </p>
        <p className="footer-copyright">
          © {new Date().getFullYear()} UnitConvert. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
