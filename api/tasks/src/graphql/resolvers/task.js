const { Op } = require("sequelize");
const { Task, Board } = require('../../database/models');
const { GraphQLError } = require("graphql");

module.exports = {
  Task: {
    __resolveReference: async (ref) => {
      return Task.findByPk(ref.id);
    },
    completedBy: task => ({ __typename: 'User', stid: task.completedBy }),
    board: task => task.getBoard(),
  },

  Query: {
    async task(_, { id }) {
      return Task.findByPk(id);
    },
    async tasks() {
      return Task.findAll();
    },
    async myTasks(_, {open}, contextValues) {
      if (contextValues['user-id'] && contextValues['user-id'] !== 'undefined') {
        return Task.findAll({
          where: { completed: !open },
          include: {
            model: Board,
            where: {
              private: true,
              users: {
                [Op.overlap]: [contextValues['user-id']]
              }
            }
          }
        });
      }
      throw new GraphQLError('Session related error', {
        extensions: {
          code: 'NOT ALLOWED',
          http: { status: 403 },
        },
      });
    },
  },

  Mutation: {
    async addTask(_, { title, notes, duedate, boardId }, contextValues) {
      if (contextValues['user-id'] && contextValues['user-id'] !== 'undefined') {
        let board;
        if (boardId == null) {
          // get the private board
          board = await Board.findOne({ where: { users: [contextValues['user-id']], private: true } });
          if (board == null) {
            // create board if not exists
            board = await Board.create({private: true, users: [contextValues['user-id']]});
          }
        }
        const task = await Task.create({title, notes, duedate, BoardId: boardId || board.id});
        return task;
      }
      throw new GraphQLError('Session related error', {
        extensions: {
          code: 'NOT ALLOWED',
          http: { status: 405 },
        },
      });
    },
    async completeTask(_, {id}, contextValues) {
      if (contextValues['user-id'] && contextValues['user-id'] !== 'undefined') {
        const task = await Task.findByPk(id);
        if (!task.completed) {
          const updatedTask = await task.update({ completed: true, completedBy: contextValues['user-id']});
          return updatedTask;
        }
        throw new GraphQLError('Task already completed', {
          extensions: {
            code: 'NOT ALLOWED',
            http: { status: 405 },
          },
        });
      }
      throw new GraphQLError('Session related error', {
        extensions: {
          code: 'NOT ALLOWED',
          http: { status: 405 },
        },
      });
    }
  }
};
