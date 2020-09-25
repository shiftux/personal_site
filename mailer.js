const nodemailer = require('nodemailer');
const { resolveContent } = require('nodemailer/lib/shared');

class Mailer {
  constructor(email, message, name='', company=null, sendCV=false) {
    this.name = name;
    this.email = email;
    this.message = message;
    this.company = company;
    this.sendCV = sendCV;
    this.transporter = nodemailer.createTransport({
      host: "smtp.eu.mailgun.org",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PW
      }
    });
    this.emailOptions = {
      from: process.env.MAILER_MYMAIL,
      to: process.env.MAILER_MYMAIL,
      subject: 'Received message on Website',
      text: this.message
    };
  }
  sendMeTheMessage() {
    const msg = `Sender: ${this.name}\nCompany: ${this.company}\nWants CV: ${this.sendCV}\nMessage: ${this.message}`
    this.emailOptions['text'] = msg;
    return this.transporter.sendMail(this.emailOptions)
  }
  confirmInquiry(){
    this.emailOptions['subject'] = 'Contacted Sandro Montanari';
    this.emailOptions['to'] = this.email;
    let msg = `Hi ${this.name},\n\n Thanks for reaching out! I've received your inquiry and will be in touch soon.\n`;
    const copy = `PS Below you'll find a copy of your inquiry:\n\n${this.message}\n\n`
    const closing =  'Best regards,\nSandro\n\n';
    if(this.sendCV){
      msg = msg.concat('Please find the requested CV attached.\n\n');
      this.emailOptions['attachments'] = [
        {
          filename: 'SandroMontanari_CV.pdf',
          path: 'assets/CV.pdf'
        },
      ]
    }
    msg = msg.concat(closing, copy);
    this.emailOptions['text'] = msg;
    return this.transporter.sendMail(this.emailOptions)
  }
}

module.exports.Mailer = Mailer