import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import LgBox from "../../Components/LgBox";
import ChatMessages from "./Components/ChatMessages";
import ChatInput from "./Components/ChatInput";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = (message) => {
    const userMessage = { from: "user", text: message };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    setTimeout(() => {
      const botReply = {
        from: "bot",
        text: `Você disse: "${message}"`,
      };
      setMessages((prev) => [...prev, botReply]);
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <Header />
      <LgBox>
        <ChatMessages messages={messages} loading={loading} />
        <ChatInput onSend={handleSend} />
      </LgBox>
    </>
  );
};

export default Chat;
