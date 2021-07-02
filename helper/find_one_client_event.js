'use strict';

const model = 'evt-profile-client-event';

/**
 * 
 * @param {ID} evt_profile_client_company 
 * @param {ID} evt_event_service 
 * @returns 
 */
module.exports = async (
  evt_profile_client_company,
  evt_event_service,
) => {
  return await strapi.query(model).findOne({
    evt_profile_client_company,
    evt_event_service,
  });
};
