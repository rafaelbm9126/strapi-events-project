'use strict';

const model = 'evt-profile-client-company';

/**
 *
 * @param {String} email
 * @returns
 */
module.exports = async (email) => {
  return await strapi.query(model).findOne({ email });
};
