const ApplicationController = require("../controllers/applications.controller");

module.exports = (app) => {
  app.post(`/api/applications/new`, ApplicationController.createApplication);
  app.get(`/api/applications`, ApplicationController.getAllApplications);
  app.get(`/api/applications/:_id`, ApplicationController.getOneApplication);
  app.put(`/api/applications/:_id`, ApplicationController.updateApplication);
  app.delete(`/api/applications/:_id`, ApplicationController.deleteApplication);
};
