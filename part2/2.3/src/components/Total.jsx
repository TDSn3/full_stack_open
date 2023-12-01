
import React from 'react'

const	Total = (props) =>
{
	const accumulationCallback = (accumulator, currentValue) =>
	{
		return (accumulator + currentValue.exercises)
	};

	return (
		<div>
			<p style={{fontWeight: 'bold'}} >
				Number of exercises {props.course.parts.reduce(accumulationCallback, 0)}
			</p>
		</div>
	);
}

export default Total
