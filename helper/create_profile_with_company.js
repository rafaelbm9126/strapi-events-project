'use strict';

const profileWithCompany = 'evt-profile-client-company';

/**
 *
 * @param {String} email
 * @param {String} first_name
 * @param {String} last_name
 * @param {ID} users_permissions_user
 * @param {ID} evt_company_service
 * @returns
 */
module.exports = async (
  email,
  first_name = '',
  last_name = '',
  users_permissions_user,
  evt_company_service,
) => {
  return await strapi.api[profileWithCompany].services[profileWithCompany].create({
    email,
    first_name,
    last_name,
    users_permissions_user,
    evt_company_service,
  });
};
