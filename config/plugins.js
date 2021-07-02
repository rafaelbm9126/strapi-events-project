module.exports = ({ env }) => ({
  email: {
      provider: "sendgrid",
      providerOptions: {
          apiKey: env("SMTP_PASSWORD"),
      },
      settings: {
          defaultFrom: env("SMTP_MAIL_SEND"),
          defaultReplyTo: env("SMTP_MAIL_REASPONSE"),
      },
  },
});
