import { Box, Button, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from '@mui/icons-material/Mic';

import { useState } from "react";
import GravadorAudioDialog from "./AudioRecroder";

const ChatInput = ({ onSend, setMessages, messages, setLoading, chatId }) => {
  const [message, setMessage] = useState("");
  const [abrirDialog, setAbrirDialog] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };



  return (
    <Box display="flex" flexDirection={"row"} alignItems={"center"} backgroundColor="background.default" pb={2} position="fixed" bottom={0} left={10} right={0} zIndex={10} margin={'0 auto'} maxWidth='md'>
        <TextField
            fullWidth
            placeholder="Faça sua pergunta..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            
            sx={{
                '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
                border: 'none',
                backgroundColor: 'primary',

                // borda padrão
                '& fieldset': {
                    border: '1px solid',
                    borderColor: 'border.main',
                },

                // borda ao focar
                '&.Mui-focused fieldset': {
                    borderColor: 'border.main',     // mesma cor pra não mudar
                    boxShadow: 'none',       // remove sombra
                },
                },
                '& .MuiOutlinedInput-input': {
                padding: '8px 10px',
                fontSize: '14px',
                },
            }}
        />

      <IconButton onClick={handleSend} color="primary" disabled={!message.trim()}>
        <SendIcon />
      </IconButton>
      <IconButton variant="contained" onClick={() => setAbrirDialog(true)}>
        <MicIcon/>
      </IconButton>

      <GravadorAudioDialog
        open={abrirDialog}
        onClose={() => setAbrirDialog(false)}
        messages={messages}
        setMessages={setMessages}
        setLoading={setLoading}
        chatId={chatId}
      />
      
    </Box>
  );
};

export default ChatInput;
