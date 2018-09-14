module.exports = function(ctx, cb) {

    if(!ctx.data.SG_KEY) return cb(new Error('SG Key missing!'));
    if(!ctx.data.SG_TO) return cb(new Error('TO field is missing!'));
    if(!ctx.data.SG_FROM) return cb(new Error('FROM field is missing!'));

    var Sendgrid = require('sendgrid')(ctx.data.SG_KEY);

    Sendgrid.send({
        to: ctx.data.SG_TO,
        from: ctx.data.SG_FROM,
        subject: 'New Message from ' + ctx.data.name + ' <' + ctx.data.email +'>',
        text: ctx.data.message
    }, function(err, json) {
        if(err) {
            return console.error(err);
        }
        console.log(json);
        cb(null, json);
    });
};
