import { NewPatient, Patient, PatientNonSensitiveEntries, Gender } from '../utils/types';
import patientsData from '../data/patients';
import { v1 as uuid } from 'uuid';

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

const findById = (id: number): Patient | undefined =>{
    const patient = patients.find((patientValue) => Number(patientValue.id) === id);

    return (patient);
};

const addPatient = ( data: NewPatient ): Patient => {    
    const newPatient: Patient = {
        id: uuid(),
        ...data,
    };

    patients.push(newPatient);

    return (newPatient);
};

const isString = (value: unknown): value is string => {
    return (typeof value === 'string' || value instanceof String);
};

const parseValue = (value: unknown): string => {
    if (!isString(value)) {
        throw new Error('Incorrect value');
    }

    return (value);
};

const isGender = (value: string): value is Gender => {
    return (Object.values(Gender)
        .map(v => v.toString()).includes(value));
};

const parseGender = (value: unknown): Gender => {
    if (!isString(value) || !isGender(value)) {
        throw new Error('Incorrect value');
    }

    return (value);
};

const toNewPatient = (reqBody: unknown): NewPatient => {
    if (!reqBody || typeof reqBody !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in reqBody
        && 'dateOfBirth' in reqBody
        && 'ssn' in reqBody
        && 'dateOfBirth' in reqBody
        && 'gender' in reqBody
        && 'occupation' in reqBody
    ) {
        const newPatient: NewPatient = {
            name: parseValue(reqBody.name),
            dateOfBirth: parseValue(reqBody.dateOfBirth),
            ssn: parseValue(reqBody.ssn),
            gender: parseGender(reqBody.gender),
            occupation: parseValue(reqBody.occupation),           
        };

        return (newPatient);
    }

    throw new Error('Incorrect data: some fields are missing');
};

export default {
    getPatients,
    getPatientNonSensitiveEntries,
    findById,
    addPatient,
    toNewPatient,
};
