import { useState } from "react";
import { useLocation } from 'react-router-dom';
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnosis';
import { Patient } from '../../types';
import { Diagnosis, EntryWithoutId } from "../../EntryType";
import EntryComp from "../EntryComp";
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { Button } from '@mui/material';
import AddEntryModal from "../AddEntryModal";

interface PropsPatientPage {
  diagnoses: Diagnosis[],
  setDiagnoses: React.Dispatch<React.SetStateAction<Diagnosis[]>>,
}

const PatientPage = (props: PropsPatientPage) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const { state } = useLocation();

  const { patientId } = useParams();

  const handleOpenModal = (): void => setModalOpen(true);

  const handleCloseModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryWithoutId) => {
  try {
    const entry = await patientService.addPatientEntry(patientId as string, values);
    const patientUpdate = { ...patient } as Patient;
    patientUpdate.entries?.push(entry);
    setPatient(patientUpdate);
    setModalOpen(false);
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      if (e?.response?.data && typeof e?.response?.data === "string") {
        const message = e.response.data.replace('Something went wrong. Error: ', '');
        console.error(message);
        setError(message);
      } else {
        setError("Unrecognized axios error");
      }
      } else {
      console.error("Unknown error", e);
      setError("Unknown error");
      }		
  }
  };

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

        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={handleCloseModal}
        />
        <Button variant="contained" onClick={() => handleOpenModal()}>
          Add New Entry
        </Button>

        <h3>entries</h3>
        <EntryComp entries={patient.entries} diagnosis={props.diagnoses} />
      </>
    );
  } else {
    return (<></>);
  }
};

export default PatientPage;
