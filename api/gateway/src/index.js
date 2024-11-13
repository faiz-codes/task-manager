require('./utils/supertokens');
const { ApolloGateway, IntrospectAndCompose, RemoteGraphQLDataSource } = require('@apollo/gateway');
const { ApolloServer } = require('@apollo/server')
const express = require('express');
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require('cors');
const supertokens = require('supertokens-node');
const { middleware } = require("supertokens-node/framework/express");
const { verifySession } = require("supertokens-node/recipe/session/framework/express");
const handleAuth = require('./utils/handleauth');

const taskApiUrl = process.env.TASK_API_URL || 'http://localhost:4001';
const userApiUrl = process.env.USER_API_URL || 'http://localhost:4002';

const startServer = async () => {
  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        { name: "tasks", url: taskApiUrl },
        { name: "users", url: userApiUrl },
      ]
    }),
    buildService({ name, url }) {
      return new RemoteGraphQLDataSource({
        url,
        willSendRequest({ request, context }) {
          request.http.headers.set('user-id', context.userId);
          request.http.headers.set('permissions', context.permissions);
          request.http.headers.set('roles', context.roles);
        }
      });
    },
  });

  const server = new ApolloServer({
    gateway,
    subscriptions: false
  });
  await server.start();
  
  const app = express();
  app.use(cors({
    origin: "*",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  }));

  // This exposes all the APIs from SuperTokens to the client.
  app.use(middleware());

  // An example API that requires session verification
  app.get("/sessioninfo", verifySession(), async (req, res) => {
      let session = req.session;
      res.send({
          sessionHandle: session && session.getHandle(),
          userId: session && session.getUserId(),
          accessTokenPayload: session && session.getAccessTokenPayload(),
      });
  });

  app.use('/graphql', express.json(), expressMiddleware(server, {context: await handleAuth}));

  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000`);
  return { server, app };
};

startServer();
