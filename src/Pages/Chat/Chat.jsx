import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import LgBox from "../../Components/LgBox";
import ChatMessages from "./Components/ChatMessages";
import ChatInput from "./Components/ChatInput";
import { postData } from "../../Services/Api";
import ChatDrawer from "./Components/Drawer";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [chatId, setChatId] = useState(() => {
    const saved = localStorage.getItem("chatId");
    if (saved) return saved;

    const novoId = crypto.randomUUID();
    localStorage.setItem("chatId", novoId);
    return novoId;
  });

  useEffect(() => {
    async function carregarMensagens() {
      try {
        const res = await fetch(`http://localhost:3001/api/mensagens/${chatId}`);
        const data = await res.json();

        if (Array.isArray(data.mensagens)) {
          setMessages(data.mensagens);
        } else {
          setMessages([
            { from: "bot", text: "Olá! Como posso ajudar você hoje?" }
          ]);
        }
      } catch (error) {
        console.error("Erro ao carregar mensagens:", error);
        setMessages([
          { from: "bot", text: "Olá! Como posso ajudar você hoje?" }
        ]);
      }
    }

    carregarMensagens();
  }, [chatId]);


  const handleSend = async (message) => {
    const userMessage = { from: "user", text: message };
    const mensagensAtualizadas = [...messages, userMessage];

    setMessages(mensagensAtualizadas);
    setLoading(true);

    try {
      const resposta = await postData("api/gerar", {
        mensagens: mensagensAtualizadas,
        chatId
      });

      const botMessage = {
        from: "bot",
        text: resposta?.data?.resposta || "Erro ao obter resposta do Gemini.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "❌ Erro ao se conectar com o backend." },
      ]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Header setChatId={setChatId}/>
      <LgBox>
        <ChatMessages messages={messages} loading={loading} />
        <ChatInput onSend={handleSend} />
      </LgBox>
    </>
  );
};

export default Chat;
