import { Link } from 'react-router-dom';
import '@aws-amplify/ui-react/styles.css';

interface NavbarProps {
  page: 'home' | 'apply' | 'about' | 'admin' | 'account' | 'other';
}

function Navbar({ page }: NavbarProps) {
  
    return (
      <div className="navbar">
        <Link to="/">
          <button className={`navbtn ${page === 'home' ? 'selected' : ''}`}>Pontos de Ajuda</button>
        </Link>
        <Link to="/aplicar">
          <button className={`navbtn ${page === 'apply' ? 'selected' : ''}`}>Aplicar</button>
        </Link>
        <Link to="/sobre">
          <button className={`navbtn ${page === 'about' ? 'selected' : ''}`}>Sobre</button>
        </Link>
          <Link to="/conta">
          <button className={`navbtn account ${page === 'account' ? 'selected' : ''}`}>
            <img src="/account.svg" alt="Account" />
          </button>
          </Link>
      </div>
    );
  }

export default Navbar;