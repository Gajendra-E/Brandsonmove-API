const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const socketIO = require('socket.io');

const indexRouter = require('./src/api/routes/index');
const usersRouter = require('./src/api/routes/users');
const contentRouter = require('./src/api/routes/content')
const contactInfoRouter = require('./src/api/routes/contactinfo')
const meetingLinkRouter = require('./src/api/routes/meetingLink')
const meetingRequestedUserRouter = require('./src/api/routes/meetingRequestedUser')
const  preferedMeetingTimeSlotRoute = require('./src/api/routes/preferedMeetingTimeSlot')

const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;
const cors = require('cors');
var multer = require('multer');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

app.use(cors());

io.on("connection", (socket) => {
  
    console.log("New User connected");
    
  // Set the socket in the app for use in controllers
  app.set('socket', socket);

    
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });


  // Use the controllers with a middleware to set the socket in every request
app.use((req, res, next) => {
    req.app.set('socket', io);
    next();
  });
  

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/content',contentRouter)
app.use('/contact-info',contactInfoRouter)
app.use('/meeting-link',meetingLinkRouter)
app.use('/meeting-requested-user',meetingRequestedUserRouter)
app.use('/meeting-time-slot',preferedMeetingTimeSlotRoute)


server.listen(port, () => {
    console.log("Backend Server is running on http://localhost:" + port);
});

module.exports = app;
