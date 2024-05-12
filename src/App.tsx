import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
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
      <h1>Lugares</h1>
      <ul>
        {Places.map((place) => (
          <li key={place.id}>{place.name} - {place.zipcode}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://next-release-dev.d1ywzrxfkb9wgg.amplifyapp.com/react/start/quickstart/vite-react-app/#step-2-add-delete-to-do-functionality">
          Review next step of this tutorial.
        </a>
      </div>
      <button onClick={signOut}>Sign out</button>
    </main>  
      )}
      </Authenticator>
  );
}

export default App;
