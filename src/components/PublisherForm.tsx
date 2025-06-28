import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid
} from '@mui/material';
import { Publisher } from '../types';

interface PublisherFormProps {
  publisher?: Publisher | null;
  onSave: (publisher: Publisher) => void;
  onCancel: () => void;
}

const PublisherForm: React.FC<PublisherFormProps> = ({
  publisher,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState<Publisher>({
    name: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    description: ''
  });

  useEffect(() => {
    if (publisher) {
      setFormData(publisher);
    }
  }, [publisher]);

  const handleInputChange = (field: keyof Publisher, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Име на издателството"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Адрес"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Телефон"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Имейл"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Уебсайт"
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Описание"
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={onCancel}>
              Отказ
            </Button>
            <Button type="submit" variant="contained">
              {publisher ? 'Обнови' : 'Създай'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PublisherForm; 