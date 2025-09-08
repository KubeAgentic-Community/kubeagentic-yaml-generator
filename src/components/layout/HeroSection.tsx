import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #42b883 0%, #2c3e50 100%)',
  color: 'white',
  padding: theme.spacing(8, 0),
  textAlign: 'center',
  width: '100%',
  margin: 0,
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: '3.5rem',
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  marginBottom: theme.spacing(4),
  opacity: 0.9,
  maxWidth: '800px',
  margin: `0 auto ${theme.spacing(4)}px auto`,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
}));

const CTAButton = styled(Link)(({ theme }) => ({
  display: 'inline-block',
  background: '#42b883',
  color: 'white',
  borderRadius: '6px',
  padding: '12px 24px',
  margin: '0 8px',
  fontSize: '1rem',
  fontWeight: 500,
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: '#369870',
    color: 'white',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    textDecoration: 'none',
  },
}));

const HeroSection: React.FC = () => {
  return (
    <HeroContainer>
      <Container maxWidth="lg">
        <Box sx={{ padding: '0 1rem' }}>
          <img 
            src="https://kubeagentic.com/assets/logo.png" 
            alt="KubeAgentic Logo - AI agents on Kubernetes" 
            style={{ 
              maxWidth: '200px', 
              height: 'auto', 
              marginBottom: '2rem' 
            }}
          />
          <HeroTitle variant="h1">
            KubeAgentic YAML Generator
          </HeroTitle>
          <HeroSubtitle variant="h2">
            Create complete production-ready AI agent configurations for Kubernetes deployment with our interactive wizard
          </HeroSubtitle>
          <Box sx={{ marginBottom: '2rem' }}>
            <CTAButton 
              href="https://kubeagentic.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              🚀 View KubeAgentic Docs
            </CTAButton>
            <CTAButton 
              href="https://github.com/KubeAgentic-Community/KubeAgentic"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                background: 'transparent',
                border: '2px solid #42b883',
                '&:hover': {
                  background: '#42b883',
                  color: 'white',
                },
              }}
            >
              View on GitHub
            </CTAButton>
          </Box>
        </Box>
      </Container>
    </HeroContainer>
  );
};

export default HeroSection;
