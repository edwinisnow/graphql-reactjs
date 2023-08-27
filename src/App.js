import gitHub from './db.js';
import { useState, useEffect, useCallback, useRef } from 'react';
import gitHubQuery from './Query';
import RepoInfo from './RepoInfo.js';

function App() {
  const [username, setUsername] = useState('');
  const [repoList, setRepoList] = useState(null);
  const [pageCount, setPageCount] = useState(10);
  const [queryString, setQueryString] = useState('slides');
  const [totalCount, setTotalCount] = useState(null);

  const effectRan = useRef(false);

  const fetchData = useCallback(() => {
    const queryText = JSON.stringify(gitHubQuery(pageCount, queryString));
    fetch(gitHub.baseURL, {
      method: 'POST',
      headers: gitHub.headers,
      body: queryText,
    })
      .then((response) => response.json())
      .then((data) => {
        const viewer = data.data.viewer;
        const repos = data.data.search.nodes;
        const total = data.data.search.repositoryCount;
        setUsername(viewer.name);
        setRepoList(repos);
        setTotalCount(total);
      })
      .catch((err) => console.log(err));
  }, [pageCount, queryString]);

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
      <p>
        <b>Search for: </b>
        {queryString} | <b>Items per page: </b>
        {pageCount} | <b>Total results: </b>
        {totalCount}
      </p>
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
