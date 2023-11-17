const express = require("express");
const https = require('https');
const fs = require('fs');
const cors = require("cors");
const cookieParser = require("cookie-parser");
module.exports = DATABASE = "jobTracker_db";
const path = require('path');

const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;


// configs
require("./config/mongoose.config");
require("./config/jwt.config");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: `http://localhost:3000` }));
app.use(cookieParser());
app.set("port", PORT);

// routes
require("./routes/user.routes")(app);
require("./routes/applications.routes")(app);



if (process.env.HTTPS_KEY_CERT_DIR) {
  const dir = process.env.HTTPS_KEY_CERT_DIR;
  const httpsOptions = {
    key: fs.readFileSync(dir + '/privkey.pem'),
    cert: fs.readFileSync(dir + '/fullchain.pem')
  }
  https.createServer(httpsOptions, app);
}
// Serve production build of React app (i.e. the client app)
app.get('/*', express.static(path.join(__dirname, '../client/build')));
// If actual path does not exist on server, route to index.html for React to 
// handle the path
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
})

// Listen
app.listen(app.get("port"), () => {
  console.log(`Listening at port: ${app.get("port")}`);
});

