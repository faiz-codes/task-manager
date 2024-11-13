const { gql } = require('graphql-tag');

const typeDef = gql`
  type Board @key(fields: "id"){
    id: ID!
    title: String
    description: String
    color: String
    users: [User]
    tasks: [Task]!
    private: Boolean
  }

  extend type Query {
    """Fetch a board by it's id"""
    board(id: ID!): Board
    """Fetch all boards"""
    boards: [Board]
    """Fetch the boards that you are part of"""
    myBoards: [Board]
  }

  extend type Mutation {
    """Create a new board. You will be automatically added as the first user"""
    createBoard(title: String, description: String, color: String): Board!
    """Add users to a board. Users list is an Array of their SuperToken IDs"""
    addUsersToBoard(boardId: ID!, users: [String!]!): Board!
  }
`;

module.exports = typeDef;
