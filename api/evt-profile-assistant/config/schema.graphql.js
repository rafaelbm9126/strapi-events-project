'use strict';

const model = "evt-profile-assistant";

module.exports = {
  definition: ``,
  query: `
    assistantsCount(where: JSON): Int!
  `,
  mutation: ``,
  resolver: {
    Query: {
      assistantsCount: {
        description: "Count all assistants",
        policies: [],
        resolverOf: `application::${model}.${model}.assistantsCount`,
        resolver: async (obj, options, ctx) => {
          return strapi.api[model].controllers[model].assistantsCount(
            options
          );
        },
      },
    },
    Mutation: {},
  },
};
