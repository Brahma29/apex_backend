import express from 'express';
import { createScenario, deleteScenario, getAllScenarios, updateScenario } from '../controllers/scenarios.js';

const router = express.Router();

router.route('/').post(createScenario).get(getAllScenarios);
router.route('/:id').put(updateScenario).delete(deleteScenario);

export default router;