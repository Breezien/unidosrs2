import { useEffect, useState } from "react";
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { StorageImage } from '@aws-amplify/ui-react-storage';
import Navbar from "../../components/Navbar";
import '@aws-amplify/ui-react/styles.css';
import "../../assets/home.css";

const client = generateClient<Schema>();

function Home() {
  const [places, setPlaces] = useState<Array<Schema["Places"]["type"]>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const subscription = client.models.Places.observeQuery().subscribe({
      next: (data) => {
        setPlaces([...data.items]);
        setIsLoading(false);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <>
        <Navbar page="home" />
        <div>Carregando...</div>
      </>
    );
  }

  return (
    <>
      <Navbar page="home" />
      <main className="home">
        <h1>Pontos de ajuda</h1>
        <p>Esses são os pontos de ajuda cadastrados no sistema:</p>
        {places.map((place) => {
          const offers = typeof place.offers === 'string' ? JSON.parse(place.offers) : {};
          return (
            <div className="placeObj" key={place.id}>
              <StorageImage alt="place image" className="placeImage" path={`placePictures/${place.user}/1`} />
              <div className="placeDetails">
                <span className="placeName">{place.name}</span>
                <span className="placeAddress">{place.address}, <span className="placeZipcode">{place.zipcode}</span></span>
                <span className="placeType">Tipo: {place.type}</span>
                <span className="placeHours">Horario: {place.hours}</span>
                <span className="placeOffers">Oferece: {Object.entries(offers).filter(([key]) => offers[key] === 1).map(([key]) => key).join(', ')}</span>
              </div>
              <div className="descriptionContainer">
                <span className="placeDescription">Descricao: {place.description}</span>
              </div>
            </div>
          );
        })}
      </main>
    </>
  );
}

export default Home;
