import React, {useEffect, useState}from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repos,setRepos] = useState([]);

  useEffect(() => {
    api.get('/repositories')
      .then(response => {
        setRepos(response.data);
      })
  },[]);

  async function handleAddRepository() {
    // TODO
    const newRepo = {
      title: Date.now(), 
      url: 'https://github.com/luisselenko/teste',
      techs: [
        'NodeJS',
        'React Native',
        'React JS'
      ]
    }

    const response = await api.post('/repositories',newRepo);

    setRepos([...repos,response.data]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`/repositories/${id}`);

    let auxRepos = repos.filter(repo => repo.id !== id);

    setRepos(auxRepos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repo => (
          <li key={repo.id}>{repo.title}
            <button key={repo.id} onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
