import { useState } from "react";

interface ChatHistory {
  history: string[];
  onSelectItem: (item: string) => void;
}
function ChatHistory({ history, onSelectItem }: ChatHistory) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <ul className="list-group overflow-auto">
        {history.length === 0 && <li>No Chat Found</li>}
        {history.map((chat, index) => (
          <li
            id={selectedIndex === index ? "selected-root" : "chathistory-root"}
            key={index}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(chat);
            }}
            className="list-group-item list-item border-0"
            style={{ wordBreak: "break-word" }}
          >
            {selectedIndex === index ? "Hi there" : chat}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ChatHistory;
