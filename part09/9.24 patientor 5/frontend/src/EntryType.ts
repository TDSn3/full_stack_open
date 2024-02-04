export interface Diagnosis {
	code: string,
	name: string,
	latin?: string,
}

enum HealthCheckRating {
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

interface SickLeaveOccupationalHealthcareEntry {
	startDate: string;
	endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
	type: "OccupationalHealthcare";
	employerName: string;
	sickLeave?: SickLeaveOccupationalHealthcareEntry;
}

interface DischargeHospitalEntry {
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
