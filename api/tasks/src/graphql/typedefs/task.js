const { gql } = require('graphql-tag');
const { DateTimeTypeDefinition } = require("graphql-scalars");
const { mergeTypeDefs } = require('@graphql-tools/merge');

const Task = gql`
  type Task @key(fields: "id") {
    id: ID!
    title: String!
    notes: String
    board: Board!
    duedate: DateTime!
    completed: Boolean
    completedBy: User
    createdAt: DateTime
    updatedAt: DateTime
  }

  extend type User @key(fields: "stid") {
    stid: ID @external
  }

  extend type Query {
    """Fetch a single task by id"""
    task(id: ID!): Task
    """Fetch all tasks"""
    tasks: [Task]
    """Fetch only your own tasks, filtered by state, either open or closed"""
    myTasks(open:Boolean): [Task]
  }

  extend type Mutation {
    """Add a task for either yourself (leave out boardId) or to a group of people (boardId) """
    addTask(title: String!, notes: String, duedate: DateTime!, boardId: ID): Task
    """Complete a task if not yet completed"""
    completeTask(id:ID!): Task!
  }
`;

module.exports = mergeTypeDefs([ DateTimeTypeDefinition, Task ]);
