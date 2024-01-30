
interface ButtonProps {
	handleClick: ()=>void,
	text: string,
}

const	Button = (props: ButtonProps) =>
{
	return (
		<button onClick={props.handleClick}>
			{props.text}
		</button>
	);
};

export default Button;
