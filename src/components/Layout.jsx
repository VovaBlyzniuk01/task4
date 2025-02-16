import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container,
  Menu,
  MenuItem,
  IconButton
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Layout = ({ children, toggleColorMode }) => {
  const [productsAnchor, setProductsAnchor] = useState(null);
  const [servicesAnchor, setServicesAnchor] = useState(null);
  const [resourcesAnchor, setResourcesAnchor] = useState(null);
  const location = useLocation();
  const theme = useTheme();

  const menuItems = {
    products: [
      { title: 'Всі блоги', path: '/' },
      { title: 'Дизайн', path: '/?category=design' },
      { title: 'Розробка', path: '/?category=development' },
      { title: 'UI/UX', path: '/?category=ui' },
      { title: 'Інженерія', path: '/?category=engineering' }
    ],
    services: [
      { title: 'Дизайн блоги', path: '/?category=design' },
      { title: 'Розробка блоги', path: '/?category=development' },
      { title: 'UI/UX блоги', path: '/?category=ui' },
      { title: 'Інженерія блоги', path: '/?category=engineering' },
    ],
    resources: [
      { title: 'Всі блоги', path: '/' },
      { title: 'Дизайн', path: '/?category=design' },
      { title: 'Розробка', path: '/?category=development' },
      { title: 'UI/UX', path: '/?category=ui' },
      { title: 'Інженерія', path: '/?category=engineering' },
    ],
  };

  // Функция для определения активного состояния кнопки
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar 
        position="static" 
        color="transparent" 
        elevation={0}
        sx={{ 
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ px: 0 }}>
            {/* Логотип */}
            <Typography 
              variant="h6" 
              component={RouterLink} 
              to="/" 
              sx={{ 
                flexGrow: 0, 
                textDecoration: 'none',
                color: 'inherit',
                mr: 4,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Box 
                component="img"
                src="/avatar/react-logo.jpg"
                alt="React Logo"
                sx={{ height: 32 }}
              />
            </Typography>

            {/* Навигация */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {/* Продукти */}
              <Button
                color="inherit"
                endIcon={<KeyboardArrowDownIcon />}
                onClick={(e) => setProductsAnchor(e.currentTarget)}
                sx={{
                  color: isActive('/') ? 'primary.main' : 'inherit'
                }}
              >
                Технології
              </Button>
              <Menu
                anchorEl={productsAnchor}
                open={Boolean(productsAnchor)}
                onClose={() => setProductsAnchor(null)}
                PaperProps={{
                  elevation: 2,
                  sx: { mt: 1, minWidth: 180 }
                }}
              >
                {menuItems.products.map((item) => (
                  <MenuItem 
                    key={item.path}
                    component={RouterLink}
                    to={item.path}
                    onClick={() => setProductsAnchor(null)}
                  >
                    {item.title}
                  </MenuItem>
                ))}
              </Menu>

              {/* Послуги */}
              <Button
                color="inherit"
                endIcon={<KeyboardArrowDownIcon />}
                onClick={(e) => setServicesAnchor(e.currentTarget)}
              >
                Розробка
              </Button>
              <Menu
                anchorEl={servicesAnchor}
                open={Boolean(servicesAnchor)}
                onClose={() => setServicesAnchor(null)}
                PaperProps={{
                  elevation: 2,
                  sx: { mt: 1, minWidth: 180 }
                }}
              >
                {menuItems.services.map((item) => (
                  <MenuItem 
                    key={item.path}
                    component={RouterLink}
                    to={item.path}
                    onClick={() => setServicesAnchor(null)}
                  >
                    {item.title}
                  </MenuItem>
                ))}
              </Menu>

              {/* Ціни заменяем на Дизайн */}
              <Button
                color="inherit"
                component={RouterLink}
                to="/?category=design"
              >
                Дизайн
              </Button>

              {/* Ресурси */}
              <Button
                color="inherit"
                endIcon={<KeyboardArrowDownIcon />}
                onClick={(e) => setResourcesAnchor(e.currentTarget)}
              >
                Ресурси
              </Button>
              <Menu
                anchorEl={resourcesAnchor}
                open={Boolean(resourcesAnchor)}
                onClose={() => setResourcesAnchor(null)}
                PaperProps={{
                  elevation: 2,
                  sx: { mt: 1, minWidth: 180 }
                }}
              >
                {menuItems.resources.map((item) => (
                  <MenuItem 
                    key={item.path}
                    component={RouterLink}
                    to={item.path}
                    onClick={() => setResourcesAnchor(null)}
                  >
                    {item.title}
                  </MenuItem>
                ))}
              </Menu>

              {/* Про нас заменяем на Всі блоги */}
              <Button
                color="inherit"
                component={RouterLink}
                to="/"
              >
                Всі блоги
              </Button>
            </Box>

            {/* Правая часть */}
            <Box sx={{ ml: 'auto', display: 'flex', gap: 1, alignItems: 'center' }}>
              <Button
                color="inherit"
                component={RouterLink}
                to="/login"
              >
                Log In
              </Button>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/signup"
              >
                Sign Up
              </Button>
              <IconButton sx={{ ml: 2 }} onClick={toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 