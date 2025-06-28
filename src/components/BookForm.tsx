import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Chip,
  OutlinedInput,
  SelectChangeEvent
} from '@mui/material';
import { Book, Author, Publisher, Genre } from '../types';

interface BookFormProps {
  book?: Book | null;
  authors: Author[];
  publishers: Publisher[];
  genres: Genre[];
  onSave: (book: Book) => void;
  onCancel: () => void;
}

const BookForm: React.FC<BookFormProps> = ({
  book,
  authors,
  publishers,
  genres,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState<Book>({
    title: '',
    isbn: '',
    publicationDate: '',
    genre: { id: 0, name: '', description: '' },
    description: '',
    pages: 0,
    language: '',
    authors: [],
    publisher: { id: 0, name: '', address: '', phone: '', email: '', website: '', description: '' }
  });

  const [selectedAuthors, setSelectedAuthors] = useState<number[]>([]);

  useEffect(() => {
    if (book) {
      setFormData(book);
      setSelectedAuthors(book.authors.map(author => author.id!));
    }
  }, [book]);

  const handleInputChange = (field: keyof Book, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenreChange = (genreId: number) => {
    const genre = genres.find(g => g.id === genreId);
    if (genre) {
      setFormData(prev => ({
        ...prev,
        genre: { id: genre.id!, name: genre.name, description: genre.description }
      }));
    }
  };

  const handlePublisherChange = (publisherId: number) => {
    const publisher = publishers.find(p => p.id === publisherId);
    if (publisher) {
      setFormData(prev => ({
        ...prev,
        publisher: {
          id: publisher.id!,
          name: publisher.name,
          address: publisher.address,
          phone: publisher.phone,
          email: publisher.email,
          website: publisher.website,
          description: publisher.description
        }
      }));
    }
  };

  const handleAuthorChange = (event: SelectChangeEvent<number[]>) => {
    const value = event.target.value as number[];
    setSelectedAuthors(value);
    
    const selectedAuthorObjects = authors
      .filter(author => value.includes(author.id!))
      .map(author => ({
        id: author.id!,
        firstName: author.firstName,
        lastName: author.lastName,
        birthDate: author.birthDate,
        biography: author.biography
      }));

    setFormData(prev => ({
      ...prev,
      authors: selectedAuthorObjects
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
            label="Заглавие"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            required
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="ISBN"
            value={formData.isbn}
            onChange={(e) => handleInputChange('isbn', e.target.value)}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Дата на публикуване"
            type="date"
            value={formData.publicationDate}
            onChange={(e) => handleInputChange('publicationDate', e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Брой страници"
            type="number"
            value={formData.pages}
            onChange={(e) => handleInputChange('pages', parseInt(e.target.value) || 0)}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Език"
            value={formData.language}
            onChange={(e) => handleInputChange('language', e.target.value)}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Жанр</InputLabel>
            <Select
              value={formData.genre.id || ''}
              onChange={(e) => handleGenreChange(e.target.value as number)}
              label="Жанр"
            >
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Издателство</InputLabel>
            <Select
              value={formData.publisher.id || ''}
              onChange={(e) => handlePublisherChange(e.target.value as number)}
              label="Издателство"
            >
              {publishers.map((publisher) => (
                <MenuItem key={publisher.id} value={publisher.id}>
                  {publisher.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel>Автори</InputLabel>
            <Select
              multiple
              value={selectedAuthors}
              onChange={handleAuthorChange}
              input={<OutlinedInput label="Автори" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => {
                    const author = authors.find(a => a.id === value);
                    return (
                      <Chip 
                        key={value} 
                        label={author ? `${author.firstName} ${author.lastName}` : ''} 
                      />
                    );
                  })}
                </Box>
              )}
            >
              {authors.map((author) => (
                <MenuItem key={author.id} value={author.id}>
                  {author.firstName} {author.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
              {book ? 'Обнови' : 'Създай'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookForm; 