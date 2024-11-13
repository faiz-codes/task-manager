const { buildSubgraphSchema } = require('@apollo/subgraph');
const { userTypeDefs, boardTypeDefs } = require("./typedefs");
const { userResolvers, boardResolvers } = require("./resolvers");

module.exports = buildSubgraphSchema([
  { typeDefs: userTypeDefs, resolvers: userResolvers },
  // { typeDefs: boardTypeDefs, resolvers: boardResolvers },
]);
