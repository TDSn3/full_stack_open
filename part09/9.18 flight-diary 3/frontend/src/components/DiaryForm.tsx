

interface DiaryFormProps {
	handleAddDiary: (event: React.SyntheticEvent) => void,

	newDate: string,
	handleNewDateOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void,

	newVisibility: string,
	handleNewVisibilityOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void,

	newWeather: string,
	handleNewWeatherOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void,

	newComment: string,
	handleNewCommentOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const DiaryForm = (props: DiaryFormProps) =>
{	
	return (
			<form onSubmit={props.handleAddDiary}>
				<div>
					Date: <input value={props.newDate} onChange={props.handleNewDateOnChange} />
				</div>
				<div>
				Visibility: <input value={props.newVisibility} onChange={props.handleNewVisibilityOnChange} />
				</div>
				<div>
				Weather: <input value={props.newWeather} onChange={props.handleNewWeatherOnChange} />
				</div>
				<div>
				Comment: <input value={props.newComment} onChange={props.handleNewCommentOnChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
		);
};

export default DiaryForm;
