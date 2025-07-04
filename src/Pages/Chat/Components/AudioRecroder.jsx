import React, { useState, useRef, useEffect } from 'react';
import {Dialog,DialogContent,DialogActions,Button,Typography,IconButton} from '@mui/material';
import StopIcon from '@mui/icons-material/Stop';
import { postData } from '../../../Services/Api';

const GravadorAudioDialog = ({ open, onClose, setMessages, messages, setLoading, chatId }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [status, setStatus] = useState("Clique em gravar para começar");
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);

  useEffect(() => {
    if (open) {
      iniciarGravacao();
    } else {
      pararGravacao();
      limparEstado();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const iniciarGravacao = async () => {
    setStatus("Solicitando microfone...");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.onstart = () => {
        chunks.current = [];
        setIsRecording(true);
        setStatus("Gravando...");
      };

      mediaRecorder.ondataavailable = (e) => {
        chunks.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        setIsRecording(false);
        setStatus("");
      };

      mediaRecorder.start();
    } catch (err) {
      console.error("Erro ao acessar o microfone:", err);
      setStatus("Erro ao acessar o microfone");
    }
  };

  const pararGravacao = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  const limparEstado = () => {
    setIsRecording(false);
    setAudioBlob(null);
    setStatus("Clique em gravar para começar");
    mediaRecorderRef.current = null;
    chunks.current = [];
  };

  const handleClose = () => {
    limparEstado();
    onClose();
  };

  const enviarAudio = async () => {
    if (!audioBlob) return;
    onClose();
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Audio = reader.result.split(',')[1]; // remove o prefixo 'data:audio/webm;base64,...'
      
      console.log("Base64 do áudio:", base64Audio);

      const userMessage = { from: "user", text: base64Audio, type : "audio", audioUrl : 'loading', temp : audioBlob };
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
          audioUrl: resposta?.data?.audioUrl || null,
          score: resposta?.data?.score || null,
          resposta: resposta?.data?.resposta || null,
          id: resposta?.data?.id || null,
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
        onClose();
      }
      handleClose();
    };

    reader.readAsDataURL(audioBlob);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent sx={{ textAlign: 'center', minWidth: 300 }}>
        <Typography sx={{ mb: 2 }}>{status}</Typography>

        <IconButton
          color='error'
          onClick={ pararGravacao}
          size="large"
          disabled={!isRecording}
          sx={{ display: isRecording ? 'block' : 'none', margin: '0 auto' }}
        >
          <StopIcon fontSize="large" /> 
        </IconButton>

        {audioBlob && (
          <audio controls style={{ display: 'block', margin: '1rem auto 0' }}>
            <source src={URL.createObjectURL(audioBlob)} type="audio/webm" />
            Seu navegador não suporta áudio.
          </audio>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color='error'>Cancelar</Button>
        <Button onClick={enviarAudio} disabled={!audioBlob} variant="contained" color='primary.secondary'>
          Usar áudio
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GravadorAudioDialog;
