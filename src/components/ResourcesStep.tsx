import React from 'react';
import { 
  Box,
  Button,
  Typography,
  
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Slider,
  Grid,
} from '@mui/material';

import {  FormData } from '../types';

interface ResourcesStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ResourcesStep: React.FC<ResourcesStepProps> = ({
  formData,
  setFormData,
  onNext,
  onBack,
}) => {
  const handleReplicasChange = (value: number) => {
    setFormData({
      ...formData,
      spec: {
        ...formData.spec,
        replicas: value,
      },
    });
  };

  const handleResourceChange = (type: 'requests' | 'limits', resource: 'memory' | 'cpu', value: string) => {
    setFormData({
      ...formData,
      spec: {
        ...formData.spec,
        resources: {
          ...formData.spec.resources,
          [type]: {
            ...formData.spec.resources?.[type],
            [resource]: value,
          },
        },
      },
    });
  };

  const handleServiceTypeChange = (serviceType: string) => {
    setFormData({
      ...formData,
      spec: {
        ...formData.spec,
        serviceType: serviceType as any,
      },
    });
  };

  const getResourceRecommendations = () => {
    const provider = formData.spec.provider;
    const model = formData.spec.model;
    
    if (provider === 'openai') {
      if (model.includes('gpt-4')) {
        return { memory: '512Mi', cpu: '200m' };
      } else {
        return { memory: '256Mi', cpu: '100m' };
      }
    } else if (provider === 'claude') {
      if (model.includes('opus')) {
        return { memory: '512Mi', cpu: '200m' };
      } else {
        return { memory: '256Mi', cpu: '100m' };
      }
    } else if (provider === 'gemini') {
      return { memory: '256Mi', cpu: '100m' };
    } else if (provider === 'vllm') {
      return { memory: '1Gi', cpu: '500m' };
    }
    
    return { memory: '256Mi', cpu: '100m' };
  };

  const recommendations = getResourceRecommendations();

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Resources & Scaling Configuration
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Configure resource allocation, scaling, and service exposure for your agent.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Scaling
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom>
                  Number of Replicas: {formData.spec.replicas || 1}
                </Typography>
                <Slider
                  value={formData.spec.replicas || 1}
                  onChange={(_, value) => handleReplicasChange(value as number)}
                  min={1}
                  max={10}
                  step={1}
                  marks
                  valueLabelDisplay="auto"
                />
                <Typography variant="caption" color="text.secondary">
                  More replicas provide better availability and throughput
                </Typography>
              </Box>

              <FormControl fullWidth>
                <InputLabel>Service Type</InputLabel>
                <Select
                  value={formData.spec.serviceType || 'ClusterIP'}
                  onChange={(e) => handleServiceTypeChange(e.target.value)}
                  label="Service Type"
                >
                  <MenuItem value="ClusterIP">ClusterIP (Internal only)</MenuItem>
                  <MenuItem value="NodePort">NodePort (Expose on node port)</MenuItem>
                  <MenuItem value="LoadBalancer">LoadBalancer (Cloud load balancer)</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Resource Allocation
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Recommended for {formData.spec.provider} {formData.spec.model}: 
                {recommendations.memory} memory, {recommendations.cpu} CPU
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Memory Request"
                    value={formData.spec.resources?.requests?.memory || ''}
                    onChange={(e) => handleResourceChange('requests', 'memory', e.target.value)}
                    placeholder="256Mi"
                    helperText="Minimum memory needed"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Memory Limit"
                    value={formData.spec.resources?.limits?.memory || ''}
                    onChange={(e) => handleResourceChange('limits', 'memory', e.target.value)}
                    placeholder="512Mi"
                    helperText="Maximum memory allowed"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="CPU Request"
                    value={formData.spec.resources?.requests?.cpu || ''}
                    onChange={(e) => handleResourceChange('requests', 'cpu', e.target.value)}
                    placeholder="100m"
                    helperText="Minimum CPU needed"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="CPU Limit"
                    value={formData.spec.resources?.limits?.cpu || ''}
                    onChange={(e) => handleResourceChange('limits', 'cpu', e.target.value)}
                    placeholder="200m"
                    helperText="Maximum CPU allowed"
                    size="small"
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    handleResourceChange('requests', 'memory', recommendations.memory);
                    handleResourceChange('requests', 'cpu', recommendations.cpu);
                    handleResourceChange('limits', 'memory', recommendations.memory.replace('Mi', 'Mi').replace('Gi', 'Gi'));
                    handleResourceChange('limits', 'cpu', recommendations.cpu);
                  }}
                >
                  Use Recommendations
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Resource Guidelines
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Memory:</strong> Most AI models require 256Mi-1Gi depending on model size and complexity.
                <br />
                <strong>CPU:</strong> 100m-500m is typically sufficient for API-based models. Self-hosted models may need more.
                <br />
                <strong>Replicas:</strong> Start with 1-2 replicas for development, scale up for production workloads.
                <br />
                <strong>Service Type:</strong> Use ClusterIP for internal services, NodePort/LoadBalancer for external access.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button onClick={onBack}>Back</Button>
        <Button variant="contained" onClick={onNext}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ResourcesStep;
