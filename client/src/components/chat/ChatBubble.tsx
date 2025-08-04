const ChatBubble = ({
  message,
  isUser,
}: {
  message: string;
  isUser: boolean;
}) => {
  return (
    <div
      className={`flex items-start gap-2 p-2 rounded-lg ${
        isUser ? "bg-blue-100 self-end" : "bg-gray-100 self-start"
      }`}
    >
      <div className="text-sm">{message}</div>
    </div>
  );
};

export default ChatBubble;
