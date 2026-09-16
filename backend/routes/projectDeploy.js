import express from 'express';
import { deployProject, getDeployStatus } from '../controllers/projectDeployController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.use(auth);

router.post('/deploy', deployProject);
router.get('/status/:projectId', getDeployStatus);

export default router;
