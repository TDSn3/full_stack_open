interface NotificationProps {
  message: string,
  messageClassName: string,
}

function Notification({ message, messageClassName }: NotificationProps) {
  if (message === '') {
    return (null);
  }

  return (
    <div className={messageClassName}>
      {message}
    </div>
  );
}

export default Notification;
