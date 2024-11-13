const supertokens = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const ThirdParty = require("supertokens-node/recipe/thirdparty");
const EmailPassword = require("supertokens-node/recipe/emailpassword");
const UserRoles = require("supertokens-node/recipe/userroles");
const Dashboard = require("supertokens-node/recipe/dashboard");
const EmailVerification = require("supertokens-node/recipe/emailverification");
const { SMTPService } = require("supertokens-node/recipe/emailverification/emaildelivery");

const smtpSettings = {
  host: 'mailpit',//process.env.EMAIL_SERVER || "smtp://localhost:1025",
  port: 1025,
  from: {
      name: "SuperTokens",
      email: "supertokens@lizard.global",
  },
  secure: false
}

supertokens.init({
    framework: "express",
    supertokens: {
      connectionURI: process.env.SUPERTOKENS_CORE_URL || "http://localhost:3567",
    },
    appInfo: {
      appName: "ApolloFederation",
      apiDomain: "http://localhost:4000",
      websiteDomain: "http://localhost:3000",
      apiBasePath: "/auth",
      websiteBasePath: "/auth",
    },
    recipeList: [
      EmailPassword.init({
        override: {
          apis: (originalImplementation) => {
              return {
                  ...originalImplementation,
                  signUpPOST: async (input) => {
                      if (originalImplementation.signUpPOST === undefined) {
                          throw Error("Should never come here");
                      }

                      let response = await originalImplementation.signUpPOST(input);

                      if (response.status === "OK") {
                          let { id, email } = response.user;

                          // // These are the input form fields values that the user used while signing up
                          let formFields = input.formFields;
                          // TODO: post sign up logic
                          console.log('send and email?', id, email, formFields);
                      }
                      return response;
                  }
              }
          }
      }}),
      UserRoles.init(),
      Session.init({
        getTokenTransferMethod: () => "header",
      }),
      EmailVerification.init({
        mode: 'OPTIONAL',
        emailDelivery: {
          service: new SMTPService({smtpSettings})
        }
      }),
      Dashboard.init(),
    ]
});
