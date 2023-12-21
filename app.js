var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./src/api/routes/index');
var usersRouter = require('./src/api/routes/users');
var siteVistRequest = require('./src/api/routes/siteVisitRequests')
var contentRouter = require('./src/api/routes/content')
var contactInfoRouter = require('./src/api/routes/contactinfo')
var meetingLinkRouter = require('./src/api/routes/meetingLink')

const http = require('http');
var app = express();
let server = http.createServer(app);
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/site-vist-request',siteVistRequest);
app.use('/content',contentRouter)
app.use('/contact-info',contactInfoRouter)
app.use('/meeting-link',meetingLinkRouter)

server.listen(port, () => {
    console.log("Backend Server is running on http://localhost:" + port);
});

module.exports = app;
