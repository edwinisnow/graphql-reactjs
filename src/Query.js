const gitHubQuery = {
  query: `
  {
    viewer {
      name
    }
    search(
      query: "tutorial user:planetoftheweb sort:updated-desc"
      type: REPOSITORY
      first: 100
    ) {
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

export default gitHubQuery;
