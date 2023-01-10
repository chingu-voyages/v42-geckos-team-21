const { ApplicationModel } = require("../models/applications.model");
const User = require("../models/user.model");

class ApplicationController {
  // Create new Application
  createApplication = async (req, res) => {
    try {
      const newApplication = new ApplicationModel(req.body);
      await newApplication.save();
      await User.findOneAndUpdate(
        { _id: newApplication.userId },
        { $push: { applications: newApplication } }
      );
      res.json(newApplication);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  // Read applications
  getAllApplications = (req, res) => {
    // sorts returned query in descending order
    ApplicationModel.find({})
      .sort({ createdAt: -1 })
      .then((applications) => res.json(applications))
      .catch((err) => res.status(400).json(err));
  };

  getOneApplication = (req, res) => {
    ApplicationModel.findOne(req.params)
      .then((application) => res.json(application))
      .catch((err) => res.status(400).json(err));
  };

  // Update Applications
  updateApplication = (req, res) => {
    ApplicationModel.findOneAndUpdate(req.params, req.body, {
      new: true,
      runValidators: true,
    })
      .then((update) => res.json(update))
      .catch((err) => res.status(400).json(err));
  };

  // Delete Applications
  deleteApplication = (req, res) => {
    ApplicationModel.deleteOne(req.params)
      .then((deleteConfirm) => res.json(deleteConfirm))
      .catch((err) => res.json(err));
  };
}

module.exports = new ApplicationController();
