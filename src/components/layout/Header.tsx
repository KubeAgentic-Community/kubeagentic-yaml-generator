import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Link,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #42b883 0%, #2c3e50 100%)',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
}));

const NavButton = styled(Link)(({ theme }) => ({
  color: 'white',
  marginLeft: theme.spacing(2),
  fontSize: '0.875rem',
  textDecoration: 'none',
  padding: '8px 12px',
  borderRadius: '4px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    textDecoration: 'none',
    color: 'white',
  },
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const Header: React.FC = () => {
  return (
    <StyledAppBar position="static" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 700,
                fontSize: '1.5rem',
              }}
            >
              YAML Generator for KubeAgentic
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex' }}>
            <NavButton 
              href="https://kubeagentic.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              KubeAgentic Home
            </NavButton>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Header;
