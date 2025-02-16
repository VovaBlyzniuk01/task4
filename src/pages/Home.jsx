import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  TextField,
  Box,
  InputAdornment
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const location = useLocation();

  // Обновленные категории без "Підтримка клієнтів"
  const categories = [
    { id: 'all', label: 'Всі' },
    { id: 'design', label: 'Дизайн' },
    { id: 'development', label: 'Розробка ПЗ' },
    { id: 'engineering', label: 'Інженерія' },
    { id: 'ui', label: 'UI/UX' }
  ];

  // Обновленный список постов без постов категории "customer"
  useEffect(() => {
    const dummyPosts = [
      // Design posts
      {
        id: 1,
        title: 'Огляд UX презентацій',
        category: 'design',
        date: '24 січня 2024',
        image: '/images/ux.jpg',
        author: 'Олена Петренко',
        description: 'Як створювати переконливі презентації, які вражають колег та надихають керівників?'
      },
      {
        id: 2,
        title: 'Що таке wireframing?',
        category: 'design',
        date: '15 січня 2024',
        image: '/images/wireframing.jpg',
        author: 'Світлана Вовк',
        description: 'Вступ до wireframing та його принципів. Вчимося у найкращих в індустрії.'
      },

      // UI/UX posts
      {
        id: 3,
        title: 'Основи UI дизайну',
        category: 'ui',
        date: '22 січня 2024',
        image: '/images/ui.jpg',
        author: 'Максим Ковальчук',
        description: 'Фундаментальні принципи UI дизайну та їх застосування на практиці.'
      },

      // Development posts
      {
        id: 4,
        title: 'Створення API Stack',
        category: 'development',
        date: '19 січня 2024',
        image: '/images/apistack.jpg',
        author: 'Марія Шевченко',
        description: 'Розвиток RESTful API супроводжується появою нових інструментів для їх створення, тестування та керування.'
      },
      {
        id: 5,
        title: 'Топ JavaScript фреймворків',
        category: 'development',
        date: '13 січня 2024',
        image: '/images/10frameworkjs.jpg',
        author: 'Денис Чен',
        description: 'JavaScript фреймворки, які роблять розробку легкою з широкими можливостями та функціональністю.'
      },

      // Engineering posts
      {
        id: 6,
        title: 'Мікросервісна архітектура',
        category: 'engineering',
        date: '18 січня 2024',
        image: '/images/microarxitec.jpg',
        author: 'Ігор Сидоренко',
        description: 'Практичний підхід до побудови масштабованих мікросервісних систем.'
      },
      {
        id: 7,
        title: 'DevOps практики',
        category: 'engineering',
        date: '11 січня 2024',
        image: '/images/devops.jpg',
        author: 'Василь Мороз',
        description: 'Найкращі практики DevOps для оптимізації процесу розробки та розгортання.'
      }
    ];
    setPosts(dummyPosts);
    setFilteredPosts(dummyPosts);
  }, []);

  useEffect(() => {
    // Получаем категорию из URL при загрузке и при изменении URL
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get('category');
    if (categoryFromUrl) {
      setCategory(categoryFromUrl);
      handleCategoryChange(categoryFromUrl);
    } else {
      setCategory('all');
      handleCategoryChange('all');
    }
  }, [location.search]); // Перезапускаем эффект при изменении URL

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearch(searchTerm);
    
    let filtered = posts;
    if (category !== 'all') {
      filtered = filtered.filter(post => post.category === category);
    }
    filtered = filtered.filter(post => 
      post.title.toLowerCase().includes(searchTerm)
    );
    setFilteredPosts(filtered);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    let filtered = posts;
    if (newCategory !== 'all') {
      filtered = posts.filter(post => post.category === newCategory);
    }
    if (search) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredPosts(filtered);
  };

  // Функция для сопоставления имени автора и пути к аватарке
  const getAuthorAvatar = (authorName) => {
    const map = {
      "Олена Петренко": "/avatar/olena-petrenko.jpg",
      "Світлана Вовк": "/avatar/svitlana-vovk.jpg",
      "Максим Ковальчук": "/avatar/maksym-kovalchuk.jpg",
      "Марія Шевченко": "/avatar/maria-shevchenko.jpg",
      "Денис Чен": "/avatar/denis-chen.jpg",
      "Ігор Сидоренко": "/avatar/ihor-sydorenko.jpg",
      "Василь Мороз": "/avatar/vasyl-moroz.jpg"
    };
    return map[authorName] || '/avatar/default.jpg';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography 
        variant="body2" 
        color="primary" 
        sx={{ mb: 1, fontWeight: 500 }}
      >
        Наш блог
      </Typography>
      
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          mb: 1,
          fontWeight: 600,
          fontSize: '2.5rem'
        }}
      >
        Ресурси та інсайти
      </Typography>

      <Typography 
        variant="body1" 
        color="text.secondary" 
        sx={{ mb: 4 }}
      >
        Останні новини галузі, інтерв'ю, технології та ресурси.
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          placeholder="Пошук"
          variant="outlined"
          value={search}
          onChange={handleSearch}
          sx={{ 
            maxWidth: '320px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Категорії */}
      <Box 
        sx={{ 
          mb: 4, 
          display: 'flex', 
          gap: 2,
          borderBottom: 1,
          borderColor: 'divider',
          overflowX: 'auto',
          pb: 1
        }}
      >
        {categories.map((cat) => (
          <Typography
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            sx={{
              cursor: 'pointer',
              pb: 2,
              whiteSpace: 'nowrap',
              color: category === cat.id ? 'primary.main' : 'text.secondary',
              borderBottom: category === cat.id ? 2 : 0,
              borderColor: 'primary.main',
              '&:hover': {
                color: 'primary.main'
              }
            }}
          >
            {cat.label}
          </Typography>
        ))}
      </Box>

      {/* Список постів */}
      <Grid container spacing={3}>
        {filteredPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card
              component={RouterLink}
              to={`/blog/${post.id}`}
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                color: 'inherit',
                boxShadow: 'none',
                '&:hover': {
                  '& .arrow-icon': {
                    transform: 'translateX(4px)'
                  }
                }
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  paddingTop: '60%',
                  mb: 2,
                  borderRadius: 2,
                  overflow: 'hidden'
                }}
              >
                <Box
                  component="img"
                  src={post.image}
                  alt={post.title}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Box>
              <CardContent sx={{ p: 0, flexGrow: 1 }}>
                <Typography 
                  variant="body2" 
                  color="primary"
                  sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  {categories.find(cat => cat.id === post.category)?.label}
                  <Box 
                    component="span" 
                    sx={{ 
                      width: '4px', 
                      height: '4px', 
                      borderRadius: '50%', 
                      backgroundColor: 'text.secondary' 
                    }} 
                  />
                  {post.date}
                </Typography>
                <Typography 
                  variant="h6"
                  sx={{ 
                    mb: 1,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  {post.title}
                  <ArrowForwardIcon 
                    className="arrow-icon"
                    sx={{ 
                      fontSize: '1rem',
                      transition: 'transform 0.2s'
                    }} 
                  />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.description}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    component="img"
                    src={getAuthorAvatar(post.author)}
                    alt={post.author}
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%'
                    }}
                  />
                  <Typography variant="body2">
                    {post.author}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home; 