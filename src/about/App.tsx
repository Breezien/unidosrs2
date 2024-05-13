import { Link } from "react-router-dom";
import '@aws-amplify/ui-react/styles.css'
import "../global.css";

function About() {

  return (

    <>
      <div className="navbar">
        <Link to="/"><button className="navbtn">Pontos de Ajuda</button></Link>
        <Link to="/aplicar"><button className="navbtn">Aplicar</button></Link>
        <Link to="/sobre"><button className="navbtn selected">Sobre</button></Link>
      </div>
      <main className="sobre">
        <h1>Sobre</h1>
        Esses são os pontos de ajuda cadastrados no sistema:

      </main>
    </>

  );
}

export default About;
