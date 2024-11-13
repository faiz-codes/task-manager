const { GraphQLError } = require('graphql');
const Session = require("supertokens-node/recipe/session");

const isIntrospectionQuery = ({ operationName }) => (
  operationName === 'IntrospectionQuery'
)
const shouldAuthenticate = body => (
  !isIntrospectionQuery(body)
)

const handleAuth = async ({ req, res }) => {
  if (shouldAuthenticate(req.body)) {
    try {
      let session = await Session.getSession(req, res, {
        sessionRequired: false
      })
      if (session) {
        const payload = session.getAccessTokenPayload();
        const roles = payload && JSON.stringify(payload['st-role']);
        const permissions = payload && JSON.stringify(payload['st-perm']);
        
        return {
          sessionHandle: session.getHandle(),
          userId: session.getUserId(),
          accessTokenPayload: session.getAccessTokenPayload(),
          roles,
          permissions,
        }
      }
    } catch (err) {
      console.log({err});
      if (Session.Error.isErrorFromSuperTokens(err)) {
        throw new GraphQLError('Session related error', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: err.type === Session.Error.INVALID_CLAIMS ? 403 : 401 },
          },
        });
      }
      throw err;
    }
  }
}

module.exports = handleAuth;
