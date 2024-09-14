const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectTitle: {
      type: String,
      required: true,
    },
    projectDesc: {
      type: String,
      required: true,
    },
    projectImage: {
      type: String,
      required: true,
    },
    projectLink: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
