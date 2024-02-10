import { useState } from "react";
import { useLocation } from 'react-router-dom';
import patientService from '../services/patients';
import diagnosisService from '../services/diagnosis';
import { Patient } from '../types';
import { Diagnosis } from "../EntryType";
import EntryComp from "./EntryComp";

interface PropsPatientPage {
	diagnoses: Diagnosis[],
	setDiagnoses: React.Dispatch<React.SetStateAction<Diagnosis[]>>,
}

const PatientPage = (props: PropsPatientPage) => {
	const [patient, setPatient] = useState<Patient | null>(null);
	const { state } = useLocation();

	patientService.getPatient(state.patient.id)
		.then((data) => { setPatient(data); });

	diagnosisService.getAllDiagnosis()
		.then((data) => { props.setDiagnoses(data); });

	if (patient) {
		return (
			<>
				<h1>{patient.name}</h1>
				<p>gender: {patient.gender}</p>
				<p>ssn: {patient.ssn}</p>
				<p>occupation: {patient.occupation}</p>
				<h3>entries</h3>
				<EntryComp entries={patient.entries} diagnosis={props.diagnoses} />
			</>
		);
	} else {
		return (<></>);
	}
};

export default PatientPage;
