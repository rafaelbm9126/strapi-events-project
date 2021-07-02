const model = "evt-event-service";

module.exports = {
  definition: ``,
  query: `
    evtEventCount(where: JSON): Int!
  `,
  mutation: ``,
  resolver: {
    Query: {
      evtEventCount: {
        description: "Count all evtEventServices",
        policies: [],
        resolverOf: `application::${model}.${model}.evtEventCount`,
        resolver: async (obj, options, ctx) => {
          return strapi.api[model].controllers[model].evtEventCount(
            options
          );
        },
      },
    },
    Mutation: {},
  },
};
