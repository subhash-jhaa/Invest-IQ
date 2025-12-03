// context/ChatBotContext.jsx
import { createContext, useContext, useState } from "react";

const ChatbotContext = createContext();

export const ChatbotProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState("");

  const openWithMessage = (message) => {
    setInitialMessage(message);
    setIsOpen(true);
  };

  return (
    <ChatbotContext.Provider
      value={{
        isOpen,
        setIsOpen,
        initialMessage,
        setInitialMessage,
        openWithMessage,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => useContext(ChatbotContext);
