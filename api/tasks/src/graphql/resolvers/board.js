const { Op, fn } = require("sequelize");
const { Board } = require('../../database/models');
const { GraphQLError } = require("graphql");

module.exports = {
  Board: {
    __resolveReference: async (ref) => {
      return Board.findByPk(ref.id);
    },
    users: board => {
      return board.users.map(userId => ({ __typename: 'User', stid: userId}));
    },
    tasks: board => board.getTasks(),
  },
  Query: {
    async board(_, { id }) {
      return Board.findByPk(id);
    },
    async boards() {
      return Board.findAll();
    },
    async myBoards(_, __, contextValues) {
      if (contextValues['user-id'] !== 'undefined') {
        return Board.findAll({
          where: {
            users: {
              [Op.overlap]: [contextValues['user-id']]
            }
          }
        });
      }
      return [];
    }
  },
  Mutation: {
    async createBoard(_, {title, description, color}, contextValues) {
      if (contextValues['user-id'] !== 'undefined') {
        const board = await Board.create({title, description, color, users: [contextValues['user-id']]});
        return board;
      }
      throw new GraphQLError('Session related error', {
        extensions: {
          code: 'NOT ALLOWED',
          http: { status: 403 },
        },
      });
    },
    async addUsersToBoard(_, { boardId, users }) {
      const board = await Board.findByPk(boardId);
      const currentUsers = board.users;
      const newUsers = users.filter(user => currentUsers.indexOf(user) < 0);
      // board.users = [...currentUsers, newUsers];
      const updatedBoard = await board.update({users: [...currentUsers, ...newUsers]});
      return updatedBoard;
    }
  }
};
