import express from 'express';
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from '../controllers/projectsController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.use(auth);

router.route('/').get(getAllProjects).post(createProject);
router.route('/:id').get(getProjectById).put(updateProject).delete(deleteProject);

export default router;
