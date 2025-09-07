import React from 'react';
import { 
  Box,
  Button,
  Typography,
  
  Card,
  CardContent,
  TextField,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';

import {  ExpandMore, Add, Delete } from '@mui/icons-material';
import {  FormData, Tool } from '../types';

interface ToolsStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ToolsStep: React.FC<ToolsStepProps> = ({
  formData,
  setFormData,
  onNext,
  onBack,
}) => {
  const addTool = () => {
    const newTool: Tool = {
      name: '',
      description: '',
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
    };

    setFormData({
      ...formData,
      spec: {
        ...formData.spec,
        tools: [...(formData.spec.tools || []), newTool],
      },
    });
  };

  const updateTool = (index: number, field: string, value: any) => {
    const updatedTools = [...(formData.spec.tools || [])];
    updatedTools[index] = { ...updatedTools[index], [field]: value };

    setFormData({
      ...formData,
      spec: {
        ...formData.spec,
        tools: updatedTools,
      },
    });
  };

  const removeTool = (index: number) => {
    const updatedTools = (formData.spec.tools || []).filter((_, i) => i !== index);
    setFormData({
      ...formData,
      spec: {
        ...formData.spec,
        tools: updatedTools,
      },
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Tools Configuration
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Define tools that your agent can use to interact with external systems.
        Tools are optional but enable powerful integrations.
      </Typography>

      <Card variant="outlined">
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Available Tools</Typography>
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={addTool}
              size="small"
            >
              Add Tool
            </Button>
          </Box>

          {formData.spec.tools && formData.spec.tools.length > 0 ? (
            formData.spec.tools.map((tool, index) => (
              <Accordion key={index} sx={{ mt: 2 }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>{tool.name || `Tool ${index + 1}`}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Tool Name"
                        value={tool.name}
                        onChange={(e) => updateTool(index, 'name', e.target.value)}
                        placeholder="order_lookup"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Description"
                        value={tool.description}
                        onChange={(e) => updateTool(index, 'description', e.target.value)}
                        placeholder="Look up order information by order ID"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <IconButton
                        color="error"
                        onClick={() => removeTool(index)}
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 4 }}>
              No tools configured. Click "Add Tool" to get started.
            </Typography>
          )}
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button onClick={onBack}>Back</Button>
        <Button variant="contained" onClick={onNext}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ToolsStep;
