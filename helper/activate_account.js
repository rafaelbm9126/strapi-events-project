'use strict';

/**
 *
 * @param {String} password
 * @param {String} passwordConfirmation
 * @param {String} code
 */
module.exports = async (
  password,
  passwordConfirmation,
  code,
) => {

  const result = await strapi.plugins['users-permissions'].controllers.auth.emailConfirmation({
    query: {
      confirmation: code,
    },
    created: function (data) {}, // param 'data' has session user active
    badRequest: function (type, detail) {
      throw new Error('[Error emailConfirmation]', detail[0].messages[0].id);
    },
    redirect: function (config) {}, // params confid has data redirec
  });

  return await new Promise((resolve, reject) => {
    strapi.plugins['users-permissions'].controllers.auth.resetPassword({
      request: {
        body: {
          password,
          passwordConfirmation,
          code,
        },
      },
      send: function (data) {
        resolve(data);
      },
      badRequest: function (type, detail) {
        if (!!type) {
          reject(type);
        } else {
          reject(detail[0].messages[0].id);
        }
      },
    });
  });

};
