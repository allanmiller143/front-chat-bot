import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import LgBox from "../../Components/LgBox";
import ChatMessages from "./Components/ChatMessages";
import ChatInput from "./Components/ChatInput";
import { getData, postData } from "../../Services/Api";
import { useNavigate } from "react-router-dom";
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const Navigate  = useNavigate();

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
        const res = await getData(`api/mensagens/${chatId}`);
        console.log("Mensagens carregadas:", res);
        if (res.status === 200 && res.userInfo) {
          setMessages(res.userInfo.mensagens);
          console.log("Mensagens definidas:", res.userInfo.mensagens);
        } else {
          setMessages([
            { from: "bot", text: "Olá! Como posso ajudar você hoje?" }
          ]);
        }
      } catch (error) {
        Navigate("*");
        console.error("Erro ao carregar mensagens:", error);
        setMessages([
          { from: "bot", text: "Olá! Como posso ajudar você hoje?" }
        ]);
      }
    }
    carregarMensagens();
  }, [chatId]);


  const handleSend = async (message) => {
    const userMessage = { from: "user", text: message, type: "text" };
    const mensagensAtualizadas = [...messages, userMessage];

    setMessages(mensagensAtualizadas);
    setLoading(true);

    try {
      const resposta = await postData("api/pergunta", {
        mensagens: mensagensAtualizadas,
        chatId
      });

      console.log("Resposta do backend:", resposta);

      const botMessage = {
        from: "bot",
        text: resposta?.data?.resposta || "Erro ao obter resposta.",
        type: resposta?.data?.type || "text",
        id: resposta?.data?.id || null,
        resposta: resposta?.data?.resposta || null,
        score: resposta?.data?.score || null,
        pergunta: message || null,
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
        <ChatInput onSend={handleSend} setMessages={setMessages} messages={messages} setLoading={setLoading} chatId={chatId} />
      </LgBox>
    </>
  );
};

export default Chat;
