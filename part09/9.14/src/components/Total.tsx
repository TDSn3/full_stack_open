interface TotalProps {
	totalExercises: number,
}

const Total = (prop: TotalProps) => {
	return (<p> Number of exercises {prop.totalExercises}</p>);
};

export default Total;
