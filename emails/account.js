const sgMail = require('@sendgrid/mail');
const sgMailAPIKey = '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';
sgMail.setApiKey(sgMailAPIKey);


const sendWelcomeEmail = (email, name) => {
    const msg = {
        to: email,
        from: 'costanzopa@gmail.com',
        subject: 'Thanks for Join in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    };
    sgMail.send(msg);
};


const sendCancelationEmail = (email, name) => {
    const msg = {
        to: email,
        from: 'costanzopa@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope you see back sometime soon.`
    };
    sgMail.send(msg);
};


module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
};
