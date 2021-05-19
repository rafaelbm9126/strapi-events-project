'use strict';

/**
 *
 * @param {String} username
 * @param {String} email
 * @param {String} password
 * @param {ID} IDRole
 * @param {ID} confirmationToken
 * @param {ID} confirmed
 * @returns
 */
module.exports = async (
  username,
  email,
  password,
  IDRole,
  confirmationToken,
  confirmed = false,
) => {
  try {
    return await new Promise((resolve, reject) => {
      strapi.plugins['users-permissions'].controllers.user.create({
        request: {
          body: {
            username,
            email,
            password,
            role: IDRole,
            confirmationToken,
            confirmed,
          }
        },
        state: {
          isAuthenticatedAdmin: false,
        },
        created: function (data) {
          resolve(data);
        },
        badRequest: function (type, detail) {
          if (!!type) {
            reject(type);
          } else {
            reject(detail[0].messages[0].id);
          }
        }
      });
    });
  } catch (error) {
    throw new Error('[Error]: create user');
  }
};
