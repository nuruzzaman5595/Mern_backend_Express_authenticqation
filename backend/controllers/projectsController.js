import mongoose from 'mongoose';
import Project from '../models/Project.js';

export const createProject = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Project title is required' });
    }

    const project = await Project.create({
      title,
      description,
      status: status || 'draft',
      user: req.user?._id,
    });

    return res.status(201).json({
      message: 'Project created successfully',
      project,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating project', error: error.message });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user?._id }).sort({ createdAt: -1 });
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    const project = await Project.findOne({ _id: id, user: req.user?._id });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching project', error: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    const project = await Project.findOneAndUpdate(
      { _id: id, user: req.user?._id },
      updates,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.status(200).json({
      message: 'Project updated successfully',
      project,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating project', error: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    const project = await Project.findOneAndDelete({ _id: id, user: req.user?._id });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.status(200).json({
      message: 'Project deleted successfully',
      project,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
};

export default {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};