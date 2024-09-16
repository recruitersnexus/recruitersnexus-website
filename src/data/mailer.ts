import nodemailer from "nodemailer";

const email = process.env.Email;
const pass = process.env.Email_Pass;
const toEmail = process.env.Email;

export const transporter = nodemailer.createTransport({
    service:"gmail",
    host: 'smtp.gmail.com',
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: email,
      pass: pass,
    },
  });


export const info = {
    from: email, // sender address
    // to: "tahashayk2k@gmail.com", // list of receivers
    // subject: "Registration Code for Interview Website", // Subject line
    // text: "Security Code", // plain text body
    // html: "<b>Security code for Account Registration</b>", // html body
  };

  export const contactUs = {
    from: email,
    to: toEmail,
  }