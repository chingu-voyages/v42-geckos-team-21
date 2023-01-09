const UserController = require("../controllers/user.controller")

module.exports = app => {
  app.get(`/api/users`, UserController.getAllUsers)
  app.post(`/api/users/new`, UserController.register)
  app.post(`/api/login`, UserController.login)
  app.get(`/api/logout`, UserController.logout)
  app.get(`/api/users/getloggedinuser`, UserController.getLoggedInUser)
}