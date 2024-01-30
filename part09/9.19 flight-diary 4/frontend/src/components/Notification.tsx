
interface NotificationProps {
	message: string,
	messageClassName: string,
}

const Notification = (props: NotificationProps) =>
{	
	if (props.message === '') {
		return (<></>)
	} else {
		return (
			<div className={props.messageClassName}>
				{props.message}
			</div>
		)
	}
}

export default Notification
