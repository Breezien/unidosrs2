import '@aws-amplify/ui-react/styles.css';
import Navbar from '../../components/Navbar';

function About() {
  return (
    <>
      <Navbar page="about" />
      <main className="sobre">
        <h1>Sobre</h1>
        Esses são os pontos de ajuda cadastrados no sistema:
      </main>
    </>
  );
}

export default About;
