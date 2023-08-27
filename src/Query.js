const gitHubQuery = {
  query: `
  {
    viewer {
      name
    }
    search(
      query: "tutorial user:planetoftheweb sort:updated-desc"
      type: REPOSITORY
      first: 20
    ) {
      nodes {
        ... on Repository {
          name
          description
          id
          url
          viewerSubscription
        }
      }
    }
  }
    `,
};

export default gitHubQuery;
