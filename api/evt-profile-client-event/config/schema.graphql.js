const model = "evt-profile-client-event";

module.exports = {
  definition: `
    enum UserRole {
      ClientAnalyst
      SuperStand
      StandManager
      StandAttendant
    }
    input CreateCompanyUserEventInput {
      username: String!
      email: String!
      company: ID!
      event: ID!
      first_name: String
      last_name: String
      role: UserRole
    }
    type CreateCompanyUserEventPayload {
      id: ID
      linkActivate: String
    }
  `,
  query: ``,
  mutation: `
    createClientAdminEvent(input: CreateCompanyUserEventInput!): CreateCompanyUserEventPayload
    createCompanyUsersEvent(input: CreateCompanyUserEventInput!): CreateCompanyUserEventPayload
  `,
  resolver: {
    Query: {},
    Mutation: {
      createClientAdminEvent: {
        description: "Create Company / Event / ClientAdmin",
        policies: [],
        resolverOf: `application::${model}.${model}.createClientAdminEvent`,
        resolver: async (obj, options, ctx) => {
          return strapi.api[model].controllers[model].createClientAdminEvent(
            options
          );
        },
      },
      createCompanyUsersEvent: {
        description: "Create stack users of event-compny",
        policies: [],
        resolverOf: `application::${model}.${model}.createCompanyUsersEvent`,
        resolver: async (obj, options, ctx) => {
          return strapi.api[model].controllers[model].createCompanyUsersEvent(
            options
          );
        },
      },
    },
  },
};
