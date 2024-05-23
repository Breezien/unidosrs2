import '@aws-amplify/ui-react/styles.css';
import Navbar from '../../components/Navbar';

function Unknown() {
  return (
    <>
      <Navbar page="about" />
      <p>Erro 404: Pagina nao encontrada</p>
    </>
  );
}

export default Unknown;
