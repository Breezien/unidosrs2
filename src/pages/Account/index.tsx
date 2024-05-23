import { Navigate } from 'react-router-dom';
import { getCurrentUser, signOut, AuthUser } from 'aws-amplify/auth'
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import '@aws-amplify/ui-react/styles.css'
import "../../assets/apply.css";

function Account() {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);


  useEffect(() => {
    checkUser()
      .finally(() => setLoading(false));
  }, []);

  async function checkUser() {
    try {
      setUser(await getCurrentUser());
    } catch {
    }
  }

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };


  return (

    <>
      {loading ? (
        <>
          <Navbar page="account" />
          <p>Carregando...</p>
        </ >
      ) : !user ? (
        <Navigate to={`/logar?redirect=conta`} replace />
      ) : (
        <>
          <Navbar page="account" />

          <main className="accountPage">
            <div className="info">
              <h1>Sua conta</h1>
              <p>Email: {user?.signInDetails?.loginId}</p>
              <button onClick={handleSignOut}>Deslogar</button>
            </div>
          </main>
        </>
      )}
    </>
  );
}

export default Account;
