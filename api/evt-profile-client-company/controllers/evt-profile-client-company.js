'use strict';

const ActivateAccount = require('../../../helper/activate_account');
const FindOneProfileCompany = require('../../../helper/find_one_profile_company');

module.exports = {

  async activateClientAccount(params) {
    return await ActivateAccount(
      params.input.password,
      params.input.passwordConfirmation,
      params.input.code,
    );
  },

  async loginClientCenter(params) {
    let user = await FindOneProfileCompany(params.input.identifier);

    if (!user) {
      user = await strapi.query('user', 'users-permissions').findOne({
        email: params.input.identifier
      });
      if (!user) {
        throw new Error('User not found or Unauthorized');
      }
    }

    return await new Promise((resolve, reject) => {
      strapi.plugins['users-permissions'].controllers.auth.callback({
        params: {
          provider: 'local',
        },
        request: {
          body: {
            ...params.input,
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
        }
      });
    });
  },

};
