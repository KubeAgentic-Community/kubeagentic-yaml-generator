import React from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  Alert,
  Stack,
} from '@mui/material';
import { CloudDownload, ContentCopy, Refresh } from '@mui/icons-material';
import { FormData } from '../types';

interface ReviewStepProps {
  formData: FormData;
  generatedYAML: string;
  onGenerate: () => void;
  onCopy: () => void;
  onDownload: () => void;
  onBack: () => void;
  onReset: () => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({
  formData,
  generatedYAML,
  onGenerate,
  onCopy,
  onDownload,
  onBack,
  onReset,
}) => {
  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'openai': return 'primary';
      case 'claude': return 'secondary';
      case 'gemini': return 'info';
      case 'vllm': return 'warning';
      default: return 'default';
    }
  };

  const getFrameworkColor = (framework: string) => {
    return framework === 'langgraph' ? 'success' : 'default';
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Review & Generate YAML
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Review your configuration and generate the final YAML file for deployment.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Configuration Summary
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Basic Information</Typography>
                <Typography variant="body2">
                  <strong>Name:</strong> {formData.metadata.name}
                </Typography>
                <Typography variant="body2">
                  <strong>Namespace:</strong> {formData.metadata.namespace || 'default'}
                </Typography>
                <Typography variant="body2">
                  <strong>System Prompt:</strong> {formData.spec.systemPrompt.substring(0, 100)}
                  {formData.spec.systemPrompt.length > 100 && '...'}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Provider & Model</Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  <Chip 
                    label={formData.spec.provider.toUpperCase()} 
                    color={getProviderColor(formData.spec.provider)}
                    size="small"
                  />
                  <Chip label={formData.spec.model} variant="outlined" size="small" />
                </Stack>
                <Typography variant="body2">
                  <strong>API Secret:</strong> {formData.spec.apiSecretRef.name}
                </Typography>
                {formData.spec.endpoint && (
                  <Typography variant="body2">
                    <strong>Endpoint:</strong> {formData.spec.endpoint}
                  </Typography>
                )}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Framework & Tools</Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  <Chip 
                    label={formData.spec.framework?.toUpperCase() || 'DIRECT'} 
                    color={getFrameworkColor(formData.spec.framework || 'direct')}
                    size="small"
                  />
                  <Chip 
                    label={`${formData.spec.tools?.length || 0} Tools`} 
                    variant="outlined" 
                    size="small" 
                  />
                </Stack>
                {formData.spec.framework === 'langgraph' && formData.spec.langgraphConfig && (
                  <Typography variant="body2">
                    <strong>Graph Type:</strong> {formData.spec.langgraphConfig.graphType}
                  </Typography>
                )}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box>
                <Typography variant="subtitle2" gutterBottom>Resources & Scaling</Typography>
                <Typography variant="body2">
                  <strong>Replicas:</strong> {formData.spec.replicas || 1}
                </Typography>
                <Typography variant="body2">
                  <strong>Service Type:</strong> {formData.spec.serviceType || 'ClusterIP'}
                </Typography>
                <Typography variant="body2">
                  <strong>Memory:</strong> {formData.spec.resources?.requests?.memory || '256Mi'} - {formData.spec.resources?.limits?.memory || '512Mi'}
                </Typography>
                <Typography variant="body2">
                  <strong>CPU:</strong> {formData.spec.resources?.requests?.cpu || '100m'} - {formData.spec.resources?.limits?.cpu || '200m'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Generate & Download YAML
              </Typography>
              
              <Alert severity="info" sx={{ mb: 2 }}>
                Before deploying, make sure you have:
              </Alert>
              
              <Box component="ol" sx={{ pl: 2, mb: 3 }}>
                <li>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Created the API secret in your Kubernetes cluster:
                  </Typography>
                  <Box component="pre" sx={{ 
                    bgcolor: 'grey.100', 
                    p: 1, 
                    borderRadius: 1, 
                    fontSize: '0.75rem',
                    overflow: 'auto'
                  }}>
{`kubectl create secret generic ${formData.spec.apiSecretRef.name} \\
  --from-literal=${formData.spec.apiSecretRef.key}=YOUR_API_KEY`}
                  </Box>
                </li>
                <li>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Installed the KubeAgentic operator in your cluster
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Applied the generated YAML configuration
                  </Typography>
                </li>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={2}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={onGenerate}
                  startIcon={<Refresh />}
                  size="large"
                >
                  Generate YAML Configuration
                </Button>
                
                {generatedYAML && (
                  <>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={onCopy}
                      startIcon={<ContentCopy />}
                      size="large"
                    >
                      Copy to Clipboard
                    </Button>
                    
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={onDownload}
                      startIcon={<CloudDownload />}
                      size="large"
                    >
                      Download YAML File
                    </Button>
                  </>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button onClick={onBack}>Back</Button>
        <Button variant="outlined" onClick={onReset} color="secondary">
          Start Over
        </Button>
      </Box>
    </Box>
  );
};

export default ReviewStep;
