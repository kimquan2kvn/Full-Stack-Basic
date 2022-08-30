const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: 'c63fbda9246c3e8fdbf7a5ccdc1f37e0-c76388c3-33b3ad2c'|| 'key-yourkeyhere'});

module.exports = {

  sendEmail: (email,id)=> {
    mg.messages.create('sandboxb154ec8867d84fe794ba8f6f0cd234b4.mailgun.org', {
      from: 'Admin StudentManagement <admin@studentmanagement>',
      to: [email],
      subject: 'Active Account',
      text: 'Testing some Mailgun awesomness!',
      html:
      ` <h1>Please visit click on the link to activate the account!</h1>
        <a href="http://localhost:3000/authentication/user/active/${id}">Active Now</a>
      `
    })
      .then(msg => console.log(msg)) // logs response data
      .catch(err => console.error(err)); // logs any error
  }

};
