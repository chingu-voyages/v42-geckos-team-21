const User = require("../models/user.model");

class UserController {
  // functions this class has available to use
  getAllUsers = (req, res) => {
    User.find()
      .then((allUsers) => res.json(allUsers))
      .catch((err) => res.json(err));
  };
}

// export a new instance of the UserController class
module.exports = new UserController();
