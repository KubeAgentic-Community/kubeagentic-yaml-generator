import React from 'react';
import { 
  Box,
  Button,
  Typography,
  
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Grid,
} from '@mui/material';

import {  ExpandMore, Add, Delete } from '@mui/icons-material';
import {  FormData, LangGraphNode, LangGraphEdge } from '../types';

interface FrameworkStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const FrameworkStep: React.FC<FrameworkStepProps> = ({
  formData,
  setFormData,
  onNext,
  onBack,
}) => {
  const handleFrameworkChange = (framework: 'direct' | 'langgraph') => {
    setFormData({
      ...formData,
      spec: {
        ...formData.spec,
        framework,
        langgraphConfig: framework === 'langgraph' ? {
          graphType: 'sequential',
          nodes: [],
          edges: [],
        } : undefined,
      },
    });
  };

  const addNode = () => {
    if (!formData.spec.langgraphConfig) return;
    
    const newNode: LangGraphNode = {
      name: `node-${formData.spec.langgraphConfig.nodes.length + 1}`,
      type: 'llm',
      prompt: '',
    };

    setFormData({
      ...formData,
      spec: {
        ...formData.spec,
        langgraphConfig: {
          ...formData.spec.langgraphConfig,
          nodes: [...formData.spec.langgraphConfig.nodes, newNode],
        },
      },
    });
  };

  const updateNode = (index: number, field: string, value: any) => {
    if (!formData.spec.langgraphConfig) return;

    const updatedNodes = [...formData.spec.langgraphConfig.nodes];
    updatedNodes[index] = { ...updatedNodes[index], [field]: value };

    setFormData({
      ...formData,
      spec: {
        ...formData.spec,
        langgraphConfig: {
          ...formData.spec.langgraphConfig,
          nodes: updatedNodes,
        },
      },
    });
  };

  const removeNode = (index: number) => {
    if (!formData.spec.langgraphConfig) return;

    const updatedNodes = formData.spec.langgraphConfig.nodes.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      spec: {
        ...formData.spec,
        langgraphConfig: {
          ...formData.spec.langgraphConfig,
          nodes: updatedNodes,
        },
      },
    });
  };

  const addEdge = () => {
    if (!formData.spec.langgraphConfig) return;
    
    const newEdge: LangGraphEdge = {
      from: '',
      to: '',
    };

    setFormData({
      ...formData,
      spec: {
        ...formData.spec,
        langgraphConfig: {
          ...formData.spec.langgraphConfig,
          edges: [...formData.spec.langgraphConfig.edges, newEdge],
        },
      },
    });
  };

  const updateEdge = (index: number, field: string, value: string) => {
    if (!formData.spec.langgraphConfig) return;

    const updatedEdges = [...formData.spec.langgraphConfig.edges];
    updatedEdges[index] = { ...updatedEdges[index], [field]: value };

    setFormData({
      ...formData,
      spec: {
        ...formData.spec,
        langgraphConfig: {
          ...formData.spec.langgraphConfig,
          edges: updatedEdges,
        },
      },
    });
  };

  const removeEdge = (index: number) => {
    if (!formData.spec.langgraphConfig) return;

    const updatedEdges = formData.spec.langgraphConfig.edges.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      spec: {
        ...formData.spec,
        langgraphConfig: {
          ...formData.spec.langgraphConfig,
          edges: updatedEdges,
        },
      },
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Framework Selection
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Choose between simple direct API calls or complex LangGraph workflows.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Framework Type</FormLabel>
            <RadioGroup
              value={formData.spec.framework}
              onChange={(e) => handleFrameworkChange(e.target.value as 'direct' | 'langgraph')}
            >
              <FormControlLabel
                value="direct"
                control={<Radio />}
                label={
                  <Box>
                    <Typography variant="subtitle1">Direct Framework</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Simple, fast API calls for basic interactions
                    </Typography>
                  </Box>
                }
              />
              <FormControlLabel
                value="langgraph"
                control={<Radio />}
                label={
                  <Box>
                    <Typography variant="subtitle1">LangGraph Framework</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Complex workflows with multi-step reasoning
                    </Typography>
                  </Box>
                }
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        {formData.spec.framework === 'langgraph' && formData.spec.langgraphConfig && (
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">LangGraph Configuration</Typography>
                  <Button
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={addNode}
                    size="small"
                  >
                    Add Node
                  </Button>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Graph Type</InputLabel>
                      <Select
                        value={formData.spec.langgraphConfig.graphType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            spec: {
                              ...formData.spec,
                              langgraphConfig: {
                                ...formData.spec.langgraphConfig!,
                                graphType: e.target.value as any,
                              },
                            },
                          })
                        }
                        label="Graph Type"
                      >
                        <MenuItem value="sequential">Sequential</MenuItem>
                        <MenuItem value="parallel">Parallel</MenuItem>
                        <MenuItem value="conditional">Conditional</MenuItem>
                        <MenuItem value="hierarchical">Hierarchical</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                {formData.spec.langgraphConfig.nodes.map((node, index) => (
                  <Accordion key={index} sx={{ mt: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography>Node {index + 1}: {node.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Node Name"
                            value={node.name}
                            onChange={(e) => updateNode(index, 'name', e.target.value)}
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth size="small">
                            <InputLabel>Node Type</InputLabel>
                            <Select
                              value={node.type}
                              onChange={(e) => updateNode(index, 'type', e.target.value)}
                              label="Node Type"
                            >
                              <MenuItem value="llm">LLM</MenuItem>
                              <MenuItem value="tool">Tool</MenuItem>
                              <MenuItem value="action">Action</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        {node.type === 'llm' && (
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Prompt Template"
                              value={node.prompt || ''}
                              onChange={(e) => updateNode(index, 'prompt', e.target.value)}
                              multiline
                              rows={2}
                              size="small"
                            />
                          </Grid>
                        )}
                        <Grid item xs={12}>
                          <IconButton
                            color="error"
                            onClick={() => removeNode(index)}
                            size="small"
                          >
                            <Delete />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                ))}

                <Box sx={{ mt: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">Edges</Typography>
                    <Button
                      variant="outlined"
                      startIcon={<Add />}
                      onClick={addEdge}
                      size="small"
                    >
                      Add Edge
                    </Button>
                  </Box>

                  {formData.spec.langgraphConfig.edges.map((edge, index) => (
                    <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
                      <TextField
                        label="From"
                        value={edge.from}
                        onChange={(e) => updateEdge(index, 'from', e.target.value)}
                        size="small"
                      />
                      <TextField
                        label="To"
                        value={edge.to}
                        onChange={(e) => updateEdge(index, 'to', e.target.value)}
                        size="small"
                      />
                      <IconButton
                        color="error"
                        onClick={() => removeEdge(index)}
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
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

export default FrameworkStep;
