import { Router } from "express";
import { createProject, getProjects, getProjectByID, updateProject, deleteProject } from "../controllers/projectController";
import { authorizeRole } from "../middleware/authorizeRole";

const router = Router()

router.post('/', authorizeRole(['admin', 'project_manager']), createProject);
router.get('/', authorizeRole(['admin', 'project_manager', 'team_member']), getProjects);
router.get('/:projectID', authorizeRole(['admin', 'project_manager', 'team_member']), getProjectByID);
router.patch('/:projectID', authorizeRole(['admin', 'project_manager']), updateProject);
router.delete('/:projectID', authorizeRole(['admin']), deleteProject);

export default router;