
import React from 'react'

import Header from "./Header.jsx"
import Content from "./Content.jsx"
import Total from "./Total.jsx"

const	Course = ( props ) =>
{
	return (
		<>
			<Header course={props.course} />
			<Content course={props.course} />
			<Total course={props.course} />
		</>
	);
}

export default Course
