import gitHub from './db.js';
import { useState, useEffect, useCallback, useRef } from 'react';
import gitHubQuery from './Query';
import RepoInfo from './RepoInfo.js';

function App() {
  const [username, setUsername] = useState('');
  const [repoList, setRepoList] = useState(null);

  const effectRan = useRef(false);

  const fetchData = useCallback(() => {
    fetch(gitHub.baseURL, {
      method: 'POST',
      headers: gitHub.headers,
      body: JSON.stringify(gitHubQuery),
    })
      .then((response) => response.json())
      .then((data) => {
        const viewer = data.data.viewer;
        const repos = data.data.search.nodes;
        setUsername(viewer.name);
        // setRepoList(viewer.repositories.nodes);
        setRepoList(repos);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (effectRan.current === false) {
      fetchData();
      return () => {
        effectRan.current = true;
      };
    }
  }, [fetchData]);

  return (
    <div className='App container mt-5'>
      <h1 className='text-primary'>
        <i className='bi bi-diagram-2-fill'></i>Repos
      </h1>
      <p>Hey there {username}</p>
      {repoList && (
        <ul className='list-group list-group-flush'>
          {repoList.map((repo) => (
            <RepoInfo key={repo.id} repo={repo} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
