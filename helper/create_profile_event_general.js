'use strict';

const model = 'evt-profile-client-event';

/**
 * only ClientAdmin & StandManager
 *
 * @param {String} IDProfileUser
 * @param {String} IDEvent
 * @returns
 */
module.exports = async (
  IDProfileUser,
  IDEvent,
) => {
  return await strapi.api[model].services[model].create({
    evt_profile_client_company: IDProfileUser,
    evt_event_service: IDEvent,
  });
};
