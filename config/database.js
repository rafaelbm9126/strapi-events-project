module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'sqlite',
        filename: env('DATABASE_FILENAME', '.tmp/data.db'),
      },
      options: {
        useNullAsDefault: true,
      },
    },
    // default: {
    //   connector: 'mongoose',
    //   settings: {
    //     uri: 'mongodb+srv://admin:NtfWauA79ixTKk6y@sellbootdev.zm7kt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    //   },
    //   options: {
    //     ssl: true,
    //   },
    // },
  },
});
