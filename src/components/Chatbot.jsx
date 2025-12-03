import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { investmentChatBot } from "../services/gemini";
import ReactMarkdown from "react-markdown";
import { useChatbot } from "../context/ChatBotContext";

export default function Chatbot() {
  const [chatHistory, setChatHistory] = useState([
    {
      role: "bot",
      text: "Hi there! 👋 I'm InvestIQ AI, your friendly assistant. Ask me anything related to investing, SIPs, mutual funds, or financial planning! 💸",
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef(null);

  const { initialMessage, setInitialMessage } = useChatbot();
  const hasHandledInitial = useRef(false);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useEffect(() => {
    if (initialMessage && !hasHandledInitial.current) {
      const newMessage = { role: "user", text: initialMessage };
      setChatHistory((prev) => [...prev, newMessage]);
      sendToGemini([...chatHistory, newMessage]);
      hasHandledInitial.current = true;
      setInitialMessage("");
    }
  }, [initialMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendToGemini = async (history) => {
    setIsThinking(true);
    const response = await investmentChatBot(history);
    const botReply = response.success
      ? response.reply
      : "Sorry, I'm having trouble answering that right now.";

    setChatHistory((prev) => [...prev, { role: "bot", text: botReply }]);
    setIsThinking(false);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setChatHistory((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    await sendToGemini([...chatHistory, { role: "user", text: userMessage }]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {chatHistory.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`p-3 max-w-xs sm:max-w-sm rounded-lg text-sm whitespace-pre-wrap shadow-sm ${
              msg.role === "user" ? "bg-emerald-100 ml-auto" : "bg-gray-100"
            }`}
          >
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </motion.div>
        ))}

        {isThinking && (
          <p className="text-xs text-gray-400">InvestIQ AI is typing...</p>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center p-3 border-t">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask something about investing..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-emerald-500 text-white p-2 rounded-lg hover:bg-emerald-400"
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
}
