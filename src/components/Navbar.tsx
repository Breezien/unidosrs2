import { Link } from 'react-router-dom';
import { getCurrentUser } from '@aws-amplify/auth';
import '@aws-amplify/ui-react/styles.css';
import { useState, useEffect } from 'react';

interface NavbarProps {
  page: 'home' | 'apply' | 'about' | 'admin' | 'account' | 'other';
}

function Navbar({ page }: NavbarProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      checkUser();
    }, []);
  
    async function checkUser() {
      try {
        await getCurrentUser();
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      }
    }
  
    // const handleSignOut = async () => {
    //   try {
    //     await signOut();
    //     setIsLoggedIn(false);
    //   } catch (error) {
    //     console.error('Error signing out: ', error);
    //   }
    // };
  
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
        {isLoggedIn && (
          <Link to="/conta">
          <button className={`navbtn account ${page === 'account' ? 'selected' : ''}`}>
            <img src="/account.svg" alt="Account" />
          </button>
          </Link>
        )}
      </div>
    );
  }

export default Navbar;