import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Layout from './components/Layout';
import Home from './pages/Home';
import BlogDetail from './pages/BlogDetail';

function App() {
  const [mode, setMode] = useState('light');
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#7F56D9',
          },
          text: mode === 'dark'
            ? { primary: '#ffffff', secondary: '#b0b0b0' }
            : { primary: '#000000', secondary: '#555555' },
          background: {
            default: mode === 'light' ? '#f5f5f5' : '#121212',
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundColor: mode === 'light' ? '#f5f5f5' : '#121212',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                borderRadius: 8,
              },
              contained: {
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                },
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'light' ? '#fff' : '#1F1F1F',
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout toggleColorMode={toggleColorMode}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/products/*" element={<div>Сторінка продуктів</div>} />
            <Route path="/services/*" element={<div>Сторінка послуг</div>} />
            <Route path="/pricing" element={<div>Сторінка цін</div>} />
            <Route path="/about" element={<div>Про нас</div>} />
            <Route path="/docs" element={<div>Документація</div>} />
            <Route path="/learning" element={<div>Навчальний центр</div>} />
            <Route path="/community" element={<div>Спільнота</div>} />
            <Route path="/support" element={<div>Підтримка</div>} />
            <Route path="/login" element={<div>Вхід</div>} />
            <Route path="/signup" element={<div>Реєстрація</div>} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
