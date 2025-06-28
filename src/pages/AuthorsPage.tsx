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
  Person
} from '@mui/icons-material';
import { format } from 'date-fns';
import { bg } from 'date-fns/locale';

import { Author } from '../types';
import { authorsApi } from '../services/api';
import AuthorForm from '../components/AuthorForm';

const AuthorsPage: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  useEffect(() => {
    loadAuthors();
  }, []);

  const loadAuthors = async () => {
    try {
      setLoading(true);
      const response = await authorsApi.getAll();
      setAuthors(response.data);
    } catch (error) {
      showSnackbar('Грешка при зареждане на авторите', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      await loadAuthors();
      return;
    }

    try {
      setLoading(true);
      const response = await authorsApi.search(searchTerm);
      setAuthors(response.data);
    } catch (error) {
      showSnackbar('Грешка при търсене', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingAuthor(null);
    setOpenDialog(true);
  };

  const handleEdit = (author: Author) => {
    setEditingAuthor(author);
    setOpenDialog(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Сигурни ли сте, че искате да изтриете този автор?')) {
      try {
        await authorsApi.delete(id);
        setAuthors(authors.filter(author => author.id !== id));
        showSnackbar('Авторът е изтрит успешно', 'success');
      } catch (error) {
        showSnackbar('Грешка при изтриване на автора', 'error');
      }
    }
  };

  const handleSave = async (author: Author) => {
    try {
      if (editingAuthor) {
        const response = await authorsApi.update(editingAuthor.id!, author);
        setAuthors(authors.map(a => a.id === editingAuthor.id ? response.data : a));
        showSnackbar('Авторът е обновен успешно', 'success');
      } else {
        const response = await authorsApi.create(author);
        setAuthors([...authors, response.data]);
        showSnackbar('Авторът е създаден успешно', 'success');
      }
      setOpenDialog(false);
    } catch (error) {
      showSnackbar('Грешка при запазване на автора', 'error');
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMMM yyyy', { locale: bg });
    } catch {
      return dateString;
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        <Person sx={{ mr: 1, verticalAlign: 'middle' }} />
        Автори
      </Typography>

      {/* Search Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label="Търсене по име"
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
          Добави нов автор
        </Button>
      </Box>

      {/* Authors Grid */}
      <Grid container spacing={3}>
        {authors.map((author) => (
          <Grid item xs={12} sm={6} md={4} key={author.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {author.firstName} {author.lastName}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Дата на раждане:</strong> {formatDate(author.birthDate)}
                </Typography>

                {author.biography && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {author.biography.length > 150 
                      ? `${author.biography.substring(0, 150)}...` 
                      : author.biography}
                  </Typography>
                )}
              </CardContent>
              
              <CardActions>
                <IconButton
                  size="small"
                  onClick={() => handleEdit(author)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(author.id!)}
                  color="error"
                >
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Author Form Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingAuthor ? 'Редактиране на автор' : 'Нов автор'}
        </DialogTitle>
        <DialogContent>
          <AuthorForm
            author={editingAuthor}
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

export default AuthorsPage; 