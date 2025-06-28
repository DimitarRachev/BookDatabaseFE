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
  DialogActions,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Search,
  Book,
  Person,
  Business,
  Category
} from '@mui/icons-material';
import { format } from 'date-fns';
import { bg } from 'date-fns/locale';

import { Book as BookType, Author, Publisher, Genre } from '../types';
import { booksApi, authorsApi, publishersApi, genresApi } from '../services/api';
import BookForm from '../components/BookForm';

const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('general');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingBook, setEditingBook] = useState<BookType | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [booksRes, authorsRes, publishersRes, genresRes] = await Promise.all([
        booksApi.getAll(),
        authorsApi.getAll(),
        publishersApi.getAll(),
        genresApi.getAll()
      ]);
      
      setBooks(booksRes.data);
      setAuthors(authorsRes.data);
      setPublishers(publishersRes.data);
      setGenres(genresRes.data);
    } catch (error) {
      showSnackbar('Грешка при зареждане на данните', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      await loadData();
      return;
    }

    try {
      setLoading(true);
      let response;
      
      switch (searchType) {
        case 'title':
          response = await booksApi.searchByTitle(searchTerm);
          break;
        case 'author':
          response = await booksApi.searchByAuthor(searchTerm);
          break;
        case 'publisher':
          response = await booksApi.searchByPublisher(searchTerm);
          break;
        case 'genre':
          response = await booksApi.searchByGenre(searchTerm);
          break;
        default:
          response = await booksApi.search({ searchTerm });
      }
      
      setBooks(response.data);
    } catch (error) {
      showSnackbar('Грешка при търсене', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingBook(null);
    setOpenDialog(true);
  };

  const handleEdit = (book: BookType) => {
    setEditingBook(book);
    setOpenDialog(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Сигурни ли сте, че искате да изтриете тази книга?')) {
      try {
        await booksApi.delete(id);
        setBooks(books.filter(book => book.id !== id));
        showSnackbar('Книгата е изтрита успешно', 'success');
      } catch (error) {
        showSnackbar('Грешка при изтриване на книгата', 'error');
      }
    }
  };

  const handleSave = async (book: BookType) => {
    try {
      if (editingBook) {
        const response = await booksApi.update(editingBook.id!, book);
        setBooks(books.map(b => b.id === editingBook.id ? response.data : b));
        showSnackbar('Книгата е обновена успешно', 'success');
      } else {
        const response = await booksApi.create(book);
        setBooks([...books, response.data]);
        showSnackbar('Книгата е създадена успешно', 'success');
      }
      setOpenDialog(false);
    } catch (error) {
      showSnackbar('Грешка при запазване на книгата', 'error');
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
        <Book sx={{ mr: 1, verticalAlign: 'middle' }} />
        Книги
      </Typography>

      {/* Search Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Тип търсене</InputLabel>
                <Select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  label="Тип търсене"
                >
                  <MenuItem value="general">Общо търсене</MenuItem>
                  <MenuItem value="title">По заглавие</MenuItem>
                  <MenuItem value="author">По автор</MenuItem>
                  <MenuItem value="publisher">По издателство</MenuItem>
                  <MenuItem value="genre">По жанр</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Търсене"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
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
          Добави нова книга
        </Button>
      </Box>

      {/* Books Grid */}
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {book.title}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>ISBN:</strong> {book.isbn}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Дата на публикуване:</strong> {formatDate(book.publicationDate)}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Страници:</strong> {book.pages}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Език:</strong> {book.language}
                </Typography>

                <Box sx={{ mt: 1, mb: 1 }}>
                  <Chip
                    icon={<Category />}
                    label={book.genre.name}
                    size="small"
                    sx={{ mr: 1, mb: 1 }}
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Автори:</strong>
                </Typography>
                {book.authors.map((author) => (
                  <Chip
                    key={author.id}
                    icon={<Person />}
                    label={`${author.firstName} ${author.lastName}`}
                    size="small"
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Издателство:</strong>
                </Typography>
                <Chip
                  icon={<Business />}
                  label={book.publisher.name}
                  size="small"
                  sx={{ mb: 1 }}
                />

                {book.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {book.description.length > 100 
                      ? `${book.description.substring(0, 100)}...` 
                      : book.description}
                  </Typography>
                )}
              </CardContent>
              
              <CardActions>
                <IconButton
                  size="small"
                  onClick={() => handleEdit(book)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(book.id!)}
                  color="error"
                >
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Book Form Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingBook ? 'Редактиране на книга' : 'Нова книга'}
        </DialogTitle>
        <DialogContent>
          <BookForm
            book={editingBook}
            authors={authors}
            publishers={publishers}
            genres={genres}
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

export default BooksPage; 