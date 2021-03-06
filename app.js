const app = require('express')();
require('./config/passport')();
require('./config/express')(app);

const index = require('./routes/index');
const profile = require('./routes/user');
const events = require('./routes/events');

app.use('/', index);
app.use('/', profile);
app.use('/', events);


require('./config/error-handler')(app);

module.exports = app;
