import React from 'react';
import { 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Grid, 
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  Book, 
  Person, 
  Business, 
  Category, 
  Search,
  Add,
  Edit,
  Delete
} from '@mui/icons-material';

const HomePage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Welcome to Book Database
      </Typography>
      
      <Typography variant="h6" component="h2" gutterBottom align="center" color="text.secondary">
        Library management system for books, authors, publishers, and genres
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                  <Book sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Books
                </Typography>
                <Typography variant="body1" paragraph>
                  Manage your book collection with complete information including title, 
                  ISBN, publication date, genre, description, page count, language, 
                  authors, and publisher.
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><Search /></ListItemIcon>
                    <ListItemText primary="Search by various criteria" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Add /></ListItemIcon>
                    <ListItemText primary="Add new books" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Edit /></ListItemIcon>
                    <ListItemText primary="Edit existing books" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Delete /></ListItemIcon>
                    <ListItemText primary="Delete books" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                  <Person sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Authors
                </Typography>
                <Typography variant="body1" paragraph>
                  Maintain author information with their names, birth dates, 
                  and biographies. Book relationships are managed automatically.
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><Search /></ListItemIcon>
                    <ListItemText primary="Search by name" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Add /></ListItemIcon>
                    <ListItemText primary="Add new authors" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Edit /></ListItemIcon>
                    <ListItemText primary="Edit information" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                  <Business sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Publishers
                </Typography>
                <Typography variant="body1" paragraph>
                  Manage publisher information with their contact details, 
                  address, phone, email, and website.
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><Search /></ListItemIcon>
                    <ListItemText primary="Search by name and address" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Add /></ListItemIcon>
                    <ListItemText primary="Add new publishers" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Edit /></ListItemIcon>
                    <ListItemText primary="Edit data" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                  <Category sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Genres
                </Typography>
                <Typography variant="body1" paragraph>
                  Organize books by genres with the ability to create 
                  new categories and manage existing ones.
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><Search /></ListItemIcon>
                    <ListItemText primary="Search by genre name" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Add /></ListItemIcon>
                    <ListItemText primary="Add new genres" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Edit /></ListItemIcon>
                    <ListItemText primary="Edit genres" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Paper sx={{ mt: 4, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Search Capabilities
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>
              Book Search:
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="• By title" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• By author" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• By publisher" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• By genre" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• By publication date" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• By ISBN or language" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• General search in title, description, ISBN" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>
              Author Search:
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="• By name (first name, last name, or full name)" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default HomePage; 