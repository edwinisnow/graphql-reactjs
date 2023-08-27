import gitHub from './db.js';
import { useState, useEffect, useCallback, useRef } from 'react';
import gitHubQuery from './Query';
import RepoInfo from './RepoInfo.js';
import SearchBox from './SearchBox.js';

function App() {
  const [username, setUsername] = useState('');
  const [repoList, setRepoList] = useState(null);
  const [pageCount, setPageCount] = useState(10);
  const [queryString, setQueryString] = useState('');
  const [totalCount, setTotalCount] = useState(null);
  const [startCursor, setStartCursor] = useState(null);
  const [endCursor, setEndCursor] = useState(null);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [paginationKeyword, setPaginationKeyword] = useState('first');
  const [paginationString, setPaginationString] = useState('');

  const effectRan = useRef(false);

  const fetchData = useCallback(() => {
    const queryText = JSON.stringify(
      gitHubQuery(pageCount, queryString, paginationKeyword, paginationString)
    );
    fetch(gitHub.baseURL, {
      method: 'POST',
      headers: gitHub.headers,
      body: queryText,
    })
      .then((response) => response.json())
      .then((data) => {
        const viewer = data.data.viewer;
        const repos = data.data.search.edges;
        const total = data.data.search.repositoryCount;
        const start = data.data.search.pageInfo?.startCursor;
        const end = data.data.search.pageInfo?.endCursor;
        const next = data.data.search.pageInfo?.hasNextPage;
        const prev = data.data.search.pageInfo?.hasPreviousPage;

        setUsername(viewer.name);
        setRepoList(repos);
        setTotalCount(total);
        setStartCursor(start);
        setEndCursor(end);
        setHasPreviousPage(prev);
        setHasNextPage(next);
      })
      .catch((err) => console.log(err));
  }, [pageCount, queryString, paginationString, paginationKeyword]);

  useEffect(() => {
    fetchData();
    // if (effectRan.current === false) {
    //   fetchData();
    //   return () => {
    //     effectRan.current = true;
    //   };
    // }
  }, [fetchData]);

  return (
    <div className='App container mt-5'>
      <h1 className='text-primary'>
        <i className='bi bi-diagram-2-fill'></i>Repos
      </h1>
      <p>Hey there {username}</p>
      <SearchBox
        totalCount={totalCount}
        pageCount={pageCount}
        queryString={queryString}
        onTotalChange={(myCount) => {
          setPageCount(myCount);
        }}
        onQueryChange={(myString) => {
          setQueryString(myString);
        }}
      />
      {/* <p>
        <b>Search for: </b>
        {queryString} | <b>Items per page: </b>
        {pageCount} | <b>Total results: </b>
        {totalCount}
      </p> */}
      {repoList && (
        <ul className='list-group list-group-flush'>
          {repoList.map((repo) => (
            <RepoInfo key={repo.node.id} repo={repo.node} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
