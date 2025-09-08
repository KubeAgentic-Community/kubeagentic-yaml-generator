import React, { useState } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import { GitHub } from '@mui/icons-material';
import YAML from 'js-yaml';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { FormData, KubeAgenticAgent } from './types';
import BasicInfoStep from './components/BasicInfoStep';
import ProviderStep from './components/ProviderStep';
import FrameworkStep from './components/FrameworkStep';
import ToolsStep from './components/ToolsStep';
import ResourcesStep from './components/ResourcesStep';
import ProductionConfigStep from './components/ProductionConfigStep';
import ReviewStep from './components/ReviewStep';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
  },
});

const steps = [
  'Basic Information',
  'Provider & Model',
  'Framework',
  'Tools',
  'Resources',
  'Production Config',
  'Review & Generate',
];

const initialFormData: FormData = {
  metadata: {
    name: '',
    namespace: 'default',
  },
  spec: {
    provider: 'openai',
    model: 'gpt-3.5-turbo',
    systemPrompt: '',
    apiSecretRef: {
      name: '',
      key: 'api-key',
    },
    framework: 'direct',
    replicas: 1,
    serviceType: 'ClusterIP',
    resources: {
      requests: {
        memory: '256Mi',
        cpu: '100m',
      },
      limits: {
        memory: '512Mi',
        cpu: '200m',
      },
    },
  },
  productionConfig: {
    createService: false,
    createIngress: false,
    createRoute: false,
    createConfigMap: false,
    createSecret: false,
    createDeployment: false,
    createHPA: false,
    createPVC: false,
    createNetworkPolicy: false,
  },
};

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [generatedYAML, setGeneratedYAML] = useState<string>('');

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData(initialFormData);
    setGeneratedYAML('');
  };

  const generateYAML = () => {
    const yamlFiles: string[] = [];
    
    // Generate main Agent YAML
    const agent: KubeAgenticAgent = {
      apiVersion: 'ai.example.com/v1',
      kind: 'Agent',
      metadata: formData.metadata,
      spec: formData.spec,
    };
    
    yamlFiles.push('---\n# KubeAgentic Agent\n' + YAML.dump(agent, {
      indent: 2,
      lineWidth: -1,
      noRefs: true,
    }));

    // Generate additional resources if enabled
    if (formData.productionConfig) {
      const { productionConfig } = formData;
      
      // Service
      if (productionConfig.createService && productionConfig.serviceConfig) {
        const service = {
          apiVersion: 'v1',
          kind: 'Service',
          metadata: {
            name: `${formData.metadata.name}-service`,
            namespace: formData.metadata.namespace || 'default',
            labels: {
              app: formData.metadata.name,
            },
          },
          spec: {
            type: productionConfig.serviceConfig.type || 'ClusterIP',
            ports: [{
              port: productionConfig.serviceConfig.port || 8080,
              targetPort: productionConfig.serviceConfig.targetPort || 8080,
              protocol: 'TCP',
            }],
            selector: {
              app: formData.metadata.name,
            },
          },
        };
        yamlFiles.push('---\n# Service\n' + YAML.dump(service, { indent: 2, lineWidth: -1, noRefs: true }));
      }

      // Ingress
      if (productionConfig.createIngress && productionConfig.ingressConfig) {
        const ingress = {
          apiVersion: 'networking.k8s.io/v1',
          kind: 'Ingress',
          metadata: {
            name: `${formData.metadata.name}-ingress`,
            namespace: formData.metadata.namespace || 'default',
            annotations: productionConfig.ingressConfig.annotations || {},
          },
          spec: {
            rules: [{
              host: productionConfig.ingressConfig.host,
              http: {
                paths: [{
                  path: productionConfig.ingressConfig.path || '/',
                  pathType: 'Prefix',
                  backend: {
                    service: {
                      name: `${formData.metadata.name}-service`,
                      port: {
                        number: productionConfig.serviceConfig?.port || 8080,
                      },
                    },
                  },
                }],
              },
            }],
            ...(productionConfig.ingressConfig.tls?.enabled && {
              tls: [{
                hosts: [productionConfig.ingressConfig.host],
                secretName: productionConfig.ingressConfig.tls.secretName || `${formData.metadata.name}-tls`,
              }],
            }),
          },
        };
        yamlFiles.push('---\n# Ingress\n' + YAML.dump(ingress, { indent: 2, lineWidth: -1, noRefs: true }));
      }

      // Route (OpenShift)
      if (productionConfig.createRoute && productionConfig.routeConfig) {
        const route = {
          apiVersion: 'route.openshift.io/v1',
          kind: 'Route',
          metadata: {
            name: `${formData.metadata.name}-route`,
            namespace: formData.metadata.namespace || 'default',
            annotations: productionConfig.routeConfig.annotations || {},
          },
          spec: {
            host: productionConfig.routeConfig.host,
            path: productionConfig.routeConfig.path || '/',
            to: {
              kind: 'Service',
              name: `${formData.metadata.name}-service`,
            },
            ...(productionConfig.routeConfig.tls?.enabled && {
              tls: {
                termination: productionConfig.routeConfig.tls.termination || 'edge',
              },
            }),
          },
        };
        yamlFiles.push('---\n# Route (OpenShift)\n' + YAML.dump(route, { indent: 2, lineWidth: -1, noRefs: true }));
      }

      // HPA
      if (productionConfig.createHPA && productionConfig.hpaConfig) {
        const hpa = {
          apiVersion: 'autoscaling/v2',
          kind: 'HorizontalPodAutoscaler',
          metadata: {
            name: `${formData.metadata.name}-hpa`,
            namespace: formData.metadata.namespace || 'default',
          },
          spec: {
            scaleTargetRef: {
              apiVersion: 'ai.example.com/v1',
              kind: 'Agent',
              name: formData.metadata.name,
            },
            minReplicas: productionConfig.hpaConfig.minReplicas || 1,
            maxReplicas: productionConfig.hpaConfig.maxReplicas || 10,
            metrics: [{
              type: 'Resource',
              resource: {
                name: 'cpu',
                target: {
                  type: 'Utilization',
                  averageUtilization: productionConfig.hpaConfig.targetCPUUtilizationPercentage || 70,
                },
              },
            }],
          },
        };
        yamlFiles.push('---\n# HorizontalPodAutoscaler\n' + YAML.dump(hpa, { indent: 2, lineWidth: -1, noRefs: true }));
      }

      // PVC
      if (productionConfig.createPVC && productionConfig.pvcConfig) {
        const pvc = {
          apiVersion: 'v1',
          kind: 'PersistentVolumeClaim',
          metadata: {
            name: `${formData.metadata.name}-pvc`,
            namespace: formData.metadata.namespace || 'default',
          },
          spec: {
            accessModes: ['ReadWriteOnce'],
            resources: {
              requests: {
                storage: productionConfig.pvcConfig.size || '1Gi',
              },
            },
            ...(productionConfig.pvcConfig.storageClass && {
              storageClassName: productionConfig.pvcConfig.storageClass,
            }),
          },
        };
        yamlFiles.push('---\n# PersistentVolumeClaim\n' + YAML.dump(pvc, { indent: 2, lineWidth: -1, noRefs: true }));
      }

      // NetworkPolicy
      if (productionConfig.createNetworkPolicy && productionConfig.networkPolicyConfig) {
        const networkPolicy = {
          apiVersion: 'networking.k8s.io/v1',
          kind: 'NetworkPolicy',
          metadata: {
            name: `${formData.metadata.name}-netpol`,
            namespace: formData.metadata.namespace || 'default',
          },
          spec: {
            podSelector: {
              matchLabels: {
                app: formData.metadata.name,
              },
            },
            policyTypes: ['Ingress', 'Egress'],
            ...(productionConfig.networkPolicyConfig.ingress && {
              ingress: [{
                from: [{
                  namespaceSelector: {},
                }],
              }],
            }),
            ...(productionConfig.networkPolicyConfig.egress && {
              egress: [{
                to: [{
                  namespaceSelector: {},
                }],
              }],
            }),
          },
        };
        yamlFiles.push('---\n# NetworkPolicy\n' + YAML.dump(networkPolicy, { indent: 2, lineWidth: -1, noRefs: true }));
      }
    }

    setGeneratedYAML(yamlFiles.join('\n'));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedYAML);
  };

  const downloadYAML = () => {
    const blob = new Blob([generatedYAML], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.metadata.name || 'kubeagentic-agent'}-complete.yaml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <BasicInfoStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <ProviderStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <FrameworkStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <ToolsStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <ResourcesStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <ProductionConfigStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 6:
        return (
          <ReviewStep
            formData={formData}
            generatedYAML={generatedYAML}
            onGenerate={generateYAML}
            onCopy={copyToClipboard}
            onDownload={downloadYAML}
            onBack={handleBack}
            onReset={handleReset}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            KubeAgentic YAML Generator
          </Typography>
          <IconButton
            color="inherit"
            href="https://github.com/KubeAgentic-Community/kubeagentic-yaml-generator"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Generate KubeAgentic YAML Configuration
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary">
            Create complete production-ready AI agent configurations for Kubernetes deployment
          </Typography>
        </Box>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        <Paper sx={{ p: 3 }}>
          {renderStepContent(activeStep)}
        </Paper>

        {generatedYAML && (
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Generated Complete YAML Configuration
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              This includes all selected Kubernetes resources for a complete production deployment.
            </Typography>
            <Box sx={{ position: 'relative' }}>
              <SyntaxHighlighter
                language="yaml"
                style={tomorrow}
                customStyle={{
                  borderRadius: '8px',
                  fontSize: '14px',
                }}
              >
                {generatedYAML}
              </SyntaxHighlighter>
            </Box>
          </Paper>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
