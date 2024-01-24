import { Patient, PatientNonSensitiveEntries } from '../utils/types';
import patientsData from '../data/patients';

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
    return (patients);
};

const getPatientNonSensitiveEntries = (): PatientNonSensitiveEntries[] => {    
    const patientsValue: PatientNonSensitiveEntries[] = patients.map((patient: Patient): PatientNonSensitiveEntries => ({
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation,
    }));

    return (patientsValue);
};

export default {
    getPatients,
    getPatientNonSensitiveEntries,
};
