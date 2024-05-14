import { useEffect, useState } from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Link } from "react-router-dom";
import '@aws-amplify/ui-react/styles.css'
import "./home.css";
import "../global.css";

const client = generateClient<Schema>();

function Home() {
  const [places, setPlaces] = useState<Array<Schema["Places"]["type"]>>([]);

  useEffect(() => {
    client.models.Places.observeQuery({ authMode: 'identityPool' }).subscribe({
      next: (data) => setPlaces([...data.items]),
    });
  }, []);



  return (

    <>
      <div className="navbar">
        <Link to="/"><button className="navbtn selected">Pontos de Ajuda</button></Link>
        <Link to="/aplicar"><button className="navbtn">Aplicar</button></Link>
        <Link to="/sobre"><button className="navbtn">Sobre</button></Link>
      </div>
      <main className="home">
        <h1>Pontos de ajuda</h1>
        Esses são os pontos de ajuda cadastrados no sistema:
        <div className="wrapper">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CEP</th>
                <th>Endereço</th>
                <th>Descricao</th>
                <th>Votos</th>
              </tr>
            </thead>
            <tbody>
              {places.map((place) => (
                <tr>
                  <td>{place.name}</td>
                  <td>{place.zipcode}</td>
                  <td>{place.address}</td>
                  <td>{place.description}</td>
                  <td>{place.upvotes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>
    </>

  );
}

export default Home;
