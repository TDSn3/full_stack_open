import express from 'express';
import PatientServices from '../services/patientsServices';
import { NewPatient, Patient } from '../utils/types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(PatientServices.getPatientNonSensitiveEntries());
});

router.post('/', (req, res) => {
  try {
    const patientToAdd: NewPatient = PatientServices.toNewPatient(req.body);
    const newPatient: Patient = PatientServices.addPatient(patientToAdd);

    res.json(newPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';

    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }

    res.status(400).send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  res.json(PatientServices.findById(req.params.id));
});

export default router;
