import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Box)(({ theme }) => ({
  background: '#2c3e50',
  color: '#ecf0f1',
  padding: theme.spacing(8, 0, 4),
  width: '100%',
  margin: 0,
}));

const FooterButton = styled(Link)(({ theme }) => ({
  display: 'inline-block',
  color: '#42b883',
  border: '2px solid #42b883',
  borderRadius: '6px',
  padding: '8px 16px',
  fontSize: '0.875rem',
  fontWeight: 500,
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#42b883',
    color: 'white',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    textDecoration: 'none',
  },
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: '#42b883',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Container maxWidth="xl">
        <Box textAlign="center">
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              marginBottom: 6, 
              color: '#ecf0f1', 
              fontWeight: 600 
            }}
          >
            🤝 Community & Support
          </Typography>
          
          <Grid container spacing={4} sx={{ marginBottom: 6 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#42b883', 
                  marginBottom: 2, 
                  fontWeight: 600 
                }}
              >
                GitHub
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  marginBottom: 2, 
                  color: '#bdc3c7' 
                }}
              >
                Star us on GitHub and contribute
              </Typography>
              <FooterButton 
                href="https://github.com/KubeAgentic-Community/KubeAgentic"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Repository →
              </FooterButton>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#42b883', 
                  marginBottom: 2, 
                  fontWeight: 600 
                }}
              >
                Issues
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  marginBottom: 2, 
                  color: '#bdc3c7' 
                }}
              >
                Report bugs and request features
              </Typography>
              <FooterButton 
                href="https://github.com/KubeAgentic-Community/KubeAgentic/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                Report Issue →
              </FooterButton>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#42b883', 
                  marginBottom: 2, 
                  fontWeight: 600 
                }}
              >
                Discussions
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  marginBottom: 2, 
                  color: '#bdc3c7' 
                }}
              >
                Join the community discussions
              </Typography>
              <FooterButton 
                href="https://github.com/KubeAgentic-Community/KubeAgentic/discussions"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Discussion →
              </FooterButton>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#42b883', 
                  marginBottom: 2, 
                  fontWeight: 600 
                }}
              >
                Contact
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  marginBottom: 2, 
                  color: '#bdc3c7' 
                }}
              >
                Get in touch with us directly
              </Typography>
              <FooterButton 
                href="mailto:contact@kubeagentic.com"
              >
                contact@kubeagentic.com
              </FooterButton>
            </Grid>
          </Grid>
          
          <Box 
            sx={{ 
              borderTop: '1px solid #34495e', 
              paddingTop: 4, 
              marginTop: 4 
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#95a5a6', 
                marginBottom: 2 
              }}
            >
              Licensed under the Apache License 2.0. See{' '}
              <FooterLink 
                href="https://github.com/KubeAgentic-Community/KubeAgentic/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
              >
                LICENSE
              </FooterLink>{' '}
              for details.
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#95a5a6' 
              }}
            >
              © 2025 KubeAgentic. Built with ❤️ for the Kubernetes community.
            </Typography>
          </Box>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
