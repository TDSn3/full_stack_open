import { NewPatient, Patient, PatientNonSensitiveEntries, Gender, Entry, Diagnosis, EntryWithoutId, HealthCheckRating, SickLeaveOccupationalHealthcareEntry, DischargeHospitalEntry } from '../utils/types';
import patientsData from '../data/patients';
import { v1 as uuid } from 'uuid';

const isString = (value: unknown): value is string => {
    return (typeof value === 'string' || value instanceof String);
};

const parseString = (value: unknown): string => {
    if (!isString(value)) {
        throw new Error('Incorrect or missing string');
      }
    
      return (value);
};

const isEntry = (_value: unknown): _value is Entry => {    
    return (true);
};

const parseEntryArray = (value: unknown): Entry[] => {
    if (!Array.isArray(value)) {
        throw new Error('Incorrect or missing Entry array');
    }

    const parsedEntryArray = value.map(((valueValue) => {
            if (isEntry(valueValue)) {
                return (valueValue);
            } else {
                throw new Error('Incorrect or missing Entry');
            }
        }));

    return (parsedEntryArray);
};

const patientTypeGuard = (object: unknown): Patient => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }

    if ('id' in object
        && 'name' in object
        && 'dateOfBirth' in object
        && 'ssn' in object
        && 'gender' in object
        && 'occupation' in object
        && 'entries' in object)
    {        
        const patient: Patient = {
            id: parseString(object.id),
            name: parseString(object.name),
            dateOfBirth: parseString(object.dateOfBirth),
            ssn: parseString(object.ssn),
            gender: parseString(object.gender),
            occupation: parseString(object.occupation),
            entries: parseEntryArray(object.entries),
        };

        return (patient);
    } else if ('id' in object
        && 'name' in object
        && 'dateOfBirth' in object
        && 'ssn' in object
        && 'gender' in object
        && 'occupation' in object
        && !('entries' in object))
    {
        const patient: Patient = {
            id: parseString(object.id),
            name: parseString(object.name),
            dateOfBirth: parseString(object.dateOfBirth),
            ssn: parseString(object.ssn),
            gender: parseString(object.gender),
            occupation: parseString(object.occupation),
            entries: [],
        };

        return (patient);
    }

    throw new Error('Incorrect data: a field missing');
};

const patientArrayTypeGuard = (array: unknown): Patient[] => {
    if ( !array || !Array.isArray(array) ) {
        throw new Error('Incorrect or missing data');
    }

    const parsedEntryArray = array.map((arrayValue) => (patientTypeGuard(arrayValue)));

    return (parsedEntryArray);
};

const patients: Patient[] = patientArrayTypeGuard(patientsData);

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

const findById = (id: string): Patient | undefined => {
    const patient = patients.find((patientValue) => patientValue.id === id);

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
            entries: [],          
        };

        return (newPatient);
    }

    throw new Error('Incorrect data: some fields are missing');
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<Diagnosis['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const addPatientEntry = ( patient: Patient, data: EntryWithoutId ): Entry => {    
    const newEntry: Entry = {
        id: uuid(),
        ...data,
    };

    patient.entries.push(newEntry);

    return (newEntry);
};

const entryWithoutIdTypeGuard = (object: unknown): EntryWithoutId => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }

    if ('description' in object
        && 'date' in object
        && 'specialist' in object)
    {        
        let diagnosisCodes: Array<Diagnosis['code']>;
        if ('diagnosisCodes' in object) {
            diagnosisCodes = object.diagnosisCodes as Array<Diagnosis['code']>;
        } else {
            diagnosisCodes = [];
        }
        if ('type' in object
            && 'healthCheckRating' in object) {
            const entry: EntryWithoutId = {
                description: parseString(object.description),
                date: parseString(object.date),
                specialist: parseString(object.specialist),
                diagnosisCodes: diagnosisCodes,
                type: "HealthCheck",
                healthCheckRating: object.healthCheckRating as HealthCheckRating,
            };
                
            return (entry);
        } else if ('type' in object
            && 'employerName' in object) {
            const entry: EntryWithoutId = {
                description: parseString(object.description),
                date: parseString(object.date),
                specialist: parseString(object.specialist),
                diagnosisCodes: diagnosisCodes,
                type: "OccupationalHealthcare",
                employerName: parseString(object.employerName),
            };

            if ('sickLeave' in object) {
                entry.sickLeave = object.sickLeave as SickLeaveOccupationalHealthcareEntry;
            }
                
            return (entry);
        } else if ('type' in object
        && 'discharge' in object) {
            const entry: EntryWithoutId = {
                description: parseString(object.description),
                date: parseString(object.date),
                specialist: parseString(object.specialist),
                diagnosisCodes: diagnosisCodes,
                type: "Hospital",
                discharge: object.discharge as DischargeHospitalEntry,
            };
                
            return (entry);
        }
    }

    throw new Error('Incorrect data: a field missing');
};

export default {
    getPatients,
    getPatientNonSensitiveEntries,
    findById,
    addPatient,
    toNewPatient,
    parseDiagnosisCodes,
    addPatientEntry,
    entryWithoutIdTypeGuard,
};
