import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';

const GravadorAudioDialog = ({ open, onClose, onAudioReady }) => {
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
        setStatus("Gravação finalizada");
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

  const enviarAudio = () => {
    onAudioReady(audioBlob);
    handleClose();
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
