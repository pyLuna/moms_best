import { PlusIcon, SendIcon } from "lucide-react";
import { useRef } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const AIChatInput = ({ onSend }: { onSend: (message?: string) => void }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const size = "icon";
  return (
    <div className="flex flex-row items-end gap-2">
      <Textarea
        rows={3}
        placeholder="Ask something..."
        className="!border-b"
        ref={textAreaRef}
      />
      <div className="flex flex-col gap-2 justify-end">
        <Button
          variant="ghost"
          size={size}
        >
          <PlusIcon />
        </Button>
        <Button
          size={size}
          onClick={() => {
            onSend(textAreaRef.current?.value);
            textAreaRef.current!.value = ""; // Clear the input after sending
          }}
        >
          <SendIcon />
        </Button>
      </div>
    </div>
  );
};

export default AIChatInput;
