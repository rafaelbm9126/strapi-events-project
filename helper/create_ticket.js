'use strict';

const model = 'evt-ticket-service';

/**
 *
 * @param {String} name
 * @param {String} evt_event_service
 * @param {Array<String>} evt_room_services
 * @param {Boolean} full_access
 * @returns
 */
module.exports = async (
  name,
  evt_event_service,
  evt_room_services,
  full_access,
) => {
  const exist = await strapi.query(model).findOne({
    evt_event_service
  });

  if (!exist) {
    await strapi.query(model).create({
      name,
      evt_event_service,
      evt_room_services,
      full_access,
    });
  }
};
