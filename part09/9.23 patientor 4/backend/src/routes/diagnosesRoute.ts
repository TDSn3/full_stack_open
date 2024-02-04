import express from 'express';
import { Diagnosis } from '../utils/types';
import diagnosesData from '../data/diagnoses';

const router = express.Router();

router.get('/', (_req, res) => {
  const diagnoses: Diagnosis[] = diagnosesData;
  
  res.json(diagnoses);
});

export default router;
