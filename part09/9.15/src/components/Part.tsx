import { CoursePart } from '../utils/types';
import { v1 as uuid } from 'uuid';

interface PartProps {
    coursePart: CoursePart,
}

const Part = (props: PartProps) => {
    const part = () => {
        switch (props.coursePart.kind) {
            case "basic":
                return (
                    <>
                        <h1>{props.coursePart.name} {props.coursePart.exerciseCount}</h1>
                        <p>{props.coursePart.description}</p>
                    </>
                );
            case "group":
                return (
                    <>
                        <h1>{props.coursePart.name} {props.coursePart.exerciseCount}</h1>
                        <p>project exercises {props.coursePart.groupProjectCount}</p>
                    </>
                );
            case "background":
                return (
                    <>
                        <h1>{props.coursePart.name} {props.coursePart.exerciseCount}</h1>
                        <p>{props.coursePart.description}</p>
                        <p>submit to {props.coursePart.backgroundMaterial}</p>
                    </>
                );
            case "special":
                return (
                    <>
                        <h1>{props.coursePart.name} {props.coursePart.exerciseCount}</h1>
                        <p>{props.coursePart.description}</p>
                        {props.coursePart.requirements.map((value) => <span key={uuid()} >{value} </span>)}
                    </>
                );
            default:
                break;
        }
    }

    return (<>{part()}</>);
};

export default Part;
