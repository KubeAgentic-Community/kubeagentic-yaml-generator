import React from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
} from '@mui/material';

import { FormData } from '../types';

interface BasicInfoStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onNext: () => void;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  formData,
  setFormData,
  onNext,
}) => {
  const handleChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: {
        ...formData[field as keyof FormData],
        ...value,
      },
    });
  };

  const isFormValid = () => {
    return (
      formData.metadata.name.trim() !== '' &&
      formData.spec.systemPrompt.trim() !== '' &&
      formData.spec.apiSecretRef.name.trim() !== ''
    );
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Basic Information
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Configure the basic metadata and system prompt for your AI agent.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Agent Name"
            value={formData.metadata.name}
            onChange={(e) =>
              handleChange('metadata', { name: e.target.value })
            }
            placeholder="my-ai-agent"
            helperText="Unique name for your agent"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Namespace"
            value={formData.metadata.namespace || 'default'}
            onChange={(e) =>
              handleChange('metadata', { namespace: e.target.value })
            }
            placeholder="default"
            helperText="Kubernetes namespace for the agent"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="API Secret Name"
            value={formData.spec.apiSecretRef.name}
            onChange={(e) =>
              handleChange('spec', {
                apiSecretRef: {
                  ...formData.spec.apiSecretRef,
                  name: e.target.value,
                },
              })
            }
            placeholder="openai-secret"
            helperText="Name of the Kubernetes Secret containing your API key"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="System Prompt"
            value={formData.spec.systemPrompt}
            onChange={(e) =>
              handleChange('spec', { systemPrompt: e.target.value })
            }
            placeholder="You are a helpful AI assistant..."
            multiline
            rows={4}
            helperText="Define the agent's personality and behavior"
            required
          />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
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

export default BasicInfoStep;
