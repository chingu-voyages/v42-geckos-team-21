const UserController = require("../controllers/user.controller");

module.exports = (app) => {
  app.post(`/api/register`, UserController.register);
  app.post(`/api/login`, UserController.login);
  app.get(`/api/users`, UserController.getAllUsers);
  app.get(`/api/logout`, UserController.logout);
  app.get(`/api/user/getloggedinuser`, UserController.getLoggedInUser);
  app.get(`/api/user/:_id`, UserController.getOneUser);
  app.put(`/api/user/update/:_id`, UserController.updateUser);
  app.delete(`/api/user/:_id`, UserController.deleteUser);
};
