const express = require('express');
const cors = require('cors');

const app = express();
require('dotenv').config();
module.exports = DATABASE = "jobTracker_db";

// configs
require("./config/mongoose.config");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.set('port', process.env.PORT || 3000);

// routes
require('./routes/user.routes')(app);

// Listen
app.listen(app.get('port'), ()=> {console.log(`Listening at port: ${app.get('port')}`);});