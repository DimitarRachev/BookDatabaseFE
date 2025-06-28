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
        Добре дошли в База данни с книги
      </Typography>
      
      <Typography variant="h6" component="h2" gutterBottom align="center" color="text.secondary">
        Система за управление на библиотека с книги, автори, издателства и жанрове
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                  <Book sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Книги
                </Typography>
                <Typography variant="body1" paragraph>
                  Управлявайте вашата колекция от книги с пълна информация за заглавие, 
                  ISBN, дата на публикуване, жанр, описание, брой страници, език, 
                  автори и издателство.
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><Search /></ListItemIcon>
                    <ListItemText primary="Търсене по различни критерии" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Add /></ListItemIcon>
                    <ListItemText primary="Добавяне на нови книги" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Edit /></ListItemIcon>
                    <ListItemText primary="Редактиране на съществуващи" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Delete /></ListItemIcon>
                    <ListItemText primary="Изтриване на книги" />
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
                  Автори
                </Typography>
                <Typography variant="body1" paragraph>
                  Поддържайте информация за авторите с техните имена, дата на раждане 
                  и биография. Връзките с книгите се управляват автоматично.
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><Search /></ListItemIcon>
                    <ListItemText primary="Търсене по име" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Add /></ListItemIcon>
                    <ListItemText primary="Добавяне на нови автори" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Edit /></ListItemIcon>
                    <ListItemText primary="Редактиране на информация" />
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
                  Издателства
                </Typography>
                <Typography variant="body1" paragraph>
                  Управлявайте информация за издателствата с техните контактни данни, 
                  адрес, телефон, имейл и уебсайт.
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><Search /></ListItemIcon>
                    <ListItemText primary="Търсене по име и адрес" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Add /></ListItemIcon>
                    <ListItemText primary="Добавяне на нови издателства" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Edit /></ListItemIcon>
                    <ListItemText primary="Редактиране на данни" />
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
                  Жанрове
                </Typography>
                <Typography variant="body1" paragraph>
                  Организирайте книгите по жанрове с възможност за създаване на 
                  нови категории и управление на съществуващите.
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><Search /></ListItemIcon>
                    <ListItemText primary="Търсене по име на жанр" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Add /></ListItemIcon>
                    <ListItemText primary="Добавяне на нови жанрове" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Edit /></ListItemIcon>
                    <ListItemText primary="Редактиране на жанрове" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Paper sx={{ mt: 4, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Възможности за търсене
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>
              Търсене на книги:
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="• По заглавие" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• По автор" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• По издателство" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• По жанр" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• По дата на публикуване" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• По ISBN или език" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• Общо търсене в заглавие, описание, ISBN" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>
              Търсене на автори:
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="• По име (първо име, фамилия или пълно име)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• По дата на раждане (диапазон)" />
              </ListItem>
            </List>
            
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              Търсене на издателства:
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="• По име, адрес, имейл" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default HomePage; 