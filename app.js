const app = require('express')();
require('./config/passport')();
require('./config/express')(app);


const index = require('./routes/index');
const profile = require('./routes/user');

app.use('/', index);
app.use('/', profile);


require('./config/error-handler')(app);

module.exports = app;
