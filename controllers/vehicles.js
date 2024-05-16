import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';

const VEHICLE_DATA_PATH = './data/vehicles.json';
const SCENARIO_DATA_PATH = './data/scenarios.json';

export const getAllVehicles = async (req, res) => {
    try {
        const vehiclesData = await fs.readFile(VEHICLE_DATA_PATH, 'utf-8');
        const vehicles = JSON.parse(vehiclesData);

        return res.status(200).json({ success: true, vehicles })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Error getting vehicles: ' + error.message });
    }
}

export const createVehicle = async (req, res) => {
    try {
        const { name, positionX, positionY, speed, direction, scenario } = req.body;

        if (!name || !positionX || !positionY || !speed || !direction || !scenario) {
            throw new Error('Missing required vehicle data in request body.');
        }
        //Scenarios
        const scenariosData = await fs.readFile(SCENARIO_DATA_PATH, 'utf-8');
        const scenarios = JSON.parse(scenariosData);

        var scenarioIndex = scenarios.findIndex(s => s.id === scenario);

        if (scenarioIndex === -1) {
            throw new Error(`Scenario with ID ${id} not found.`);
        }

        const vehiclesData = await fs.readFile(VEHICLE_DATA_PATH, 'utf-8');
        const vehicles = JSON.parse(vehiclesData);


        const newVehicle = {
            id: uuidv4(),
            name,
            positionX,
            positionY,
            speed,
            direction,
            scenario,
        };

        scenarios[scenarioIndex].vehicles.push(newVehicle);
        vehicles.push(newVehicle);

        await fs.writeFile(SCENARIO_DATA_PATH, JSON.stringify(scenarios, null, 2), 'utf-8');
        await fs.writeFile(VEHICLE_DATA_PATH, JSON.stringify(vehicles, null, 2), 'utf-8');

        return res.status(201).json({ success: true, message: 'Vehicle created successfully!', vehicle: newVehicle });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Error creating vehicle: ' + error.message });
    }
}