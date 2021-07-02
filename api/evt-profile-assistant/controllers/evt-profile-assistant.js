'use strict';

const model = "evt-profile-assistant";

module.exports = {
  async assistantsCount(params) {
    return await strapi.api[model].services[model].count(params.where || {});
  },
};
