import { useState } from "react";

interface ChatBox {
  onSend: (text: string) => void;
}

function ChatBox({ onSend }: ChatBox) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      // Handle sending message logic
      onSend(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="chatbox-container">
      <div className="input-group chat-input">
        <input
          id="chatbox-style"
          type="text"
          className="form-control"
          aria-label="default input example"
          placeholder="Type your message here..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <div className="input-group-append">
          <button
            className="sendchatbutton"
            type="button"
            onClick={() => {
              onSend(inputValue);
              setInputValue("");
            }}
          >
            /\
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
