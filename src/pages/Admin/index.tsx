import { fetchUserAttributes, FetchUserAttributesOutput } from 'aws-amplify/auth';
import { useState, useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import Navbar from '../../components/Navbar';

function Admin() {

    const [attributes, setAttributes] = useState<FetchUserAttributesOutput | null>(null);

    useEffect(() => {
      fetchUserAttributes().then(setAttributes).catch(console.error);
    }, []);
    
    if (!attributes) {
        return (
            <Authenticator>
                <script>window.location.reload()</script>
            </Authenticator>
        )
    }
    console.log(attributes);
    if(!(attributes.email == "eduardo.m.hartz@gmail.com" && attributes.email_verified == "true")) {
        return (
            <p>unauthorized</p>
        )
    }
    return (

        <>
            <Navbar page="admin" />
            <main className="admin">
                <h1>Admin Panel</h1>
                Esses são os pontos de ajuda cadastrados no sistema:

            </main>
        </>

    );

}

export default Admin;
