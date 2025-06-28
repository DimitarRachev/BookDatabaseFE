import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Search,
  Category
} from '@mui/icons-material';

import { Genre } from '../types';
import { genresApi } from '../services/api';
import GenreForm from '../components/GenreForm';

const GenresPage: React.FC = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingGenre, setEditingGenre] = useState<Genre | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  useEffect(() => {
    loadGenres();
  }, []);

  const loadGenres = async () => {
    try {
      setLoading(true);
      const response = await genresApi.getAll();
      setGenres(response.data);
    } catch (error) {
      showSnackbar('Грешка при зареждане на жанровете', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      await loadGenres();
      return;
    }

    try {
      setLoading(true);
      const response = await genresApi.search(searchTerm);
      setGenres(response.data);
    } catch (error) {
      showSnackbar('Грешка при търсене', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingGenre(null);
    setOpenDialog(true);
  };

  const handleEdit = (genre: Genre) => {
    setEditingGenre(genre);
    setOpenDialog(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Сигурни ли сте, че искате да изтриете този жанр?')) {
      try {
        await genresApi.delete(id);
        setGenres(genres.filter(genre => genre.id !== id));
        showSnackbar('Жанрът е изтрит успешно', 'success');
      } catch (error) {
        showSnackbar('Грешка при изтриване на жанра', 'error');
      }
    }
  };

  const handleSave = async (genre: Genre) => {
    try {
      if (editingGenre) {
        const response = await genresApi.update(editingGenre.id!, genre);
        setGenres(genres.map(g => g.id === editingGenre.id ? response.data : g));
        showSnackbar('Жанрът е обновен успешно', 'success');
      } else {
        const response = await genresApi.create(genre);
        setGenres([...genres, response.data]);
        showSnackbar('Жанрът е създаден успешно', 'success');
      }
      setOpenDialog(false);
    } catch (error) {
      showSnackbar('Грешка при запазване на жанра', 'error');
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        <Category sx={{ mr: 1, verticalAlign: 'middle' }} />
        Жанрове
      </Typography>

      {/* Search Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label="Търсене по име на жанр"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<Search />}
                onClick={handleSearch}
              >
                Търси
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Add Button */}
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleCreate}
        >
          Добави нов жанр
        </Button>
      </Box>

      {/* Genres Grid */}
      <Grid container spacing={3}>
        {genres.map((genre) => (
          <Grid item xs={12} sm={6} md={4} key={genre.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {genre.name}
                </Typography>

                {genre.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {genre.description.length > 150 
                      ? `${genre.description.substring(0, 150)}...` 
                      : genre.description}
                  </Typography>
                )}
              </CardContent>
              
              <CardActions>
                <IconButton
                  size="small"
                  onClick={() => handleEdit(genre)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(genre.id!)}
                  color="error"
                >
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Genre Form Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingGenre ? 'Редактиране на жанр' : 'Нов жанр'}
        </DialogTitle>
        <DialogContent>
          <GenreForm
            genre={editingGenre}
            onSave={handleSave}
            onCancel={() => setOpenDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default GenresPage; 