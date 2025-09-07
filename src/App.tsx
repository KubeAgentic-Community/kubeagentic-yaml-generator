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
  Grid,
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
    const agent: KubeAgenticAgent = {
      apiVersion: 'ai.example.com/v1',
      kind: 'Agent',
      metadata: formData.metadata,
      spec: formData.spec,
    };

    const yamlString = YAML.dump(agent, {
      indent: 2,
      lineWidth: -1,
      noRefs: true,
    });

    setGeneratedYAML(yamlString);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedYAML);
  };

  const downloadYAML = () => {
    const blob = new Blob([generatedYAML], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.metadata.name || 'kubeagentic-agent'}.yaml`;
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
            Create AI agent configurations for Kubernetes deployment
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
              Generated YAML Configuration
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
