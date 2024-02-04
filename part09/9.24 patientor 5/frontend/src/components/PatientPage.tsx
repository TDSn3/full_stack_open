import { useState } from "react";
import { useLocation } from 'react-router-dom';
import patientService from '../services/patients';
import diagnosisService from '../services/diagnosis';
import { Patient } from '../types';
import { Diagnosis } from "../EntryType";

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
				{
					patient.entries.map((entrieValue) => {
						return (
							<div key={entrieValue.id}>
								<p>{entrieValue.type}</p>
								<p>{entrieValue.date}: {entrieValue.description}</p>
								<ul>
								{
									entrieValue.diagnosisCodes ?
										entrieValue.diagnosisCodes?.map((value, index) => {
											return (<li key={entrieValue.id + index}>
													{value} {props.diagnoses.find((diagnosis) => diagnosis.code === value)?.name}
												</li>);
										}, 0)
									: null
								}
								</ul>
							</div>
						);
					})
				}
			</>
		);
	} else {
		return (<></>);
	}
};

export default PatientPage;
