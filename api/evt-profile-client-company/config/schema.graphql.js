const model = "evt-profile-client-company";

module.exports = {
  definition: `
    input ActivateClientAccountInput {
      password: String!
      passwordConfirmation: String!
      code: String!
    }
  `,
  query: ``,
  mutation: `
    activateClientAccount(input: ActivateClientAccountInput!): UsersPermissionsLoginPayload!
    loginClientCenter(input: UsersPermissionsLoginInput!): UsersPermissionsLoginPayload!
  `,
  resolver: {
    Query: {},
    Mutation: {
      activateClientAccount: {
        description: "Activate account User ClientAdmin",
        policies: [],
        resolverOf: `application::${model}.${model}.activateClientAccount`,
        resolver: async (obj, options, ctx) => {
          return strapi.api[model].controllers[model].activateClientAccount(
            options
          );
        },
      },
      loginClientCenter: {
        description: "EntryPoint exclusive for login in ClientCenter",
        policies: [],
        resolverOf: `application::${model}.${model}.loginClientCenter`,
        resolver: async (obj, options, ctx) => {
          return strapi.api[model].controllers[model].loginClientCenter(
            options
          );
        },
      },
    },
  },
};
