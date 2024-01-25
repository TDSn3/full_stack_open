import { CourseName } from '../utils/types'

const Header = (props: CourseName) => {
	return (<>
		<h1>{props.name}</h1>
	</>);
};

export default Header;
