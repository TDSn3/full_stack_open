import express from 'express';
import PatienServices from '../services/patientsServices';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(PatienServices.getPatientNonSensitiveEntries());
});

export default router;
