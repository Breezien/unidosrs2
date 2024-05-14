import { Authenticator } from '@aws-amplify/ui-react'
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { StorageManager } from '@aws-amplify/ui-react-storage';
import { fetchAuthSession, AuthSession } from 'aws-amplify/auth'
import { useState, useEffect } from 'react';
import '@aws-amplify/ui-react/styles.css'
import { Link } from "react-router-dom";
import "./apply.css";
import "../global.css";

const client = generateClient<Schema>();

function Apply() {

  const [credentials, setCredentials] = useState<AuthSession | null>(null);

  useEffect(() => {
    fetchAuthSession().then(setCredentials).catch(console.error);
  }, []);

  function applyPlace(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const allOffers = [
      'Abrigo',
      'Refeições',
      'Agua',
      'Alimentos',
      'Produtos de limpeza',
      'Produtos de higiene pessoal',
      'Alimentos para gatos',
      'Alimentos para caes',
      'Moveis',
      'Eletrodomesticos',
      'Roupas para mulheres',
      'Roupas para homens',
      'Roupas para crianças',
      'Brinquedos',
      'Outras bebidas nao alcoolicas'
    ];

    const offers = allOffers.reduce((acc, offer) => {
      acc[offer] = formData.getAll('offers').includes(offer) ? 1 : 0;
      return acc;
    }, {} as Record<string, number>);

    const offersString = JSON.stringify(offers);

    client.models.PlaceRequests.create(
      {
        name: formData.get('name') as string,
        address: formData.get('address') as string,
        zipcode: formData.get('zipcode') as string,
        description: formData.get('description') as string,
        offers: offersString,
        type: formData.get('type') as string,
        cnpj: formData.get('cnpj') as string,
        user: credentials?.identityId || 'unknown',
        hours: formData.get('hours') as string,
      },
      {
        authMode: 'userPool',
      }
    )
      .then(response => {
        console.log('Item created successfully', response);
      })
      .catch(error => {
        console.error('Error creating item', error);
      });
    console.log('applyPlace is being called');
  }
  return (

    <Authenticator>
      {({ signOut }) => (

        <>

          <div className="navbar">
            <Link to="/"><button className="navbtn">Pontos de Ajuda</button></Link>
            <Link to="/aplicar"><button className="navbtn selected">Aplicar</button></Link>
            <Link to="/sobre"><button className="navbtn">Sobre</button></Link>
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
                  <input type="text" name="name" required/>
                </div>
                <div className="inputField">
                  <label>Endereco</label>
                  <input type="text" name="address" required/>
                </div>
                <div className="inputField">
                  <label>CEP</label>
                  <input type="text" name="zipcode" required/>
                </div>
                <div className="inputField">
                  <label>CNPJ</label>
                  <input type="text" name="cnpj" required/>
                </div>
                <div className="inputField">
                  <label>Tipo (Publico/Privado)</label>
                  <input type="text" name="type" required/>
                </div>
                <div className="inputField">
                  <label>Horario</label>
                  <input type="text" name="hours" required/>
                </div>
                <label>Descricao</label>
                <textarea name="description" required></textarea>

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
                {credentials && (
                  <StorageManager
                    acceptedFileTypes={['image/*']}
                    path={`placePictures/${credentials.identityId}/`}
                    maxFileCount={5}
                    isResumable
                    autoUpload={false}
                    displayText={{
                      getFilesUploadedText(count) {
                        return `${count} ${count === 1 ? 'archivo carregado' : 'archivos carregados'
                          }`;
                      },
                      getPausedText(percentage) {
                        return `Pausado: ${percentage}%`;
                      },
                      getFileSizeErrorText(sizeText) {
                        return `O tamanho da imagem deve ser menor do que ${sizeText}`;
                      },
                      getRemainingFilesText(count) {
                        return `${count} ${count === 1 ? 'archivo' : 'archivos'} restantes`;
                      },
                      getUploadingText(percentage) {
                        return `Fazendo upload... ${percentage > 0 ? `: ${percentage}%` : ''}`;
                      },
                      getUploadButtonText(count) {
                        return `Carregar ${count} ${count === 1 ? 'archivo' : 'archivos'}`;
                      },
                      doneButtonText: 'Fazer upload',
                      uploadSuccessfulText: 'Upload feito com sucesso',
                      pauseButtonText: 'Pausar',
                      resumeButtonText: 'Resumir',
                      clearAllButtonText: 'Remover todos',
                      extensionNotAllowedText: 'Voce so pode enviar imagens!',
                      dropFilesText: 'Coloque as imagens aqui',
                      browseFilesText: 'Buscar imagens',
                    }}
                  />
                )}
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
