import { Box, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

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
    <Box display="flex" flexDirection={"row"} alignItems={"center"} backgroundColor="background.default" gap={1} pb={2} position="fixed" bottom={0} left={20} right={0} zIndex={10} maxWidth='lg' margin={'0 auto'}>
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
      
    </Box>
  );
};

export default ChatInput;
