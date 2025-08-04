import useAiChat from "@/hooks/useAiChat";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import AIChatInput from "../chat/AIChatInput";

const AIChat = ({
  category,
  title,
  setTitle,
  content,
  setContent,
  chatHistory,
  setChatHistory,
}: {
  chatHistory: { user: string; message: string }[];
  setChatHistory: Dispatch<SetStateAction<{ user: string; message: string }[]>>;
  category: string;
  title?: string;
  setTitle?: (title: string) => void;
  content?: string;
  setContent?: (content: string) => void;
}) => {
  const [isTyping, setIsTyping] = useState(false);
  const aiChat = useAiChat({ from: "forum", category, title, content });

  const handleSend = async (message?: string) => {
    if (!category || category === "Select Category") {
      toast.error("Please select a category.");
      return;
    }
    if (!message) {
      toast.error("Message cannot be empty.");
      return;
    }

    setChatHistory((prev) => [...prev, { user: "user", message }]);
    setIsTyping(true);

    const response = await aiChat.sendMessage(message);
    setIsTyping(false);

    if (!response || !response.reply) {
      toast.error("No response from AI. Please try again.");
      return;
    }

    setTitle?.(response.suggestions.title || "");
    setContent?.(response.suggestions.content || "");
    setChatHistory((prev) => [
      ...prev,
      { user: "ai", message: response.reply || "No response from AI." },
    ]);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="grow min-h-[300px] overflow-y-auto space-y-4 rounded-md">
        {chatHistory.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Start a conversation to get AI assistance with your post
          </div>
        ) : (
          chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`flex ${
                chat.user === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  chat.user === "user"
                    ? "bg-primary text-primary-foreground ml-4"
                    : "bg-card text-card-foreground border shadow-sm mr-4"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium opacity-70">
                    {chat.user === "user" ? "You" : "AI Assistant"}
                  </span>
                </div>
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {chat.message}
                </div>
              </div>
            </div>
          ))
        )}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg px-4 py-2 bg-card text-card-foreground border shadow-sm mr-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium opacity-70">
                  AI Assistant
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-xs text-muted-foreground ml-2">
                  typing...
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <AIChatInput onSend={handleSend} />
    </div>
  );
};

export default AIChat;
