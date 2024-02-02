import express from 'express';
import { Diagnostic } from '../utils/types';
import diagnosesData from '../data/diagnoses';

const router = express.Router();

router.get('/', (_req, res) => {
  const diagnoses: Diagnostic[] = diagnosesData;
  
  res.json(diagnoses);
});

export default router;
