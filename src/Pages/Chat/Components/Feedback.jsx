import {Box,Dialog,DialogContent,Typography,IconButton,TextField,Button,FormControlLabel,Radio,RadioGroup,FormLabel,DialogTitle} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { postData } from "../../../Services/Api";
import { toast } from 'sonner';

const ratingLabels = {
  1: "Péssimo",
  2: "Ruim",
  3: "Regular",
  4: "Bom",
  5: "Muito bom"
};

const Feedback = ({ message, messages }) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    console.log(message);

  };
  const handleClose = () => {
    setOpen(false);
    setRating("");
    setSuggestion("");
  };

  const handleSubmit = async () => {
    try{
        setLoading(true);

        const pergunta = messages.find(msg => msg.from === "user" && msg.id === message.id - 1)?.text || "Pergunta não encontrada";
        const data = {
            pergunta : pergunta,
            resposta : message.text,
            nota: rating,
            comentario: suggestion,
            chatId : localStorage.getItem("chatId"),
            id : message.id
        }

        console.log("Enviando feedback:", data);
        const response = await postData(`api/feedback`, data);

        if(response.status === 200 || response.status === 201){
            toast.success("Feedback enviado com sucesso!");
            handleClose();
        }else{
            toast.error("Erro ao enviar feedback.");
        }
    }catch(err){
        console.error("Erro ao enviar feedback:", err);
    }finally{
        setLoading(false);
        handleClose
    }
  }

  return (
    <>
      <Box
        sx={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          ml: 1,
          cursor: "pointer",
          display: message.from === "bot" ? "flex" : "none",
          bgcolor:
            message.from === "user" ? "message.main" : "message.secondary"
        }}
        onClick={handleOpen}
      />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            pb: 0
          }}
        >
          <Typography variant="body1">Feedback da resposta</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        

        <Box sx = {{ px: 2, py: 1 }}>
          <FormLabel component="legend" sx={{ mb: 1 }}>
            Como você avalia essa resposta? 
          </FormLabel>
          <RadioGroup
            row
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            sx={{ mb: 2 }}
          >
            {[1, 2, 3, 4, 5].map((val) => (
              <FormControlLabel
                key={val}
                value={val.toString()}
                control={<Radio />}
                label={`${val} - ${ratingLabels[val]}`}
              />
            ))}
          </RadioGroup>

          <TextField
            label="Como seria uma resposta melhor?"
            multiline
            rows={4}
            fullWidth
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            variant="outlined"
            placeholder="Digite sua sugestão aqui..."
          />

          <Box sx={{ textAlign: "right", mt: 3 }}>
            <Button onClick={handleSubmit} variant="contained" color="primary.main" disabled={loading || !rating || (rating < 3 && !suggestion.trim())}>
              {loading ? "Enviando..." : "Enviar"}
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default Feedback;
