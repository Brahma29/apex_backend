import express from 'express';
import bodyParser from 'body-parser';

//Routes
import scenarioRoutes from './routes/scenarios.js';
import vehicleRoutes from './routes/vehicles.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("API is happily running...")
})

app.use('/api/v1/scenarios', scenarioRoutes);
app.use('/api/v1/vehicles', vehicleRoutes);

app.listen(5000, () => {
    console.log(`App is listening at port 5000`)
})