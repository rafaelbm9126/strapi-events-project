module.exports = async (ctx, next) => {
  const { input } = ctx.request.body;

  const patter_user_type = [
    { key: 'client-admin', value: 'evt-profile-client-admin' },
    { key: 'stand-manager', value: 'evt-profile-stand-manager' },
    { key: 'assistant', value: 'evt-profile-assistant' },
  ];

  if (!!input) {

    const { identifier } = input;

    const user = await strapi.query('user', 'users-permissions').findOne({ email: identifier });

    if (!!user && user.confirmed && !user.blocked) {

      if (user.role.name === 'super-admin') {
        return await next();
      }

      const model = patter_user_type.find(item => item.key === user.role.name);

      const { id } = user;

      const events = await strapi.query(model.value).find({
        users_permissions_user: id,
      });

      const event_active = events.find(item => item.evt_event_service.active);

      if (!!event_active) {
        return await next();
      }
    }
  }

  throw new Error('Access Unauthorized.!');
};
