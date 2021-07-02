'use strict';

/**
 *
 * @param {String} id
 * @param {String} username
 * @param {ID} IDRole
 * @returns
 */
module.exports = async (
  id,
  username,
  IDRole,
) => {
  try {
    return await strapi.query('user', 'users-permissions').update({ id }, {
      username,
      role: IDRole,
    });
  } catch (error) {
    console.log(error);
    throw new Error('[Error]: find user');
  }
};
