import React from 'react';
import { 
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  Container,
  Paper,
  Stack
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const HighlightComponent = () => {
  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Destaque-se onde os clientes procuram
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ mb: 3 }}>
          Sua loja ou negócio diretamente no caminho de quem busca imóveis. Anuncie na Space Imóveis e apareça exatamente quando importa.
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <Stack direction="column">
            <FormControlLabel 
              control={<Checkbox />} 
              label="Sites" 
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '1.1rem' } }}
            />
            <FormControlLabel 
              control={<Checkbox />} 
              label="Lojas físicas" 
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '1.1rem' } }}
            />
            <FormControlLabel 
              control={<Checkbox />} 
              label="Serviços" 
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '1.1rem' } }}
            />
          </Stack>
        </Box>
        
        <Button 
          variant="contained" 
          size="large"
          endIcon={<ArrowForwardIcon />}
          sx={{
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 'bold',
            textTransform: 'none',
            borderRadius: 1
          }}
        >
          Reserve seu espaço
        </Button>
      </Paper>
    </Container>
  );
};

export default HighlightComponent;