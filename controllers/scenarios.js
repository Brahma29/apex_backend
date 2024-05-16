import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

const DATA_PATH = './data/scenarios.json';

export const getAllScenarios = async (req, res) => {
    try {
        const scenariosData = await fs.readFile(DATA_PATH, 'utf-8');
        const scenarios = JSON.parse(scenariosData);

        return res.status(200).json({ success: true, scenarios })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Error getting scenarios: ' + error.message });
    }
}

export const createScenario = async (req, res) => {
    try {
        const { name, time } = req.body;

        if (!name || !time) {
            throw new Error('Missing required scenario data in request body.');
        }

        const scenariosData = await fs.readFile(DATA_PATH, 'utf-8');
        const scenarios = JSON.parse(scenariosData);

        const newScenario = {
            id: uuidv4(),
            name,
            time,
            vehicles: []
        }

        scenarios.push(newScenario);

        await fs.writeFile(DATA_PATH, JSON.stringify(scenarios, null, 2), 'utf-8');

        return res.status(201).json({ success: true, message: 'Scenario created successfully!', scenario: newScenario });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Error creating scenario: ' + error.message });
    }
}

export const updateScenario = async (req, res) => {
    try {
        const { name, time } = req.body;
        const { id } = req.params;

        if (!id || (!name && !time)) {
            throw new Error('Missing required scenario data (id is mandatory, at least one of name or time is required).');
        }

        const scenariosData = await fs.readFile(DATA_PATH, 'utf-8');
        const scenarios = JSON.parse(scenariosData);

        const scenarioIndex = scenarios.findIndex(scenario => scenario.id === id);

        if (scenarioIndex === -1) {
            throw new Error(`Scenario with ID ${id} not found.`);
        }

        const updatedScenario = {
            ...scenarios[scenarioIndex],
            name: name || scenarios[scenarioIndex].name,
            time: time || scenarios[scenarioIndex].time,
        };

        scenarios[scenarioIndex] = updatedScenario;

        await fs.writeFile(DATA_PATH, JSON.stringify(scenarios, null, 2), 'utf-8');

        return res.status(200).json({ success: true, message: 'Scenario updated successfully!', scenario: updatedScenario });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Error updating scenario: ' + error.message });
    }
};

export const deleteScenario = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new Error('Missing required scenario ID in request body.');
        }

        const scenariosData = await fs.readFile(DATA_PATH, 'utf-8');
        const scenarios = JSON.parse(scenariosData);

        const scenarioIndex = scenarios.findIndex(scenario => scenario.id === id);

        if (scenarioIndex === -1) {
            throw new Error(`Scenario with ID ${id} not found.`);
        }

        scenarios.splice(scenarioIndex, 1);

        await fs.writeFile(DATA_PATH, JSON.stringify(scenarios, null, 2), 'utf-8');

        return res.status(200).json({ success: true, message: 'Scenario deleted successfully!' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Error deleting scenario: ' + error.message });
    }
}