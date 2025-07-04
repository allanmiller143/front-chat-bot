import { Box, Typography, Paper, Divider } from "@mui/material";
import { useEffect, useRef } from "react";
import Feedback from "./Feedback";

const ChatMessages = ({ messages, loading }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <Box px={2} pt={2} pb={10} sx={{ overflowY: "auto", flex: 1, maxWidth:"md", margin : '0 auto'}}>
      {messages.map((msg, index) => (
        <Box
          key={index}
          mb={2}
          display="flex"
          justifyContent={msg.from === "user" ? "flex-end" : "flex-start"}
          alignItems="center"
        >
          <Paper
            elevation={2}
            sx={{
              px: 2,
              py: 1,
              maxWidth:  {md: "60%", xs: "80%"},
              bgcolor: msg.from === "user" ? "message.main" : "message.secondary",
              color: msg.from === "user" ? "#fff" : "#000",
              borderRadius: msg.from === "user" ? "10px 20px 0 10px" : "20px 10px 10px 0",
            }}
          >
            {
              (msg.type === "audio" && msg.temp ) ? (
                <audio controls style={{ display: 'block', backgroundColor: 'transparent' }}>
                  <source src={URL.createObjectURL(msg.temp)} type="audio/webm" />
                  Seu navegador não suporta áudio.
                </audio>
              ) : 
              msg.type === "audio" ? (
                <>
                
                  <audio src={msg.audioUrl} controls controlsList="download noinfer "  style={{ display: 'block', backgroundColor: 'transparent' }} />
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body1" sx={{ mb: 1 }}>Transcrição</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>{msg.text}</Typography>
                </>
              ) :
              (
                <Typography variant="body1">{msg.text}</Typography>
              )
            }
            
          </Paper>
          <Feedback message={msg} messages={messages} />
        </Box>
      ))}

      {loading && (
        <Box mb={2} display="flex" justifyContent="flex-start">
          <Paper
            elevation={2}
            sx={{
              px: 2,
              py: 1,
              maxWidth: "70%",
              bgcolor: "message.secondary",
              color: "#000",
              borderRadius: 2,
              fontStyle: "italic",
            }}
          >
            <Typography variant="body1">Pensando...</Typography>
          </Paper>
        </Box>
      )}

      <div ref={bottomRef} />
    </Box>
  );
};

export default ChatMessages;
