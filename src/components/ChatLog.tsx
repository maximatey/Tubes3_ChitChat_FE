import { useEffect, useRef } from "react";

interface ChatLogProps {
  log: string[];
}

function ChatLog({ log }: ChatLogProps) {
  const chatLogRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (chatLogRef.current !== null) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [log]);

  return (
    <ul ref={chatLogRef} className="list-group chat-history-list overflow-auto">
      {log.length === 0 && <li>Empty</li>}
      {log.map((chat, index) => (
        <li
          id={
            index % 2 === 1
              ? "list-group-item-received"
              : "list-group-item-sent"
          }
          key={index}
          className="list-group-item border-0"
          style={{ wordBreak: "break-word" }}
        >
          {chat}
        </li>
      ))}
    </ul>
  );
}

export default ChatLog;
