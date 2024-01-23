const calculateBmi = (height: number, mass: number): string => {
	const bmi = mass / ((height / 100) * (height / 100))

	if (bmi < 18.5) {
		return ('Underweight')
	} else if (bmi < 25) {
		return ('Normal (healthy weight)')
	} else if (bmi < 30) {
		return ('Overweight')
	} else {
		return ('Obese')
	}
}

// if (!process.argv[2] || !process.argv[3]) {
// 	throw new Error('Missing parameters')
// }

// console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])))

export default calculateBmi
