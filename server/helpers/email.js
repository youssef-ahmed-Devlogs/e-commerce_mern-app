const nodemailer = require("nodemailer");
const pug = require("pug");
const { htmlToText } = require("html-to-text");

class Email {
  constructor(user, link) {
    this.to = user.email;
    this.from = `MeStore <${process.env.EMAIL_FROM}>`;
    this.link = link;
    this.firstName = user.firstName;
  }

  createTransporter = () => {
    return nodemailer.createTransport({
      service: "SendinBlue",
      auth: {
        user: process.env.SENDINBLUE_USERNAME,
        pass: process.env.SENDINBLUE_PASSWORD,
      },
    });
  };

  send = async (subject, template) => {
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        link: this.link,
        subject,
      }
    );

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    };

    await this.createTransporter().sendMail(mailOptions);
  };

  sendVerifyEmail = async () => {
    await this.send("Verify your account", "verifyEmail");
  };
}

module.exports = Email;
