
import { useState } from 'react'

const	Button = ({ handleClick, text }) =>
{
	return (
		<button onClick={handleClick}>
			{text}
		</button>
	);
}

const	GenerateRandomInt = () => (Math.floor(Math.random() * 7));

const	App = () =>
{
	const	anecdotes = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
	];

	const	rawPoints =
	{
		0:	0,
		1:	0,
		2:	0,
		3:	0,
		4:	0,
		5:	0,
		6:	0
	};

	const	[selected, setSelected] = useState(0);
	const	[points, setPoints] = useState(rawPoints);

	const	copy = { ...points };

	const	plusCopy = () =>
	{
		copy[selected] += 1;
		return (copy);
	};

	const	handleRandomAnecdoteClick = () => ( setSelected(GenerateRandomInt()) );
	const	handleVote = () => ( setPoints(plusCopy()) );

	return (
		<div>
			<h1>{anecdotes[selected]}</h1>

			<p>Has {points[selected]} votes</p>
			<Button handleClick={handleVote} text="Vote" />
			<Button handleClick={handleRandomAnecdoteClick} text="Random anecdote" />
		</div>
	);
}

export default App
