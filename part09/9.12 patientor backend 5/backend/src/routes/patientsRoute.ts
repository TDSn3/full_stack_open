import express from 'express';
import PatienServices from '../services/patientsServices';
import { NewPatient, Patient } from '../utils/types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(PatienServices.getPatientNonSensitiveEntries());
});

router.post('/', (req, res) => {
  try {
    const patientToAdd: NewPatient = PatienServices.toNewPatient(req.body);
    const newPatient: Patient = PatienServices.addPatient(patientToAdd);

    res.json(newPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';

    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }

    res.status(400).send(errorMessage);
  }
});

export default router;
