const { buildSubgraphSchema } = require('@apollo/subgraph');
const { taskTypeDefs, boardTypeDefs } = require("./typedefs");
const { taskResolvers, boardResolvers } = require("./resolvers");

module.exports = buildSubgraphSchema([
  { typeDefs: taskTypeDefs, resolvers: taskResolvers },
  { typeDefs: boardTypeDefs, resolvers: boardResolvers },
]);
