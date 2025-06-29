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
  Business,
  Email,
  Phone,
  Language
} from '@mui/icons-material';

import { Publisher } from '../types';
import { publishersApi } from '../services/api';
import PublisherForm from '../components/PublisherForm';

const PublishersPage: React.FC = () => {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPublisher, setEditingPublisher] = useState<Publisher | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  useEffect(() => {
    loadPublishers();
  }, []);

  const loadPublishers = async () => {
    try {
      setLoading(true);
      const response = await publishersApi.getAll();
      setPublishers(response.data);
    } catch (error) {
      showSnackbar('Error loading publishers', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      await loadPublishers();
      return;
    }

    try {
      setLoading(true);
      const response = await publishersApi.search(searchTerm);
      setPublishers(response.data);
    } catch (error) {
      showSnackbar('Error during search', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingPublisher(null);
    setOpenDialog(true);
  };

  const handleEdit = (publisher: Publisher) => {
    setEditingPublisher(publisher);
    setOpenDialog(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this publisher?')) {
      try {
        await publishersApi.delete(id);
        setPublishers(publishers.filter(publisher => publisher.id !== id));
        showSnackbar('Publisher deleted successfully', 'success');
      } catch (error) {
        showSnackbar('Error deleting publisher', 'error');
      }
    }
  };

  const handleSave = async (publisher: Publisher) => {
    try {
      if (editingPublisher) {
        const response = await publishersApi.update(editingPublisher.id!, publisher);
        setPublishers(publishers.map(p => p.id === editingPublisher.id ? response.data : p));
        showSnackbar('Publisher updated successfully', 'success');
      } else {
        const response = await publishersApi.create(publisher);
        setPublishers([...publishers, response.data]);
        showSnackbar('Publisher created successfully', 'success');
      }
      setOpenDialog(false);
    } catch (error) {
      showSnackbar('Error saving publisher', 'error');
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        <Business sx={{ mr: 1, verticalAlign: 'middle' }} />
        Publishers
      </Typography>

      {/* Search Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label="Search by name, address or email"
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
                Search
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Actions */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          {publishers.length} publisher{publishers.length !== 1 ? 's' : ''} found
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleCreate}
        >
          Add Publisher
        </Button>
      </Box>

      {/* Publishers Grid */}
      <Grid container spacing={3}>
        {publishers.map((publisher) => (
          <Grid item xs={12} sm={6} md={4} key={publisher.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {publisher.name}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Address:</strong> {publisher.address}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Phone:</strong> {publisher.phone}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Email:</strong> {publisher.email}
                </Typography>
                
                {publisher.website && (
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Website:</strong> {publisher.website}
                  </Typography>
                )}

                {publisher.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {publisher.description.length > 150 
                      ? `${publisher.description.substring(0, 150)}...` 
                      : publisher.description}
                  </Typography>
                )}
              </CardContent>
              
              <CardActions>
                <IconButton
                  size="small"
                  onClick={() => handleEdit(publisher)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(publisher.id!)}
                  color="error"
                >
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingPublisher ? 'Edit Publisher' : 'Add New Publisher'}
        </DialogTitle>
        <DialogContent>
          <PublisherForm
            publisher={editingPublisher}
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

export default PublishersPage; 