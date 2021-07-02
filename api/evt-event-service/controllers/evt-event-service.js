'use strict';

const model = "evt-event-service";

module.exports = {
  async evtEventCount(params) {
    return await strapi.api[model].services[model].count(params.where || {});
  },
};
