import { useEffect, useState } from "react";
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { StorageImage } from '@aws-amplify/ui-react-storage';
import Navbar from "../../components/Navbar";
import '@aws-amplify/ui-react/styles.css'
import "../../assets/home.css";


const client = generateClient<Schema>();

function Home() {
  const [places, setPlaces] = useState<Array<Schema["Places"]["type"]>>([]);

  useEffect(() => {
    client.models.Places.observeQuery().subscribe({
      next: (data) => setPlaces([...data.items]),
    });
  }, []);



  return (

    <>
      <Navbar page="home" />
      <main className="home">
        <h1>Pontos de ajuda</h1>
        Esses são os pontos de ajuda cadastrados no sistema:
        {places.map((place) => {
          const offers = typeof place.offers === 'string' ? JSON.parse(place.offers) : {};
          return (
            <div className="placeObj">
              <StorageImage alt="place image" className="placeImage" path={`placePictures/${place.user}/1`} />
              <span className="placeName">{place.name}</span>
              <span className="placeAddress">{place.address}, <span className="placeZipcode">{place.zipcode}</span></span>
              <span className="placeType">Tipo: {place.type}</span>
              <span className="placeHours"> Horario: {place.hours}</span>
              <span className="placeOffers">Oferece: {Object.entries(offers).filter(([key]) => offers[key] === 1).map(([key]) => key).join(', ')}</span>
              <span className="placeDescription">Descricao: {place.description}</span>  
            </div>
          );
        })}
      </main>
    </>

  );
}

export default Home;
