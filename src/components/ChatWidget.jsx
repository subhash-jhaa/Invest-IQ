// ChatWidget.jsx
import { FiX } from "react-icons/fi";
import Chatbot from "./Chatbot";
import { RiRobot3Line } from "react-icons/ri";
import { useChatbot } from "../context/ChatBotContext";

export default function ChatWidget() {
  const { isOpen, setIsOpen } = useChatbot(); // use context state

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] sm:w-[400px] h-[70vh] bg-white border rounded-xl shadow-2xl z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 bg-emerald-500 text-white rounded-t-xl">
            <h4 className="font-semibold">💬 InvestIQ AI – AI Chat Assistant</h4>
            <FiX
              className="cursor-pointer hover:text-gray-200"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <Chatbot />
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-emerald-500 text-white shadow-lg hover:bg-emerald-400"
      >
        <RiRobot3Line className="text-2xl" />
      </button>
    </>
  );
}
