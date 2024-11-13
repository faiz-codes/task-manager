const { User, Board } = require('../../database/models');

module.exports = {
  User: {
    __resolveReference: async (ref) => {
      return User.findOne({ where: {stid: ref.stid} });
    },
  },
  Query: {
    async user(_, { stid }) {
      return User.findOne({ where: { stid } });
    },
    async users() {
      return User.findAll();
    },
    me(_, __, contextValues) {
      if (contextValues['user-id'] && contextValues['user-id'] !== 'undefined') {
        return User.findOne({ where: { stid: contextValues['user-id'] } });
      }
    },
  },
  Mutation: {
    async setProfile(_, {name, email, avatar}, contextValues) {
      if (contextValues['user-id'] && contextValues['user-id'] !== 'undefined') {
        const [user] = await User.upsert({
          stid: contextValues['user-id'], name, email, avatar
        }, {
          fields: ['name', 'email', 'avatar'], conflictFields: ['stid']
        });
        return user;
      }
      throw new GraphQLError('Session related error', {
        extensions: {
          code: 'NOT ALLOWED',
          http: { status: 403 },
        },
      });
    }
  },
};
