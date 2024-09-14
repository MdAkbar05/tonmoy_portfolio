const deleteProjectImage = require("../Helpers/deleteImage");
const Project = require("../Models/projectModel");
const createError = require("http-errors");

// /api/projects POST
const handleCreateProject = async (req, res) => {
  try {
    const { projectTitle, projectDesc, projectLink } = req.body;
    const projectImage = req.file ? `/projectImages/${req.file.filename}` : "";

    const newProject = new Project({
      projectTitle,
      projectDesc,
      projectImage,
      projectLink,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleGetProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleUpdateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { projectTitle, projectDesc, projectLink } = req.body;
    const projectImage = req.file
      ? `/projectImages/${req.file.filename}`
      : undefined;

    // If a new image is provided, delete the old image
    if (projectImage && Project.projectImage) {
      deleteProjectImage(Project.projectImage);
    }

    // Update the project fields
    Project.projectTitle = projectTitle;
    Project.projectDesc = projectDesc;
    Project.projectLink = projectLink;
    if (projectImage) {
      Project.projectImage = projectImage;
    }
    // Find the project by ID and update it
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        projectTitle,
        projectDesc,
        projectLink,
        ...(projectImage && { projectImage }), // Only update image if a new one is provided
      },
      { new: true } // Return the updated document
    );

    if (!updatedProject) {
      throw createError(404, "Project not found");
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    next(createError(500, error.message));
  }
};

const handleDeleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      throw createError(404, "Project not found");
    }

    // Delete the project image if it exists
    if (project.projectImage) {
      deleteProjectImage(project.projectImage);
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    next(createError(500, error.message));
  }
};

module.exports = {
  handleCreateProject,
  handleGetProjects,
  handleUpdateProject,
  handleDeleteProject,
};
