const model = "evt-profile-client-admin";

module.exports = {
  definition: `
    input CreateUserClientAdmin {
      username: String!
      email: String!
      company: ID!
      event: ID!
      first_name: String
      last_name: String
    }
    type CreateUserClientAdminPayload {
      ok: Boolean
    }
  `,
  query: ``,
  mutation: `
    createUserClientAdmin(input: CreateUserClientAdmin!): CreateUserClientAdminPayload
  `,
  resolver: {
    Query: {},
    Mutation: {
      createUserClientAdmin: {
        description: "Create account user Client Admin",
        policies: [],
        resolverOf: `application::${model}.${model}.createUserClientAdmin`,
        resolver: async (obj, options, ctx) => {
          return strapi.api[model].controllers[model].createUserClientAdmin(
            options
          );
        },
      },
    },
  },
};
