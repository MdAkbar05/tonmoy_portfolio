const express = require("express");
const {
  handleCreateProject,
  handleGetProjects,
  handleUpdateProject,
  handleDeleteProject,
} = require("../Controllers/projectController");
const projectImageUpload = require("../Middlewares/upload");

const projectRouter = express.Router();

// http://localhost:5000/api/projects
projectRouter.post(
  "/",
  projectImageUpload.single("projectImage"),
  handleCreateProject
);
projectRouter.get("/", handleGetProjects);

projectRouter.put(
  "/:id",
  projectImageUpload.single("projectImage"),
  handleUpdateProject
);

projectRouter.delete("/:id", handleDeleteProject);

module.exports = projectRouter;
