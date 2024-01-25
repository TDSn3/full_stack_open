import { Part } from '../utils/types';
import { v1 as uuid } from 'uuid';

interface ContentProps {
	courseParts: Part[],
}

const Content = (props: ContentProps) => {
	return (<>
		{
			props.courseParts.map((value, index) => (
				<p key={uuid()}>
					{value.name} {index}
				</p>
			))
		}
	</>);
};

export default Content;
