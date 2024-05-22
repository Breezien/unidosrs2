import { Navigate } from 'react-router-dom';
import { fetchAuthSession, AuthSession } from 'aws-amplify/auth'
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import '@aws-amplify/ui-react/styles.css'
import "../../assets/apply.css";

function Account() {

  const [credentials, setCredentials] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthSession()
      .then(setCredentials)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);


  return (

    <>
      {loading ? (
        <>
          <Navbar page="account" />
          <p>Carregando...</p>
        </ >
      ) : !credentials?.userSub ? (
        <Navigate to={`/logar?redirect=conta`} replace />
      ) : (
        <>
          <Navbar page="account" />

          <main className="accountPage">
            <h1>Sua conta</h1>
            <div className="info">
              [description]
            </div>
          </main>
        </>
      )}
    </>
  );
}

export default Account;
