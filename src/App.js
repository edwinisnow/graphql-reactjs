import gitHub from './db.js';
import { useState, useEffect } from 'react';
import gitHubQuery from './Query';

function App() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetch(gitHub.baseURL, {
      method: 'POST',
      headers: gitHub.headers,
      body: JSON.stringify(gitHubQuery),
    })
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.data.viewer.name);
        console.log(data);
      })
      .catch((err) => console.log(err));

    return () => {};
  }, []);

  return (
    <div className='App container mt-5'>
      <h1 className='text-primary'>
        <i className='bi bi-diagram-2-fill'></i>Repos
      </h1>
      <p>Hey there {username}</p>
    </div>
  );
}

export default App;
