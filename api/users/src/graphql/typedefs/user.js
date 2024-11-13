const { gql } = require('graphql-tag');

module.exports = gql`
  type User @key(fields: "stid") {
    id: ID!
    stid: ID!
    name: String
    email: String
    avatar: String
  }

  extend type Board @key(fields: "id") {
    id: ID! @external
  }

  extend type Query {
    """Fetches a user by it's SuperTokens ID"""
    user(stid: ID): User
    """Fteches all users"""
    users: [User]
    """Fetches only yourself"""
    me: User
  }

  extend type Mutation {
    """Updates a user profile or adds it to the DB after successful signup. """
    setProfile(name: String, email: String, avatar: String): User!
  }
`;
