import { useState } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: "bot", text: "Welcome! How can I help you?" }]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });

      const data = await response.json();
      const botMessage = { sender: "bot", text: data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    }

    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4">
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all ${
          isOpen ? "hidden" : "block"
        }`}
      >
        <FaRobot size={24} />
      </button>

      {/* Chatbot Sliding Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] md:w-[40%] bg-white shadow-lg border-l border-gray-300 transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Chatbot Header */}
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">AI Chatbot</h2>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:text-gray-300">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Chatbot Message Area */}
        <div className="p-4 h-[75%] overflow-y-auto border-b">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 my-1 rounded-md max-w-[80%] ${
                msg.sender === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-4 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border p-2 flex-grow rounded"
            placeholder="Ask something..."
          />
          <button className="bg-blue-600 text-white p-2 ml-2 rounded" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
