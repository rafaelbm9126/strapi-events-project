'use strict';

const model = "company-service";

module.exports = {
  async companyCount(params) {
    return await strapi.api[model].services[model].count(params.where || {});
  },
  async companyFindManyIds(params) {
    return await strapi.api[model].services[model].find({
      id: { $in: params.ids },
    });
  },
};
