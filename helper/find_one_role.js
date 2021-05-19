'use strict';

/**
 *
 * @param {String} name
 * @returns
 */
module.exports = async (name) => {
  return await strapi.query('role', 'users-permissions').findOne({ name });
};
