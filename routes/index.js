require('../mailer.js');
var express = require('express');
const { Mailer } = require('../mailer.js');
var router = express.Router();
const { body, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/connectForm', [
      body('inputEmail').isEmail(),
    ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('ERROR: ', errors);
      res.redirect('/mail_error.html');
    }
    const mailer = new Mailer(
      req.body.inputEmail,
      req.body.messageField,
      req.body.inputName,
      req.body.inputCompany,
      req.body.cvCheckbox
    )
    const prom1 = mailer.sendMeTheMessage();
    const prom2 = mailer.confirmInquiry();
    Promise.all([prom1, prom2]).then((values) => {
      res.redirect('/mail_thanks.html');
    }).catch((error) => {
      console.log('ERROR: ', error);
      res.redirect('/mail_error.html');
    });
});

module.exports = router;
