import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    if (!req.query.height || !req.query.weight) {
        res.send({ error: 'malformatted parameters' });
    }
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = calculateBmi(height, weight);
    res.send(JSON.stringify({ height, weight, bmi }));
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    if (!req.body.daily_exercises || !req.body.target) {
        res.send({ error: 'malformatted parameters' });
    }

    const { daily_exercises, target } = req.body;

    const dailyExercises: number[] = daily_exercises.map(Number);

    res.send(JSON.stringify(calculateExercises(dailyExercises, Number(target))));
});

const PORT = 3002;
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
