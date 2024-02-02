import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import patientService from '../services/patients';
import { Patient } from '../types';

const PatientPage = () => {
	const [patient, setPatient] = useState<Patient | null>(null);
	const { state } = useLocation();

	patientService.getPatient(state.patient.id)
		.then((data) => { setPatient(data); });

	if (patient) {
		return (
			<>
				<h1>{patient.name}</h1>
				<p>gender: {patient.gender}</p>
				<p>ssn: {patient.ssn}</p>
				<p>occupation: {patient.occupation}</p>
			</>
		);
	} else {
		return (<></>);
	}
};

export default PatientPage;
