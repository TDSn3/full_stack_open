export interface Diagnostic {
	code: string,
	name: string,
	latin?: string,
}

export interface Patient {
	id: string,
	name: string,
	dateOfBirth: string,
	ssn: string,
	gender: string,
	occupation: string,
}

export type PatientNonSensitiveEntries = Omit<Patient, 'ssn'>;
