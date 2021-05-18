module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    // default: {
    //   connector: 'bookshelf',
    //   settings: {
    //     client: 'sqlite',
    //     filename: env('DATABASE_FILENAME', '.tmp/data.db'),
    //   },
    //   options: {
    //     useNullAsDefault: true,
    //   },
    // },
    default: {
      connector: 'mongoose',
      settings: {
        uri: env('DATABASE_URL'),
      },
      options: {
        ssl: env('DATABASE_SSL'),
      },
    },
  },
});
