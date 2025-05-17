import React, { useState, useEffect } from 'react';
import { AppBar, IconButton, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeContext } from '../../Theme/CustomThemeProvider';
import LgBox from '../LgBox';
import Logo from './Logo/Logo';
const Header = () => {
  const [value, setValue] = useState(0);
  const location = useLocation();
  const { mode, toggleTheme } = useThemeContext();

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setValue(0);
        break;
      case '/chat':
        setValue(1);
        break;
      default:
        setValue(false); // Nenhuma aba ativa
    }
  }, [location]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position="sticky" color='inherit' sx = {{height: '95px', boxShadow: 'none', display: 'flex', alignItems: 'center'}}>
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between', width: '100%',height: '100%', maxWidth: '1500px', margin: '0 auto' }}>
            <Logo/>
            {/* <Tabs
                value={value}
                onChange={handleChange}
                TabIndicatorProps={{ style: { display: 'none' } }} // remove o underline
                textColor='primary.main'
                centered
                sx={{
                    '& .MuiTab-root': {
                    minHeight: '40px',
                    minWidth: 100,
                    borderRadius: '10px',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    px: 2,
                    mx: 1,
                    },
                    '& .Mui-selected': {
                    backgroundColor: 'message.main',
                    color: 'white',
                    },
                }}
                >
                <Tab label="Chat" component={Link} to="/" />
            </Tabs> */}

                
                <IconButton onClick={toggleTheme} >
                    {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
            </Toolbar>
    </AppBar>
  );
};

export default Header;
