export interface Diagnosis {
	code: string,
	name: string,
	latin?: string,
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

export interface HealthCheckEntry extends BaseEntry {
	type: "HealthCheck";
	healthCheckRating: HealthCheckRating;
}

interface SickLeaveOccupationalHealthcareEntry {
	startDate: string;
	endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
	type: "OccupationalHealthcare";
	employerName: string;
	sickLeave?: SickLeaveOccupationalHealthcareEntry;
}

interface DischargeHospitalEntry {
	date: string;
	criteria: string;
}

export interface HospitalEntry extends BaseEntry {
	type: "Hospital";
	discharge: DischargeHospitalEntry;
}

export type Entry =
	| HealthCheckEntry
	| OccupationalHealthcareEntry
	| HospitalEntry;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;