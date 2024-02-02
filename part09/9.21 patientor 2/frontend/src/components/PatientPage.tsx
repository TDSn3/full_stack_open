import { useLocation } from 'react-router-dom';
import { Patient } from "../types";

const PatientPage = () => {
	const { state } = useLocation();
	const patient: Patient = state.patient;

	return (
		<>
			<h1>{patient.name}</h1>
			<p>gender: {patient.gender}</p>
			<p>ssn: {patient.ssn}</p>
			<p>occupation: {patient.occupation}</p>
		</>
	);
};

export default PatientPage;
