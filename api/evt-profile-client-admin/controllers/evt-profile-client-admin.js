'use strict';

const uuidv4 = require('uuid/v4');
const CreateUser = require('../../../helper/create_user');
const FindOneRole = require('../../../helper/find_one_role');
const CreateProfileWithCompany = require('../../../helper/create_profile_with_company');
const FindOneProfileCompany = require('../../../helper/find_one_profile_company');
const CreateProfileEventGeneral = require('../../../helper/create_profile_event_general');

const model = 'evt-profile-client-admin';
const role  = 'client-admin';

module.exports = {

  async createUserClientAdmin (params) {
    const { username, email, company, event, first_name, last_name, } = params.input;
    const init_password = uuidv4();
    const confirmation_token = uuidv4();
    const thisRole = await FindOneRole(role);
    let createProfile = null;

    const existUserProfile = await FindOneProfileCompany(email);

    if (!!existUserProfile) {
      console.log(existUserProfile);
      // createProfile = CreateProfileEventGeneral(
      //   model,
      //   existUserProfile.users_permissions_user.id,
      //   event,
      // );
    } else {
      const newUser = await CreateUser(
        username,
        email,
        init_password,
        thisRole._id,
        confirmation_token,
      );

      try {
        createProfile = CreateProfileEventGeneral(
          model,
          newUser.id,
          event,
        );

        await CreateProfileWithCompany(
          email,
          first_name,
          last_name,
          newUser.id,
          company,
        );
      } catch (error) {
        console.log(error);
      }
    }

    return { ok: true };
  },
};
