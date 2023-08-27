const gitHubQuery = (
  pageCount,
  queryString,
  paginationKeyword,
  paginationString
) => {
  return {
    query: `
    {
      viewer {
        name
      }
      search(
        query: "${queryString} user:planetoftheweb sort:updated-desc"
        type: REPOSITORY
        ${paginationKeyword}: ${pageCount},
        ${paginationString},
      ) {
        repositoryCount
        edges { 
          cursor
          node {
            ... on Repository {
              name
              description
              id
              url
              licenseInfo {
                spdxId
              }
              viewerSubscription
            }
          }

        }
        pageInfo{
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
      `,
  };
};

export default gitHubQuery;
