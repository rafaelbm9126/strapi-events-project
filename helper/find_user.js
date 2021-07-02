'use strict';

/**
 *
 * @param {String} email
 * @returns
 */
module.exports = async (
  email
) => {
  try {
    return await strapi.query('user', 'users-permissions').find({ email });
  } catch (error) {
    console.log(error);
    throw new Error('[Error]: find user');
  }
};
