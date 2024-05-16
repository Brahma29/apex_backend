import express from 'express';
import { createVehicle, deleteVehicle, getAllVehicles, updateVehicle } from '../controllers/vehicles.js';

const router = express.Router();

router.route('/').post(createVehicle).get(getAllVehicles);
router.route('/:id').put(updateVehicle).delete(deleteVehicle);

export default router;