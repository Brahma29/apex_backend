import express from 'express';
import { createVehicle, getAllVehicles } from '../controllers/vehicles.js';

const router = express.Router();

router.route('/').post(createVehicle).get(getAllVehicles);

export default router;