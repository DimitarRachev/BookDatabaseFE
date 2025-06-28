import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid
} from '@mui/material';
import { Genre } from '../types';

interface GenreFormProps {
  genre?: Genre | null;
  onSave: (genre: Genre) => void;
  onCancel: () => void;
}

const GenreForm: React.FC<GenreFormProps> = ({
  genre,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState<Genre>({
    name: '',
    description: ''
  });

  useEffect(() => {
    if (genre) {
      setFormData(genre);
    }
  }, [genre]);

  const handleInputChange = (field: keyof Genre, value: string) => {
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
            label="Име на жанра"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
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
              {genre ? 'Обнови' : 'Създай'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GenreForm; 