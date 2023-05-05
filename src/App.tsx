import ChatHistory from "./components/ChatHistory";
import ChatBox from "./components/ChatBox";
import ToggleButton from "./components/ToggleButton";
import "./App.css";
import { useEffect, useReducer, useState } from "react";
import ChatLog from "./components/ChatLog";
import axios from "axios";

export type History = [number, string];

export type ResponseType = {
  his: History[];
  logs: string[];
};

function App() {
  const [history, setHistory] = useState<History[]>([]);
  const [chatlog, setLog] = useState<string[]>([]);
  const [currToggle, setToggle] = useState("KMP");
  const [currHistID, setHistID] = useState(10000000);
  const [currMessage, setMessage] = useState("");
  useEffect(() => {
    async function fetchData() {
      // const response = await fetch("http://localhost:5000/chat");
      // const data = await response.json();
      // console.log(data);
      let hist_identify = 10000000;
//       axios
//     .post("http://localhost:5000/history", { hist_ID: hist_identify })
//     .then((response) => {
//       console.log(response.data);
//       // Lakukan sesuatu dengan data response
//     })
//     .catch((error) => {
//       console.error(error);
//       // Lakukan sesuatu dengan error
//       });
//     }
    axios.get('http://localhost:5000/history')
      .then(response => {
        console.log(response.data);
        setHistory(response.data);
        setHistID(response.data[0][0]);
      })
      .catch(error => {
        console.error(error);
      });
    }

    axios.post("http://localhost:5000/chat/:" + currHistID, { message: "Hello" })
    .then((response) => {
        console.log(response.data);
        setLog(response.data);
        // Do something with the response
    })
    .catch((error) => {
        console.error(error);
        // Handle the error
    });
  
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData2() {
     
    axios.post("http://localhost:5000/services/", { hist_ID: currHistID, userInput: currMessage, algorithm: currToggle })
    .then((response) => {
        console.log(response.data);
        setLog(response.data);
        // Do something with the response
    })
    .catch((error) => {
        console.error(error);
        // Handle the error
    });
  
    fetchData2();
  }}, [currMessage]);

  const handleSelectChat = (item: History) => {
    console.log(item);
    // Handle pemilihan chat disini, bakal kekirim ke be
  };

  const handleNewChat = () => {
    // const newHistory = [["New Chat", 9], ...history];
    // setHistory(newHistory);
    // Handle new chat history ke be disini
  };

  const handleSentChat = (chat: string) => {
    // const newLog = [...chatlog, chat, "Maaf fitur ngejawabnya belom jadi"];
    // setLog(newLog);
    console.log(chat);
    setMessage(chat);
    console.log(currMessage);
    //handle kirim query ke be
  };

  const handleToggle = (toggle: string) => {
    setToggle(toggle);
    console.log(currToggle);
  };

  return (
    <div id="app-root" className="mb-1 text-white vh-100 d-flex flex-column">
      <div className="row flex-grow-1">
        <div
          className="p-3 col-3 align-self-start chat-history-container"
          style={{ marginLeft: "5px" }}
        >
          <h1 style={{ marginBottom: "0.5rem" }}>ChitChat</h1>
          <button
            type="button"
            className="newchatbutton w-100"
            onClick={handleNewChat}
            style={{
              marginBottom: "0.5rem",
              marginTop: "0.5rem",
              marginLeft: "2px",
            }}
          >
            + New Chat
          </button>
          <h2
            style={{ marginBottom: "1rem", marginTop: "0.5rem", height: "3%" }}
          >
            Chat History
          </h2>
          <div className="chat-history-list">
            <ChatHistory history={history} onSelectItem={handleSelectChat} />
          </div>
          <div
            className="position-absolute bottom-0"
            style={{ marginBottom: "5px", width: "20%", marginLeft: "2%" }}
          >
            <ToggleButton onToggle={handleToggle} />
          </div>
        </div>
        <div id="chatbox" className="col vh-100 position-relative">
          <div className="row chatlog-container">
            <ChatLog log={chatlog} />
          </div>
          <div
            className="position-absolute bottom-0 w-100 chatbox-container"
            style={{ marginLeft: "10px", marginRight: "10px" }}
          >
            <ChatBox onSend={handleSentChat} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
