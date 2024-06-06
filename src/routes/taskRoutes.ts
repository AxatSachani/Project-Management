import { Router } from 'express'
import { createTask, getTasksByProject, getTaskByID, updateTask, deleteTask } from '../controllers/taskController';
import { authorizeRole } from '../middleware/authorizeRole';

const router = Router()

router.post('/:projectID', authorizeRole(['admin', 'project_manager']), createTask);
router.get('/:projectID', authorizeRole(['admin', 'project_manager', 'team_member']), getTasksByProject);
router.get('/:projectID/:taskID', authorizeRole(['admin', 'project_manager', 'team_member']), getTaskByID);
router.patch('/:projectID/:taskID', authorizeRole(['admin', 'project_manager']), updateTask);
router.delete('/:projectID/:taskID', authorizeRole(['admin', 'project_manager']), deleteTask);

export default router;