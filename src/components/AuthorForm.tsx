import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid
} from '@mui/material';
import { Author } from '../types';

interface AuthorFormProps {
  author?: Author | null;
  onSave: (author: Author) => void;
  onCancel: () => void;
}

const AuthorForm: React.FC<AuthorFormProps> = ({
  author,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState<Author>({
    firstName: '',
    lastName: '',
    birthDate: '',
    biography: ''
  });

  useEffect(() => {
    if (author) {
      setFormData(author);
    }
  }, [author]);

  const handleInputChange = (field: keyof Author, value: string) => {
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
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Първо име"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            required
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Фамилия"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Дата на раждане"
            type="date"
            value={formData.birthDate}
            onChange={(e) => handleInputChange('birthDate', e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Биография"
            multiline
            rows={4}
            value={formData.biography}
            onChange={(e) => handleInputChange('biography', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={onCancel}>
              Отказ
            </Button>
            <Button type="submit" variant="contained">
              {author ? 'Обнови' : 'Създай'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthorForm; 