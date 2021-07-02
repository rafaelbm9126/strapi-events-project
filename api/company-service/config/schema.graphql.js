const model = "company-service";

module.exports = {
  definition: ``,
  query: `
    companyCount(where: JSON): Int!
    companyFindManyIds(ids: [ID]!): [CompanyService]
  `,
  mutation: ``,
  resolver: {
    Query: {
      companyCount: {
        description: "Count all companies",
        policies: [],
        resolverOf: `application::${model}.${model}.companyCount`,
        resolver: async (obj, options, ctx) => {
          return strapi.api[model].controllers[model].companyCount(
            options
          );
        },
      },
      companyFindManyIds: {
        description: "find array ids of company",
        policies: [],
        resolverOf: `application::${model}.${model}.companyFindManyIds`,
        resolver: async (obj, options, ctx) => {
          return strapi.api[model].controllers[model].companyFindManyIds(
            options
          );
        },
      },
    },
    Mutation: {},
  },
};
