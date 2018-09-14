var app = new(require('express'));
var Webtask = require('webtask-tools');

app.use(require('body-parser').json());

// [POST] hire
app.post('/mailer/contact', function (req, res) {

  var subject = 'New Contact Message from Helicap Website';
  var content = '- FULLNAME: ' + req.body.name + '\n' +
                '- EMAIL: ' + req.body.email + '\n' +
                '- SUBJECT: ' + req.body.subject  + '\n' +
                '- MESSAGE: ' + req.body.message;

  var Sendgrid = require('sendgrid')(req.webtaskContext.secrets.SG_KEY);

  Sendgrid.send({
    to: req.webtaskContext.secrets.SG_TO,
    from: req.webtaskContext.secrets.SG_FROM,
    subject: subject,
    text: content
  }, function(err, json) {
    if(err)
      res.status(500).json({ success : false });
    else
      res.status(200).json({ success : true });
  });
});


module.exports = Webtask.fromExpress(app);
