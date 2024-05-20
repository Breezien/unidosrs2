import '@aws-amplify/ui-react/styles.css';
import Navbar from '../../components/Navbar';
import { Authenticator } from '@aws-amplify/ui-react'
import { Navigate, useLocation } from 'react-router-dom';

function Login() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const redirect = queryParams.get('redirect');
    const returnUrl = redirect || '';
  
    return (
      <>
        <Navbar page="other" />
        <Authenticator>
          <Navigate to={`/${returnUrl}`} replace />
        </Authenticator>
      </>
    );
  }
  
  export default Login;