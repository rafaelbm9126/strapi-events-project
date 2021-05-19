const model = "evt-profile-client-event";

module.exports = {
  definition: `
    input CreateUserClientEvent {
      username: String!
      email: String!
      company: ID!
      event: ID!
      role: ID!
      first_name: String
      last_name: String
    }
    type CreateUserClientEventPayload {
      id: ID
    }
    input CreateStandManagerEvent {
      username: String!
      email: String!
      company: ID!
      event: ID!
      first_name: String
      last_name: String
    }
    type CreateStandManagerEventPayload {
      id: ID
    }
  `,
  query: ``,
  mutation: `
    createUserClientEvent(input: CreateUserClientEvent!): CreateUserClientEventPayload
    createStandManagerEvent(input: CreateStandManagerEvent!): CreateStandManagerEventPayload
  `,
  resolver: {
    Query: {},
    Mutation: {
      createUserClientEvent: {
        description: "Create account user Client (Admin or StandManager)",
        policies: [],
        resolverOf: `application::${model}.${model}.createUserClientEvent`,
        resolver: async (obj, options, ctx) => {
          return strapi.api[model].controllers[model].createUserClientEvent(
            options
          );
        },
      },
      createStandManagerEvent: {
        description: "Create account user Client (StandManager)",
        policies: [],
        resolverOf: `application::${model}.${model}.createStandManagerEvent`,
        resolver: async (obj, options, ctx) => {
          return strapi.api[model].controllers[model].createStandManagerEvent(
            options
          );
        },
      },
    },
  },
};
