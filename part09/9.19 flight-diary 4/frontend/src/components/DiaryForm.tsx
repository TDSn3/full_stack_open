

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
					Date: <input type="date" value={props.newDate} onChange={props.handleNewDateOnChange} />
				</div>
				<div>
					Visibility: 
					<input
						type="radio"
						value='great'
						onChange={props.handleNewVisibilityOnChange}
						name="visibility"
						checked={props.newVisibility === 'great'}
					/>
					<label>great</label>

					<input
						type="radio"
						value='good'
						onChange={props.handleNewVisibilityOnChange}
						name="visibility"
						checked={props.newVisibility === 'good'}
					/>
					<label>good</label>

					<input
						type="radio"
						value='ok'
						onChange={props.handleNewVisibilityOnChange}
						name="visibility"
						checked={props.newVisibility === 'ok'}
					/>
					<label>ok</label>

					<input
						type="radio"
						value='poor'
						onChange={props.handleNewVisibilityOnChange}
						name="visibility"
						checked={props.newVisibility === 'poor'}
					/>
					<label>poor</label>
				</div>

				<div>
					Weather:
					<input
						type="radio"
						value='sunny'
						onChange={props.handleNewWeatherOnChange}
						name="weather"
						checked={props.newWeather === 'sunny'}
					/>
					<label>sunny</label>

					<input
						type="radio"
						value='rainy'
						onChange={props.handleNewWeatherOnChange}
						name="weather"
						checked={props.newWeather === 'rainy'}
					/>
					<label>rainy</label>

					<input
						type="radio"
						value='cloudy'
						onChange={props.handleNewWeatherOnChange}
						name="weather"
						checked={props.newWeather === 'cloudy'}
					/>
					<label>cloudy</label>

					<input
						type="radio"
						value='stormy'
						onChange={props.handleNewWeatherOnChange}
						name="weather"
						checked={props.newWeather === 'stormy'}
					/>
					<label>stormy</label>

					<input
						type="radio"
						value='windy'
						onChange={props.handleNewWeatherOnChange}
						name="weather"
						checked={props.newWeather === 'windy'}
					/>
					<label>windy</label>
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
