'use strict';

module.exports = async (IDCompany, IDEvent, profileModel, ) => {
  return await strapi.query(profileModel).findOne({ email });
};
