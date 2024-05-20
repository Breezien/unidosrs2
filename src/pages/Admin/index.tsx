import { fetchUserAttributes, FetchUserAttributesOutput } from 'aws-amplify/auth';
import { useState, useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react'
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import '@aws-amplify/ui-react/styles.css'
import Navbar from '../../components/Navbar';
import { StorageImage } from '@aws-amplify/ui-react-storage';
import "../../assets/admin.css";

function Admin() {

    const client = generateClient<Schema>();

    const [attributes, setAttributes] = useState<FetchUserAttributesOutput | null>(null);
    const [placeRequests, setPlaces] = useState<Array<Schema["PlaceRequests"]["type"]>>([]);

    useEffect(() => {
        fetchUserAttributes().then(setAttributes).catch(console.error);
    }, []);

    useEffect(() => {
        client.models.PlaceRequests.list({ authMode: "userPool" })
            .then(data => {
                setPlaces([...data.data]);
            })
            .catch(error => console.error(error));
    }, [client.models.PlaceRequests]);

    if (!attributes) {
        return (
            <Authenticator>
                <script>window.location.reload()</script>
            </Authenticator>
        )
    }

    if (!(attributes.email == "eduardo.m.hartz@gmail.com" && attributes.email_verified == "true")) {
        return (
            <p>unauthorized</p>
        )
    }

    function approve(id: string) {
        const placeRequest = placeRequests.find(place => place.id === id);
        if (!placeRequest) {
            return;
        }
        client.models.Places.create(
            {
                name: placeRequest.name,
                address: placeRequest.address,
                zipcode: placeRequest.zipcode,
                description: placeRequest.description,
                offers: placeRequest.offers,
                type: placeRequest.type,
                cnpj: placeRequest.cnpj,
                user: placeRequest.user,
                hours: placeRequest.hours,
            },
            {
                authMode: 'userPool',
            }
        ).then(() => {
            client.models.PlaceRequests.delete({ id: id }, { authMode: 'userPool' })
        });
    }

    function deny(id: string) {
        client.models.PlaceRequests.delete({ id: id }, { authMode: 'userPool' });
    }

    return (

        <>
            <Navbar page="admin" />
            <main className="admin">
                <h1>Painel Admin</h1>
                <div className="wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>CEP</th>
                                <th>Endereço</th>
                                <th>Descricao</th>
                                <th>Oferece</th>
                                <th>Foto</th>
                                <th>Aprovar?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {placeRequests.map((place) => {
                                const offers = typeof place.offers === 'string' ? JSON.parse(place.offers) : {};
                                return (
                                    <tr key={place.id}>
                                        <td>{place.name}</td>
                                        <td>{place.zipcode}</td>
                                        <td>{place.address}</td>
                                        <td>{place.description}</td>
                                        <td>
                                            {Object.entries(offers).filter(([key]) => offers[key] === 1).map(([key]) => key).join(', ')}
                                        </td>
                                        <td><StorageImage alt="place image" width="50px" path={`placePictures/${place.user}/1`} /></td>
                                        <td><a onClick={() => approve(place.id)}>Sim</a><a onClick={() => deny(place.id)}>Nao</a></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

            </main>
        </>

    );

}

export default Admin;
