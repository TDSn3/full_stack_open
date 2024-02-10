export interface Diagnosis {
	code: string,
	name: string,
	latin?: string,
}

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

export enum HealthCheckRating {
	"Healthy" = 0,
	"LowRisk" = 1,
	"HighRisk" = 2,
	"CriticalRisk" = 3
}

interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HealthCheckEntry extends BaseEntry {
	type: "HealthCheck";
	healthCheckRating: HealthCheckRating;
}

export interface SickLeaveOccupationalHealthcareEntry {
	startDate: string;
	endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
	type: "OccupationalHealthcare";
	employerName: string;
	sickLeave?: SickLeaveOccupationalHealthcareEntry;
}

export interface DischargeHospitalEntry {
	date: string;
	criteria: string;
}

interface HospitalEntry extends BaseEntry {
	type: "Hospital";
	discharge: DischargeHospitalEntry;
}

export type Entry =
	| HealthCheckEntry
	| OccupationalHealthcareEntry
	| HospitalEntry;

export interface Patient {
	id: string,
	name: string,
	dateOfBirth: string,
	ssn: string,
	gender: string,
	occupation: string,
	entries: Entry[],
}

export type NewPatient = Omit<Patient, 'id'>;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export type PatientNonSensitiveEntries = Omit<Patient, 'ssn' | 'entries'>;
