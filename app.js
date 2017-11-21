const app = require('express')();
require('./config/passport')();
require('./config/express')(app);

const index = require('./routes/index');
const events = require('./routes/events');

app.use('/', index);
app.use('/', events);

require('./config/error-handler')(app);

module.exports = app;
