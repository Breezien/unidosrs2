import { useEffect, useState } from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

const client = generateClient<Schema>();

function App() {
  const [Places, setPlaces] = useState<Array<Schema["Places"]["type"]>>([]);

  useEffect(() => {
    client.models.Places.observeQuery().subscribe({
      next: (data) => setPlaces([...data.items]),
    });
  }, []);



  return (
        
    <Authenticator>
      {({ signOut }) => (
    <main>
      <h1>Aplicar um Lugar</h1>
      <div>
        Aqui voce pode fazer uma aplicacao para adicionar um ponto de ajuda (nao precisa ser seu!)
      </div>
      <button onClick={signOut}>Sign out</button>
    </main>  
      )}
      </Authenticator>
  );
}

export default App;
