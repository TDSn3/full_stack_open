
import { useState } from 'react'

/* ************************************************************************** */
/*   																		  */
/*   Utils																	  */
/*   																		  */
/* ************************************************************************** */

const	generateRandomInt = () => (Math.floor(Math.random() * 7));

const	plusPlusToIndexValue = (object, index) =>
{
	const	copy = { ...object };

	copy[index] += 1;

	return (copy);
};

const	highestIndex = (object) =>
{
	let	stock_index = 0;

	Object.keys(object).forEach(
		(key) =>
		{
			if (object[key] > object[stock_index])
				 stock_index = key;
		}
	);

	return (stock_index);
};

/* ************************************************************************** */
/*   																		  */
/*   Components																  */
/*   																		  */
/* ************************************************************************** */

const	Button = ({ handleClick, text }) =>
{
	return (
		<button onClick={handleClick}>
			{text}
		</button>
	);
}

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

	const	handleRandomAnecdoteClick = () => ( setSelected( generateRandomInt() ) );
	const	handleVote = () => ( setPoints( plusPlusToIndexValue(points, selected) ) );

	return (
		<div>
			<h1>Anecdote of the day</h1>
			<p>{anecdotes[selected]}</p>
			<p>Has {points[selected]} votes</p>
			<Button handleClick={handleVote} text="Vote" />
			<Button handleClick={handleRandomAnecdoteClick} text="Random anecdote" />

			<h1>Anecdote with most votes</h1>
			<p>{anecdotes[ highestIndex(points) ]}</p>
			<p>Has {points[ highestIndex(points) ]} votes</p>
		</div>
	);
}

export default App
