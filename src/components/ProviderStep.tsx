import React from 'react';
import { 
  Box,
  TextField,
  Button,
  Typography,
  
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Chip,
  Grid,
} from '@mui/material';

import {  FormData } from '../types';

interface ProviderStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onNext: () => void;
  onBack: () => void;
}


const ProviderStep: React.FC<ProviderStepProps> = ({
  formData,
  setFormData,
  onNext,
  onBack,
}) => {
  const handleProviderChange = (provider: string) => {
    setFormData({
      ...formData,
      spec: {
        ...formData.spec,
        provider: provider as any,
      },
    });
  };

  const handleModelChange = (model: string) => {
    setFormData({
      ...formData,
      spec: {
        ...formData.spec,
        model,
      },
    });
  };

  const handleEndpointChange = (endpoint: string) => {
    setFormData({
      ...formData,
      spec: {
        ...formData.spec,
        endpoint: endpoint || undefined,
      },
    });
  };

  const isFormValid = () => {
    return formData.spec.provider && formData.spec.model;
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Provider & Model Configuration
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Choose your AI provider and model. For self-hosted models, use vLLM.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>AI Provider</InputLabel>
            <Select
              value={formData.spec.provider}
              onChange={(e) => handleProviderChange(e.target.value)}
              label="AI Provider"
            >
              <MenuItem value="openai">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip label="OpenAI" size="small" color="primary" />
                  <span>OpenAI</span>
                </Box>
              </MenuItem>
              <MenuItem value="claude">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip label="Anthropic" size="small" color="secondary" />
                  <span>Claude (Anthropic)</span>
                </Box>
              </MenuItem>
              <MenuItem value="gemini">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip label="Google" size="small" color="info" />
                  <span>Gemini (Google)</span>
                </Box>
              </MenuItem>
              <MenuItem value="vllm">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip label="Self-hosted" size="small" color="warning" />
                  <span>vLLM (Self-hosted)</span>
                </Box>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Model"
            value={formData.spec.model}
            onChange={(e) => handleModelChange(e.target.value)}
            placeholder="gpt-4"
            helperText="Model name for the selected provider"
          />
        </Grid>

        {formData.spec.provider === 'vllm' && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Custom Endpoint"
              value={formData.spec.endpoint || ''}
              onChange={(e) => handleEndpointChange(e.target.value)}
              placeholder="http://your-vllm-server:8000/v1"
              helperText="URL for your self-hosted vLLM server"
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                Provider Information
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formData.spec.provider === 'openai' && 
                  'You will need an OpenAI API key stored in a Kubernetes Secret.'}
                {formData.spec.provider === 'claude' && 
                  'You will need an Anthropic API key stored in a Kubernetes Secret.'}
                {formData.spec.provider === 'gemini' && 
                  'You will need a Google AI API key stored in a Kubernetes Secret.'}
                {formData.spec.provider === 'vllm' && 
                  'Make sure your vLLM server is accessible from the Kubernetes cluster.'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button onClick={onBack}>Back</Button>
        <Button
          variant="contained"
          onClick={onNext}
          disabled={!isFormValid()}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ProviderStep;
