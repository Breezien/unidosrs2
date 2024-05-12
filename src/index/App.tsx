import { useEffect, useState } from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import '@aws-amplify/ui-react/styles.css'

const client = generateClient<Schema>();

function App() {
  const [places, setPlaces] = useState<Array<Schema["Places"]["type"]>>([]);

  useEffect(() => {
    client.models.Places.observeQuery().subscribe({
      next: (data) => setPlaces([...data.items]),
    });
  }, []);



  return (

    <main>
      <h1>Pontos de ajuda</h1>
      Esses são os pontos de ajuda cadastrados no sistema:
      <div>
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

  );
}

export default App;
