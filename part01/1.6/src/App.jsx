
import { useState } from 'react'

const	Button = ({ handleClick, text }) =>
{
	return (
		<button onClick={handleClick}>
			{text}
		</button>
	);
}

const	Score = ({ title, value }) =>
{
	return (
		<p>{title}: {value}</p>
	);
}

const	App = () =>
{
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleGoodClick = () => setGood(good + 1);
	const handleNeutralClick = () => setNeutral(neutral + 1);
	const handleBadClick = () => setBad(bad + 1);

	return (
		<div>
			<h1>Give feedback</h1>

			<Button handleClick={handleGoodClick} text="Good" />
			<Button handleClick={handleNeutralClick} text="Neutral" />
			<Button handleClick={handleBadClick} text="Bad" />

			<h2>Statistics</h2>

			<Score title="Good" value={good} />
			<Score title="Neutral" value={neutral} />
			<Score title="Bad" value={bad} />
		</div>
	);
}

export default App
