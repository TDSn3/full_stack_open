import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Entry, Diagnosis, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../EntryType";

interface EntryDetailsProps {
	entries: Entry,
}

interface HospitalEntryCompProps {
	entries: HospitalEntry,
}

const HospitalEntryComp = (props: HospitalEntryCompProps) => {
	return (
		<Card sx={{ minWidth: 275, marginBottom: 2, background: '#eeeeee' }}>
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
					{props.entries.date}
				</Typography>

				<Typography variant="h6" component="div">
					{props.entries.description}
				</Typography>
				
				<Typography variant="body2" component="div">
					DischargeHospitalEntry: <p>{props.entries.discharge.date}</p> <p>{props.entries.discharge.criteria}</p>
				</Typography>

				<Typography variant="body2">
					diagnose by {props.entries.specialist}
				</Typography>
			</CardContent>
		</Card>
	);
};

interface HealthCheckEntryCompProps {
	entries: HealthCheckEntry,
}

const HealthCheckEntryComp = (props: HealthCheckEntryCompProps) => {	
	return (
		<Card sx={{ minWidth: 275, marginBottom: 2, background: '#eeeeee' }}>
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
					{props.entries.date}
				</Typography>

				<Typography variant="h6" component="div">
					{props.entries.description}
				</Typography>
				
				<Typography variant="h6" component="div">
					HealthCheckRating: {props.entries.healthCheckRating}
				</Typography>

				<Typography variant="body2">
					diagnose by {props.entries.specialist}
				</Typography>
			</CardContent>
		</Card>
	);
};

interface OccupationalHealthcareEntryCompProps {
	entries: OccupationalHealthcareEntry,
}

const OccupationalHealthcareEntryComp = (props: OccupationalHealthcareEntryCompProps) => {
	return (
		<Card sx={{ minWidth: 275, marginBottom: 2, background: '#eeeeee' }}>
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
					{props.entries.date}
				</Typography>

				<Typography variant="h6" component="div">
					{props.entries.description}
				</Typography>
				
				<Typography variant="h6" component="div">
					employerName: {props.entries.employerName}
				</Typography>

				<Typography variant="body2">
					diagnose by {props.entries.specialist}
				</Typography>
			</CardContent>
		</Card>
	);
};

const assertNever = (value: never): never => {
	throw new Error(
		`Error: ${JSON.stringify(value)}`
	);
};

const EntryDetails = (props: EntryDetailsProps) => {
	switch (props.entries.type) {
		case "Hospital":
			return (<HospitalEntryComp entries={props.entries} />);
		case "HealthCheck":
			return (<HealthCheckEntryComp entries={props.entries} />);
		case "OccupationalHealthcare":
			return (<OccupationalHealthcareEntryComp entries={props.entries} />);
		default:
			return (assertNever(props.entries));
	}
};

interface EntryProps {
	entries: Entry[],
	diagnosis: Diagnosis[],
}

const EntryComp = (props: EntryProps) => {
	return (
		<>
			{
				props.entries.map((entrieValue) => {
					return (<EntryDetails key={entrieValue.id} entries={entrieValue} />);
				})
			}
		</>
	);
};

export default EntryComp;
