
import { useState } from 'react'

const	Button = ({ handleClick, text }) =>
{
	return (
		<button onClick={handleClick}>
			{text}
		</button>
	);
}

const	StatisticLine = ({ title, value }) =>
{	
	if (isNaN(value))
		value = 0;
	
	if (title === "Positive")
	{
		return (
			<p>{title}: {value} %</p>
		);
	}
	else
	{
		return (
			<p>{title}: {value}</p>
		);
	}
}

const	Statistics = ({ good, neutral, bad }) =>
{	
	if (good + neutral + bad > 0)
	{
		return (
			<>
				<h2>Statistics</h2>

				<StatisticLine title="Good" value={good} />
				<StatisticLine title="Neutral" value={neutral} />
				<StatisticLine title="Bad" value={bad} />
				<StatisticLine title="All" value={good + neutral + bad} />
				<StatisticLine title="Average" value={((good * 1) + (neutral * 0) + (bad * -1)) / (good + neutral + bad)} />
				<StatisticLine title="Positive" value={good * 100 / (good + neutral + bad)} />
			</>
		);
	}
	else
	{
		return (
			<>
				<h2>Statistics</h2>
				<p>No feedback given</p>
			</>
		);
	}
}

const	App = () =>
{		
	const	[good, setGood] = useState(0);
	const	[neutral, setNeutral] = useState(0);
	const	[bad, setBad] = useState(0);

	const	handleGoodClick = () => setGood(good + 1);
	const	handleNeutralClick = () => setNeutral(neutral + 1);
	const	handleBadClick = () => setBad(bad + 1);

	return (
		<div>
			<h1>Give feedback</h1>

			<Button handleClick={handleGoodClick} text="Good" />
			<Button handleClick={handleNeutralClick} text="Neutral" />
			<Button handleClick={handleBadClick} text="Bad" />

			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
}

export default App
