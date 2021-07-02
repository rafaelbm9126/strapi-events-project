"use strict";

const uuidv4 = require("uuid/v4");
const CreateUser = require("../../../helper/create_user");
const FindUser = require("../../../helper/find_user");
const UpdateUser = require("../../../helper/update_user");
const CreateProfileWithCompany = require("../../../helper/create_profile_with_company");
const FindOneProfileCompany = require("../../../helper/find_one_profile_company");
const CreateProfileEventGeneral = require("../../../helper/create_profile_event_general");
const CreateTicket = require("../../../helper/create_ticket");
const FindOneClientEvent = require("../../../helper/find_one_client_event");
const FindOneRole = require("../../../helper/find_one_role");

const model = "evt-profile-client-event";

const ListRoles = [
  { key: 'ClientAnalyst', value: 'client-analyst' },
  { key: 'SuperStand', value: 'super-stand' },
  { key: 'StandManager', value: 'stand-manager' },
  { key: 'StandAttendant', value: 'stand-attendant' },
];

module.exports = {
  async createClientAdminEvent(params) {
    const role = await FindOneRole("client-admin");
    return await module.exports.createCompanyUsersEvent({ ...params, roleAdmin: role });
  },
  async createCompanyUsersEvent(params) {
    try {
      const {
        username,
        email,
        company,
        event,
        first_name,
        last_name,
        role,
      } = params.input;
      const init_password = uuidv4();
      const confirmation_token = uuidv4();
      let createProfileCompany = null;
      let userSys = null;
      let objRole = params.roleAdmin;

      /* FIND USER/PROFILE */
      const existUserSys = await FindUser(email);
      const existUserProfile = await FindOneProfileCompany(email);
      const existClientAndEvent = !!existUserProfile ? await FindOneClientEvent(
        existUserProfile.id,
        event,
      ) : null;

      /* ROLE */
      if (!params.roleAdmin) {
        const roleName = ListRoles.find(item => item.key === role);
        if (!roleName) {
          throw new Error("The role not exist.");
        }
        objRole = await FindOneRole(roleName.value);
      }

      /* TICKET */
      await CreateTicket('default', event, [], true);

      /* USER SYSTEM */
      if (!!existUserSys && existUserSys.length > 0) {
        await UpdateUser(existUserSys[0].id, username, objRole.id);
        userSys = existUserSys[0];
      } else {
        userSys = await CreateUser(
          username,
          email,
          init_password,
          objRole.id,
          confirmation_token
        );
      }

      /* PROFILE COMPANY */
      if (!existUserProfile) {
        createProfileCompany = await CreateProfileWithCompany(
          email,
          first_name,
          last_name,
          userSys.id,
          company,
          objRole.id,
        );
      }

      /* PROFILE EVENT */
      const toReturn = !existClientAndEvent ? await CreateProfileEventGeneral(
        !!existUserProfile ? existUserProfile.id : createProfileCompany.id,
        event
      ) : existClientAndEvent;

      // /* SEND NOTIFICATION */
      // await strapi.plugins.email.services.email.send({
      //   to: email,
      //   from: process.env.SMTP_MAIL_SEND,
      //   subject: 'Account Confirmation',
      //   html: `
      //     <p>Thank you for registering!</p>

      //     <p>You have to confirm your email address. Please click on the link below.</p>

      //     <p>
      //       <a href="${process.env.WEB_HOST_FOR_REDIRECT}/#/activate/${confirmation_token}">Here Activate..!</a>
      //     </p>

      //     <p>Thanks.</p>
      //   `,
      // });

      return { ...toReturn, linkActivate: `http://localhost:3000/#/activate/${confirmation_token}` };

    } catch (error) {
      console.log(error);
      throw new Error('[Error]: indeterminate operation');
    }
  },
};
