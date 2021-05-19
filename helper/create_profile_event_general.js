'use strict';

/**
 * only ClientAdmin & StandManager
 *
 * @param {String} model
 * @param {String} IDUser
 * @param {String} IDEvent
 * @returns
 */
module.exports = async (
  model,
  IDUser,
  IDEvent,
) => {
  return await strapi.api[model].services[model].create({
    users_permissions_user: IDUser,
    evt_event_service: IDEvent,
  });
};
