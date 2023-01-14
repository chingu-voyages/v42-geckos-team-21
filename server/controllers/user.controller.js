const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


class UserController {
  // functions this class has available to use
  // Create
  register = (req, res) => {
    User.find({ email: req.body.email })
      .then((userEmail) => {
        if (userEmail.length === 0) {
          User.create(req.body)
            .then((user) => {
              const userToken = jwt.sign(
                { id: user._id },
                process.env.SECRET_KEY
              );
              res
                .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                  httpOnly: true,
                })
                .json(user);
            })
            .catch((err) => {
              res.status(400).json(err.message)
              console.error(err)
            });
            
        } else {
          res.status(400).json({
            errors: {
              email: {
                message: "Email is already taken, please provide another",
              },
            },
          });
        }
      })
      .catch((err) => res.status(400).json(err));
  };

  // READ
  getAllUsers = (req, res) => {
    User.find().populate('applications')
      .then((allUsers) => res.json(allUsers))
      .catch((err) => res.status(400).json(err));
  };

  getOneUser = (req, res) => {
    User.findOne(req.params)
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  };

  // UPDATE
  updateUser = (req, res) => {
    User.findOneAndUpdate(req.params, req.body, {
      new: true,
      runValidators: true,
    })
      .then((update) => res.json(update))
      .catch((err) => res.status(400).json(err));
  };

  // DELETE
  deleteUser = (req, res) => {
    User.deleteOne(req.params)
      .then((deleteConfirm) => res.json(deleteConfirm))
      .catch((err) => res.json(err));
  };

  // AUTH functions
  // Login
  login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    // if user is not found in database, return error status 400
    if (user === null) {
      return res.sendStatus(400);
    }

    // user exists in database, check submitted password is the same as password in database
    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!correctPassword) {
      // password does not match
      return res.sendStatus(400);
    }

    // password is correct, create jwt token
    const userToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET_KEY
    );

    res
      .cookie("usertoken", userToken, process.env.SECRET_KEY, {
        httpOnly: true,
      })
      .json({ msg: "success!" });
  };

  logout = (req, res) => {
    res.clearCookie("usertoken");
    res.sendStatus(200);
  };

  /* use this method to retrieve logged in USER data from the backend via jwt cookies
    example:
      axios
        .get(`http://localhost:8000/api/users/getloggedinuser`, {withCredentials: true})
        .then(res => console.log(res.data[0]))
  */
  getLoggedInUser = (req, res) => {
    // use info stored in cookie to get id of logged in user and query db to find user with that id, return that users info
    const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true });
    User.find({ _id: decodedJwt.payload.id })
      .then((foundUser) => res.json(foundUser))
      .catch((err) => res.json(err));
  };
}

// export a new instance of the UserController class
module.exports = new UserController();
