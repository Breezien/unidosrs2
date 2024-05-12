import { Authenticator } from '@aws-amplify/ui-react'
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import '@aws-amplify/ui-react/styles.css'
import { Link } from "react-router-dom";
import "./apply.css";
import "../global.css";

const client = generateClient<Schema>();

function Apply() {

  function applyPlace(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const zipcode = formData.get('zipcode') as string;
    const description = formData.get('description') as string;
    const offers = Array.from(formData.getAll('offers')) as string[];
    const type = formData.get('type') as string;
    const cnpj = formData.get('cnpj') as string;

    client.models.PlaceRequests.create({
      name: name,
      address: address,
      zipcode: zipcode,
      description: description,
      offers: offers,
      type: type,
      cnpj: cnpj,
    });
  }

  return (

    <Authenticator>
      {({ signOut }) => (

        <>

          <div className="navbar">
            <Link to="/"><button className="navbtn">Pontos de Ajuda</button></Link>
            <Link to="/aplicar"><button className="navbtn selected">Aplicar</button></Link>
            <Link to="/about"><button className="navbtn">Sobre</button></Link>
            <button onClick={signOut} className="navbtn account"><img src="/account.svg"></img></button>
          </div>


          <main className="apply">
            <h1>Aplicar um Lugar</h1>
            <div className="info">
              Aqui voce pode fazer uma aplicacao para adicionar um ponto de ajuda (nao precisa ser seu!)
            </div>
            <div className="formWrapper">
              <form className="formWrapper" onSubmit={applyPlace}>
                <div className="inputField">
                  <label>Nome</label>
                  <input type="text" name="name" />
                </div>
                <div className="inputField">
                  <label>Endereco</label>
                  <input type="text" name="address" />
                </div>
                <div className="inputField">
                  <label>CEP</label>
                  <input type="text" name="zipcode" />
                </div>
                <div className="inputField">
                  <label>CNPJ</label>
                  <input type="text" name="cnpj" />
                </div>
                <div className="inputField">
                  <label>Tipo</label>
                  <input type="text" name="type" />
                </div>
                <div className="inputField">
                  <label>Blank</label>
                  <input type="text" name="blank" />
                </div>
                <label>Descricao</label>
                <textarea name="description"></textarea>

                <div className="checkboxes">
                  <div>
                    <label><input type="checkbox" name="offers" /> Abrigo</label>
                  </div>
                  <div>
                    <label><input type="checkbox" name="offers" /> Refeições</label>
                  </div>
                  <div>
                    <label><input type="checkbox" name="offers" /> Agua</label>
                  </div>
                  <div>
                    <label><input type="checkbox" name="offers" /> Alimentos</label>
                  </div>
                  <div>
                    <label><input type="checkbox" name="offers" /> Produtos de limpeza</label>
                  </div>
                  <div>
                    <label><input type="checkbox" name="offers" /> Produtos de higiene pessoal</label>
                  </div>
                  <div>
                    <label><input type="checkbox" name="offers" /> Alimentos para gatos</label>
                  </div>
                  <div>
                    <label><input type="checkbox" name="offers" /> Alimentos para caes</label>
                  </div>
                  <div>
                    <label><input type="checkbox" name="offers" /> Moveis</label>
                  </div>
                  <div>
                    <label><input type="checkbox" name="offers" /> Eletrodomesticos</label>
                  </div>
                  <div>
                    <label><input type="checkbox" name="offers" /> Roupas para mulheres</label>
                  </div>
                  <div>
                    <label><input type="checkbox" name="offers" /> Roupas para homens</label>
                  </div>
                  <div>
                    <label><input type="checkbox" name="offers" /> Roupas para crianças</label>
                  </div>
                  <div>
                    <label><input type="checkbox" name="offers" /> Brinquedos</label>
                  </div>
                  <div>
                    <label><input type="checkbox" name="offers" /> Outras bebidas nao alcoolicas</label>
                  </div>
                </div>

                <button type="submit">Enviar</button>
              </form>
            </div>

          </main>
        </>
      )}
    </Authenticator>
  );
}

export default Apply;
