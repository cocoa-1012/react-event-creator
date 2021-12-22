const nodemailer = require('nodemailer');

const sendMail = async (name, generatedPassword, siteUrl, receiverEmail) => {
  const { MAIL_HOST_NAME, MAIL_PORT, USER_MAIL_NAME, USER_MAIL_PASSWORD } =
    process.env;

  const config = {
    host: MAIL_HOST_NAME,
    port: MAIL_PORT,
    auth: {
      user: USER_MAIL_NAME,
      pass: USER_MAIL_PASSWORD,
    },
  };

  var transport = nodemailer.createTransport(config);

  const template = require('./mail.html');
  let info = await transport.sendMail({
    from: USER_MAIL_NAME,
    to: receiverEmail,
    subject: 'You have been chosen',
    text: 'Welcome',
    html: template({ name, generatedPassword, siteUrl }),
  });
  console.log(info.messageId);
  return info;
};

module.exports = { sendMail };
