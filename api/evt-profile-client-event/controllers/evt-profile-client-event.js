'use strict';

const uuidv4 = require('uuid/v4');
const CreateUser = require('../../../helper/create_user');
const CreateProfileWithCompany = require('../../../helper/create_profile_with_company');
const FindOneProfileCompany = require('../../../helper/find_one_profile_company');
const CreateProfileEventGeneral = require('../../../helper/create_profile_event_general');
const FindOneClientEvent = require('../../../helper/find_one_client_event');
const FindOneRole = require('../../../helper/find_one_role');

const model = 'evt-profile-client-event';

module.exports = {

    async createUserClientEvent (params) {
        const { username, email, company, event, first_name, last_name, role, } = params.input;
        const init_password = uuidv4();
        const confirmation_token = uuidv4();
        let createProfile = null;

        const existUserProfile = await FindOneProfileCompany(email);

        if (!!existUserProfile) {
            const clientEvent = await FindOneClientEvent(
                existUserProfile.id,
                event,
            );
            if (!!clientEvent) {
                throw new Error('That user is already related to the event.');
            }
            createProfile = CreateProfileEventGeneral(
                existUserProfile.id,
                event,
            );
        } else {
            try {
                const newUser = await CreateUser(
                    username,
                    email,
                    init_password,
                    role,
                    confirmation_token,
                );

                const profileClientCompany = await CreateProfileWithCompany(
                    email,
                    first_name,
                    last_name,
                    newUser.id,
                    company,
                );

                createProfile = CreateProfileEventGeneral(
                    profileClientCompany.id,
                    event,
                );

            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        }

        return createProfile;
    },

    async createStandManagerEvent (params) {
        const role = FindOneRole('stand-manager');
        return this.createUserClientEvent({ ...params, role: role.id });
    }

};
