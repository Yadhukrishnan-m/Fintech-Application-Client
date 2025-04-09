import type React from "react";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export function MessageInput({
  onSendMessage,
}: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() ) {
      onSendMessage(message.trim());
      setMessage("");

      
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t p-3 flex items-end gap-2 bg-white"
    >
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className="resize-none min-h-[60px] max-h-[120px]"
       
      />
      <Button
        type="submit"
        size="icon"
        className="bg-teal-500 hover:bg-teal-600 h-[60px] w-[60px]"
        disabled={!message.trim() }
      >
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
}
