import React, { useState, useEffect } from 'react';

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [director, setDirector] = useState('');
  const [search, setSearch] = useState('');

  // Загрузка из localStorage
  useEffect(() => {
    const saved = localStorage.getItem('movies');
    if (saved) {
      setMovies(JSON.parse(saved));
    } else {
      const initialMovies = [
        { id: 1, title: "Крестный отец", year: 1972, director: "Коппола", isFavorite: true },
        { id: 2, title: "Побег из Шоушенка", year: 1994, director: "Дарабонт", isFavorite: false },
        { id: 3, title: "Темный рыцарь", year: 2008, director: "Нолан", isFavorite: true },
        { id: 4, title: "Форрест Гамп", year: 1994, director: "Земекис", isFavorite: false }
      ];
      setMovies(initialMovies);
    }
  }, []);

  // Сохранение в localStorage
  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  const addMovie = () => {
    if (title && year && director) {
      const newMovie = {
        id: Date.now(),
        title: title,
        year: parseInt(year),
        director: director,
        isFavorite: false
      };
      setMovies([...movies, newMovie]);
      setTitle('');
      setYear('');
      setDirector('');
    } else {
      alert('Заполните все поля!');
    }
  };

  const toggleFavorite = (id) => {
    setMovies(movies.map(movie => 
      movie.id === id ? { ...movie, isFavorite: !movie.isFavorite } : movie
    ));
  };

  const deleteMovie = (id) => {
    if (window.confirm('Удалить этот фильм?')) {
      setMovies(movies.filter(movie => movie.id !== id));
    }
  };

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(search.toLowerCase()) ||
    movie.director.toLowerCase().includes(search.toLowerCase())
  );

  const favoriteCount = movies.filter(movie => movie.isFavorite).length;

  return (
    <div style={styles.app}>
      <h1 style={styles.header}>🎬 Мой список фильмов</h1>
      
      <div style={styles.stats}>
        Всего фильмов: {movies.length} | Любимых: {favoriteCount}
      </div>

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Поиск по названию или режиссеру..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <div style={styles.form}>
        <h3>Добавить новый фильм:</h3>
        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Название фильма"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Год"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Режиссер"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            style={styles.input}
          />
          <button onClick={addMovie} style={styles.addButton}>
            Добавить
          </button>
        </div>
      </div>

      <div style={styles.movieList}>
        {filteredMovies.length === 0 ? (
          <div style={styles.noMovies}>Фильмы не найдены</div>
        ) : (
          filteredMovies.map(movie => (
            <div 
              key={movie.id} 
              style={{
                ...styles.movieCard,
                backgroundColor: movie.isFavorite ? '#fff9c4' : 'white'
              }}
            >
              <div style={styles.movieHeader}>
                <div>
                  <h3 style={styles.movieTitle}>{movie.title}</h3>
                  <div style={styles.movieInfo}>
                    <span>Год: {movie.year}</span>
                    <span>Режиссер: {movie.director}</span>
                  </div>
                </div>
                <div style={styles.movieActions}>
                  <button 
                    onClick={() => toggleFavorite(movie.id)}
                    style={{
                      ...styles.favoriteButton,
                      backgroundColor: movie.isFavorite ? '#ff6b6b' : '#f0f0f0'
                    }}
                  >
                    {movie.isFavorite ? '❤️' : '🤍'}
                  </button>
                  <button 
                    onClick={() => deleteMovie(movie.id)}
                    style={styles.deleteButton}
                  >
                    🗑️
                  </button>
                </div>
              </div>
              
              {movie.isFavorite && (
                <div style={styles.favoriteBadge}>★ Любимый фильм</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh'
  },
  header: {
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px'
  },
  stats: {
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '15px',
    textAlign: 'center',
    fontWeight: 'bold',
    border: '1px solid #ddd'
  },
  searchContainer: {
    marginBottom: '20px'
  },
  searchInput: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box'
  },
  form: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '20px',
    border: '1px solid #ddd'
  },
  inputGroup: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  input: {
    flex: '1',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '3px',
    minWidth: '150px'
  },
  addButton: {
    padding: '8px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer'
  },
  movieList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  movieCard: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  movieHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '10px'
  },
  movieTitle: {
    margin: '0 0 5px 0',
    color: '#333'
  },
  movieInfo: {
    display: 'flex',
    gap: '15px',
    fontSize: '14px',
    color: '#666'
  },
  movieActions: {
    display: 'flex',
    gap: '5px'
  },
  favoriteButton: {
    padding: '5px 10px',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#ff4444',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  favoriteBadge: {
    color: '#ff6b6b',
    fontWeight: 'bold',
    fontSize: '14px',
    marginTop: '5px'
  },
  noMovies: {
    textAlign: 'center',
    padding: '40px',
    color: '#666',
    fontSize: '18px'
  }
};

export default App;