import express from 'express';
import PatientServices from '../services/patientsServices';
import { NewPatient, Patient, EntryWithoutId } from '../utils/types';

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

router.post('/:id/entries', (req, res) => {
  try {
    const newEntryWithoutId: EntryWithoutId = PatientServices.entryWithoutIdTypeGuard(req.body);
    const patient = PatientServices.findById(req.params.id);
    if (patient === undefined) {
      throw new Error('No patient');
    }

    const newEntry = PatientServices.addPatientEntry( patient, newEntryWithoutId );
    res.json(newEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';

    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }

    res.status(400).send(errorMessage);    
  }
});

export default router;
