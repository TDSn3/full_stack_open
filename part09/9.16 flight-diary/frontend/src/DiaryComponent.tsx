import { Diary } from './types';

interface DiaryComponentProps {
	diary: Diary,
}

const DiaryComponent = (props: DiaryComponentProps) => {
	return (
		<>
			<h3>{props.diary.date}</h3>
			<p>{props.diary.visibility}<br/>{props.diary.weather}</p>
		</>
	);
};

export default DiaryComponent;
