module.exports = ({ env }) => ({
    email: {
        provider: 'sendmail',
        // providerOptions: {
        //     host: env('EMAIL_SMTP_HOST', 'smtp.example.com'),
        //     port: env('EMAIL_SMTP_PORT', 587),
        //     auth: {
        //         user: env('EMAIL_SMTP_USER'),
        //         pass: env('EMAIL_SMTP_PASS'),
        //     },
        // },
        settings: {
            defaultFrom: 'myemail@protonmail.com',
            defaultReplyTo: 'myemail@protonmail.com',
        },
    },
});
