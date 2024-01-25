import { CoursePart } from '../utils/types';
import Part from './Part';
import { v1 as uuid } from 'uuid';

interface ContentProps {
	courseParts: CoursePart[],
}

const Content = (props: ContentProps) => {
	return (<>
		{
			props.courseParts.map((value) => (
				<Part key={uuid()} coursePart={value} />
			))
		}
	</>);
};

export default Content;
