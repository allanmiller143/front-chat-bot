import { Box, Typography, Paper } from "@mui/material";
import { useEffect, useRef } from "react";

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
        >
          <Paper
            elevation={2}
            sx={{
              px: 2,
              py: 1,
              maxWidth: "85%",
              bgcolor: msg.from === "user" ? "message.main" : "message.secondary",
              color: msg.from === "user" ? "#fff" : "#000",
              borderRadius: msg.from === "user" ? "10px 20px 0 10px" : "20px 10px 10px 0",
            }}
          >
            <Typography variant="body1">{msg.text}</Typography>
          </Paper>
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
