'use strict';

const profileWithCompany = 'evt-profile-client-company';

/**
 *
 * @param {String} email
 * @returns
 */
module.exports = async (email) => {
  return await strapi.query(profileWithCompany).findOne({ email });
};
