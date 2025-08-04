import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import AIChat from "./AIChat";

const DialogAIChat = ({
  open,
  setOpen,
  category,
  title,
  setTitle,
  content,
  setContent,
  chatHistory,
  setChatHistory,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  category: string;
  title?: string;
  setTitle?: (title: string) => void;
  content?: string;
  setContent?: (content: string) => void;
  chatHistory: { user: string; message: string }[];
  setChatHistory: Dispatch<SetStateAction<{ user: string; message: string }[]>>;
}) => {
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>AI Chat</DialogTitle>
        </DialogHeader>
        <div className="">
          <AIChat
            category={category}
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAIChat;
