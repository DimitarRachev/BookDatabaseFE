import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, Tab, Box } from '@mui/material';
import { Book, Person, Business, Category, Home } from '@mui/icons-material';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getCurrentTab = () => {
    const path = location.pathname;
    if (path === '/') return 0;
    if (path === '/books') return 1;
    if (path === '/authors') return 2;
    if (path === '/publishers') return 3;
    if (path === '/genres') return 4;
    return 0;
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/books');
        break;
      case 2:
        navigate('/authors');
        break;
      case 3:
        navigate('/publishers');
        break;
      case 4:
        navigate('/genres');
        break;
    }
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs 
        value={getCurrentTab()} 
        onChange={handleTabChange}
        aria-label="navigation tabs"
        centered
      >
        <Tab 
          icon={<Home />} 
          label="Начало" 
          iconPosition="start"
        />
        <Tab 
          icon={<Book />} 
          label="Книги" 
          iconPosition="start"
        />
        <Tab 
          icon={<Person />} 
          label="Автори" 
          iconPosition="start"
        />
        <Tab 
          icon={<Business />} 
          label="Издателства" 
          iconPosition="start"
        />
        <Tab 
          icon={<Category />} 
          label="Жанрове" 
          iconPosition="start"
        />
      </Tabs>
    </Box>
  );
};

export default Navigation; 