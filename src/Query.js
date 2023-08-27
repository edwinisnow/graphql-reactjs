const gitHubQuery = (pageCount, queryString) => {
  return {
    query: `
    {
      viewer {
        name
      }
      search(
        query: "${queryString} user:planetoftheweb sort:updated-desc"
        type: REPOSITORY
        first: ${pageCount}
      ) {
        repositoryCount
        nodes {
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
    }
      `,
  };
};

export default gitHubQuery;
