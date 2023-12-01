
import React from 'react'

import Part from "./Part.jsx"

const	Content = (props) =>
{
	return (
		<>
		 	{props.course.parts.map( part_it =>
				<Part key={part_it.id} part={part_it.name} exercises={part_it.exercises}/>
			)}
		</>
	);
}

export default Content
