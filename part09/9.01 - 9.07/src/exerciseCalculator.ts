interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number,
}

const calculateExercises = (dailyExerciseHours: number[], targetAmount: number): Result => {
    const average = dailyExerciseHours.reduce((acc, cur) => acc + cur, 0) / dailyExerciseHours.length;

    const rating = (average: number, target: number): number => {
        if (average < target) {
            return (1);
        } else if (average === target) {
            return (2);
        } else {
            return (3);
        }
    };

    const ratingDescription = (rating: number): string => {
        if (rating === 1) {
            return ('not too bad but could be better');
        } else if (rating === 2) {
            return ('good job, you reached your target');
        } else {
            return ('excellent, you exceeded your target');
        }
    };

    const result: Result = {
        periodLength: dailyExerciseHours.length,
        trainingDays: dailyExerciseHours.reduce((acc, cur) => cur > 0 ? acc + 1 : acc, 0),
        success: average >= targetAmount,
        rating: rating(average, targetAmount),
        ratingDescription: ratingDescription(rating(average, targetAmount)),
        target: targetAmount,
        average: average,
    };

    return (result);
};

if (process.argv.length < 4) {
	throw new Error('Missing parameters');
}

const targetAmountValue = Number(process.argv[2]);
const dailyExerciseHoursValue = process.argv.slice(3).map(Number);

const result = calculateExercises(dailyExerciseHoursValue, targetAmountValue);

console.log('periodLength: ', result.periodLength);
console.log('trainingDays: ', result.trainingDays);
console.log('success: ', result.success);
console.log('rating: ', result.rating);
console.log('ratingDescription: ', result.ratingDescription);
console.log('target: ', result.target);
console.log('average: ', result.average);

export default calculateExercises;
