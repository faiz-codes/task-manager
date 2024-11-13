const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const schema = require('./graphql/schema');

const server = new ApolloServer({
  schema,
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    context: async ({ req, res }) => ({
      ...req.headers,
    }),
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at ${url}`);
})();