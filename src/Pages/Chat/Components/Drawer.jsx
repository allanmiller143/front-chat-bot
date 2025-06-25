import React, { useState, useEffect } from 'react';
import {
  Drawer,
  List,
  ListItemText,
  IconButton,
  Button,
  Divider,
  Box,
  Typography,
  Menu,
  MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Chat from '@mui/icons-material/Chat';
import { useThemeContext } from '../../../Theme/CustomThemeProvider';

const drawerWidth = 280;

const ChatDrawer = ({ chatId, setChatId }) => {
  const [open, setOpen] = useState(false);
  const [conversas, setConversas] = useState([]);
  const [selectedChat, setSelectedChat] = useState(() => {
    const savedChatId = localStorage.getItem("chatId");
    return savedChatId || null;
  });

  const { mode, toggleTheme } = useThemeContext();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [chatParaExcluir, setChatParaExcluir] = useState(null);

  useEffect(() => {
    async function buscarChats() {
      try {
        const res = await fetch("http://localhost:3001/api/chats");
        const data = await res.json();
        if (Array.isArray(data.chats)) {
          setConversas(data.chats);
        }
      } catch (err) {
        console.error("Erro ao buscar chats:", err);
      }
    }

    buscarChats();
  }, [chatId, open]);

  const novaConversa = () => {
    const novoId = crypto.randomUUID();
    setChatId(novoId);
    localStorage.setItem("chatId", novoId);
    setSelectedChat(novoId);
    setOpen(false);
  };

  const carregarConversa = (id) => {
    setChatId(id);
    setSelectedChat(id);
    setOpen(false);
  };

  const abrirMenu = (event, chatId) => {
    event.preventDefault();
    setChatParaExcluir(chatId);
    setMenuAnchorEl(event.currentTarget);
  };

  const fecharMenu = () => {
    setMenuAnchorEl(null);
    setChatParaExcluir(null);
  };

  const excluirChat = async () => {
    try {
      await fetch(`http://localhost:3001/api/chats/${chatParaExcluir}`, {
        method: 'DELETE',
      });

      setConversas(prev => prev.filter(c => c.id !== chatParaExcluir));

      if (chatParaExcluir === chatId) {
        setChatId(null);
        localStorage.removeItem("chatId");
      }

      fecharMenu();
    } catch (err) {
      console.error("Erro ao excluir chat:", err);
    }
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)} edge="start" sx={{ m: 1 }}>
        <MenuIcon />
      </IconButton>

      <Drawer open={open} onClose={() => setOpen(false)} anchor="left">
        <Box
          sx={{
            width: drawerWidth,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              pt: 2,
              pb: 1
            }}
          >
            <Typography variant="h6">Suas Conversas</Typography>
            <IconButton onClick={toggleTheme}>
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Box>

          {/* Novo chat */}
          <Box
            onClick={novaConversa}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              px: 2,
              py: 1.5,
              gap: 1.5,
              borderRadius: 1,
              '&:hover': { backgroundColor: '#cccccc20' }
            }}
          >
            <Chat />
            <Typography>Novo chat</Typography>
          </Box>

          <Divider />

          {/* Lista com scroll */}
          <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
            <List>
              {conversas.map((conversa) => (
                <Box
                  key={conversa.id}
                  onClick={() => carregarConversa(conversa.id)}
                  onContextMenu={(e) => abrirMenu(e, conversa.id)}
                  sx={{
                    cursor: 'pointer',
                    backgroundColor: selectedChat === conversa.id ? '#cccccc20' : 'transparent',
                    '&:hover': { backgroundColor: '#cccccc20' },
                    px: 1,
                    mb: 1,
                    borderRadius: 1
                  }}
                >
                  <ListItemText
                    primary={conversa.resumo}
                    primaryTypographyProps={{
                      noWrap: true,
                      sx: {
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }
                    }}
                  />
                </Box>
              ))}
            </List>
          </Box>
        </Box>

        {/* Menu de contexto (botão direito) */}
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={fecharMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={excluirChat} sx={{ color: 'error.main' }}>
            Excluir conversa
          </MenuItem>
        </Menu>
      </Drawer>
    </>
  );
};

export default ChatDrawer;
