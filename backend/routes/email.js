const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: "testingotp712@gmail.com",
    pass: "sds@1234",
  },
});

let to_email = "xy@gmail.com";

// sent email to "to_email" with the otp
const email = (to_email, otp) => {
  let mail_html = "<html><body>" + otp + "</body></html>";
  // setup e-mail data
  const mailOptions = {
    from: '"CirQuip" <testingotp712@gmail.com>', // sender address (who sends)
    to: to_email, // list of receivers (who receives)
    subject: "OTP for sign up confirmation", // Subject line
    text: "CirQuip Verification", // plaintext body
    // if coep logo needs to be sent
    // attachments: [{
    // filename: 'Logo.png',
    // path: __dirname + '/Logo.png',
    // cid: 'logo' //my mistake was putting "cid:logo@cid" here!
    // }],
    html: mail_html, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Mail Sent Successfully!");
    }
  });
};

module.exports = { email };
