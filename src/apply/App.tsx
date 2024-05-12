import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

function App() {

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
