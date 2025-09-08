import React from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  FormControlLabel,
  Switch,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,

  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { FormData } from '../types';

interface ProductionConfigStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ProductionConfigStep: React.FC<ProductionConfigStepProps> = ({
  formData,
  setFormData,
  onNext,
  onBack,
}) => {
  const productionConfig = formData.productionConfig || {
    createService: false,
    createIngress: false,
    createRoute: false,
    createConfigMap: false,
    createSecret: false,
    createDeployment: false,
    createHPA: false,
    createPVC: false,
    createNetworkPolicy: false,
  };

  const handleProductionConfigChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      productionConfig: {
        ...productionConfig,
        [field]: value,
      },
    });
  };

  const handleServiceConfigChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      productionConfig: {
        ...productionConfig,
        serviceConfig: {
          ...productionConfig.serviceConfig,
          [field]: value,
        },
      },
    });
  };

  const handleIngressConfigChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      productionConfig: {
        ...productionConfig,
        ingressConfig: {
          ...productionConfig.ingressConfig,
          [field]: value,
        },
      },
    });
  };

  const handleRouteConfigChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      productionConfig: {
        ...productionConfig,
        routeConfig: {
          ...productionConfig.routeConfig,
          [field]: value,
        },
      },
    });
  };

  const handleHPAConfigChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      productionConfig: {
        ...productionConfig,
        hpaConfig: {
          ...productionConfig.hpaConfig,
          [field]: value,
        },
      },
    });
  };

  const handlePVCConfigChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      productionConfig: {
        ...productionConfig,
        pvcConfig: {
          ...productionConfig.pvcConfig,
          [field]: value,
        },
      },
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Production Configuration
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Configure additional Kubernetes resources for a complete production deployment.
        These are optional but recommended for production environments.
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Select the resources you want to include in your deployment. Each resource will be generated as a separate YAML file.
      </Alert>

      <Grid container spacing={3}>
        {/* Basic Resources */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Basic Resources
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={productionConfig.createService}
                      onChange={(e) => handleProductionConfigChange('createService', e.target.checked)}
                    />
                  }
                  label="Create Service"
                />
                <Typography variant="caption" display="block" color="text.secondary">
                  Expose your agent via a Kubernetes Service
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={productionConfig.createConfigMap}
                      onChange={(e) => handleProductionConfigChange('createConfigMap', e.target.checked)}
                    />
                  }
                  label="Create ConfigMap"
                />
                <Typography variant="caption" display="block" color="text.secondary">
                  Store configuration data separately
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={productionConfig.createSecret}
                      onChange={(e) => handleProductionConfigChange('createSecret', e.target.checked)}
                    />
                  }
                  label="Create Secret"
                />
                <Typography variant="caption" display="block" color="text.secondary">
                  Store sensitive data like API keys
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={productionConfig.createDeployment}
                      onChange={(e) => handleProductionConfigChange('createDeployment', e.target.checked)}
                    />
                  }
                  label="Create Deployment"
                />
                <Typography variant="caption" display="block" color="text.secondary">
                  Manage pod replicas and updates
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Networking & Scaling */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Networking & Scaling
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={productionConfig.createIngress}
                      onChange={(e) => handleProductionConfigChange('createIngress', e.target.checked)}
                    />
                  }
                  label="Create Ingress"
                />
                <Typography variant="caption" display="block" color="text.secondary">
                  HTTP/HTTPS routing for external access
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={productionConfig.createRoute}
                      onChange={(e) => handleProductionConfigChange('createRoute', e.target.checked)}
                    />
                  }
                  label="Create Route (OpenShift)"
                />
                <Typography variant="caption" display="block" color="text.secondary">
                  OpenShift-specific routing
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={productionConfig.createHPA}
                      onChange={(e) => handleProductionConfigChange('createHPA', e.target.checked)}
                    />
                  }
                  label="Create HPA (Horizontal Pod Autoscaler)"
                />
                <Typography variant="caption" display="block" color="text.secondary">
                  Automatically scale based on CPU/memory usage
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={productionConfig.createNetworkPolicy}
                      onChange={(e) => handleProductionConfigChange('createNetworkPolicy', e.target.checked)}
                    />
                  }
                  label="Create NetworkPolicy"
                />
                <Typography variant="caption" display="block" color="text.secondary">
                  Control network traffic between pods
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Storage */}
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Storage
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={productionConfig.createPVC}
                      onChange={(e) => handleProductionConfigChange('createPVC', e.target.checked)}
                    />
                  }
                  label="Create PersistentVolumeClaim"
                />
                <Typography variant="caption" display="block" color="text.secondary">
                  Persistent storage for your application
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Service Configuration */}
        {productionConfig.createService && (
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">Service Configuration</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Service Type</InputLabel>
                      <Select
                        value={productionConfig.serviceConfig?.type || 'ClusterIP'}
                        onChange={(e) => handleServiceConfigChange('type', e.target.value)}
                        label="Service Type"
                      >
                        <MenuItem value="ClusterIP">ClusterIP</MenuItem>
                        <MenuItem value="NodePort">NodePort</MenuItem>
                        <MenuItem value="LoadBalancer">LoadBalancer</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Port"
                      type="number"
                      value={productionConfig.serviceConfig?.port || 8080}
                      onChange={(e) => handleServiceConfigChange('port', parseInt(e.target.value))}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Target Port"
                      type="number"
                      value={productionConfig.serviceConfig?.targetPort || 8080}
                      onChange={(e) => handleServiceConfigChange('targetPort', parseInt(e.target.value))}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        )}

        {/* Ingress Configuration */}
        {productionConfig.createIngress && (
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">Ingress Configuration</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Host"
                      value={productionConfig.ingressConfig?.host || ''}
                      onChange={(e) => handleIngressConfigChange('host', e.target.value)}
                      placeholder="my-agent.example.com"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Path"
                      value={productionConfig.ingressConfig?.path || '/'}
                      onChange={(e) => handleIngressConfigChange('path', e.target.value)}
                      placeholder="/"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={productionConfig.ingressConfig?.tls?.enabled || false}
                          onChange={(e) => handleIngressConfigChange('tls', { enabled: e.target.checked })}
                        />
                      }
                      label="Enable TLS"
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        )}

        {/* Route Configuration */}
        {productionConfig.createRoute && (
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">Route Configuration (OpenShift)</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Host"
                      value={productionConfig.routeConfig?.host || ''}
                      onChange={(e) => handleRouteConfigChange('host', e.target.value)}
                      placeholder="my-agent.apps.example.com"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Path"
                      value={productionConfig.routeConfig?.path || '/'}
                      onChange={(e) => handleRouteConfigChange('path', e.target.value)}
                      placeholder="/"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={productionConfig.routeConfig?.tls?.enabled || false}
                          onChange={(e) => handleRouteConfigChange('tls', { enabled: e.target.checked })}
                        />
                      }
                      label="Enable TLS"
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        )}

        {/* HPA Configuration */}
        {productionConfig.createHPA && (
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">Horizontal Pod Autoscaler Configuration</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Min Replicas"
                      type="number"
                      value={productionConfig.hpaConfig?.minReplicas || 1}
                      onChange={(e) => handleHPAConfigChange('minReplicas', parseInt(e.target.value))}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Max Replicas"
                      type="number"
                      value={productionConfig.hpaConfig?.maxReplicas || 10}
                      onChange={(e) => handleHPAConfigChange('maxReplicas', parseInt(e.target.value))}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Target CPU %"
                      type="number"
                      value={productionConfig.hpaConfig?.targetCPUUtilizationPercentage || 70}
                      onChange={(e) => handleHPAConfigChange('targetCPUUtilizationPercentage', parseInt(e.target.value))}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        )}

        {/* PVC Configuration */}
        {productionConfig.createPVC && (
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">PersistentVolumeClaim Configuration</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Size"
                      value={productionConfig.pvcConfig?.size || '1Gi'}
                      onChange={(e) => handlePVCConfigChange('size', e.target.value)}
                      placeholder="1Gi"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Storage Class"
                      value={productionConfig.pvcConfig?.storageClass || ''}
                      onChange={(e) => handlePVCConfigChange('storageClass', e.target.value)}
                      placeholder="fast-ssd"
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        )}
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

export default ProductionConfigStep;
