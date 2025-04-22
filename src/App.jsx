import { useState, useEffect } from 'react';
import { 
  Container,
  Box,
  Typography,
  Paper,
  CssBaseline,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel
} from '@mui/material';
import { ThemeProvider, createTheme, useColorScheme } from '@mui/material/styles';
import BookList from './components/BookList';
import ReadingStats from './components/ReadingStats';
import SearchFilter from './components/SearchFilter';
import FlowerImage from './assets/Flower.png';

/**
 * Custom Material-UI theme configuration.
 * 
 * This theme defines typography, color schemes (light and dark modes), and component-specific
 * style overrides for Material-UI components like `Button` and `Paper`.
 * https://mui.com/material-ui/customization/theming/
 * https://mui.com/material-ui/customization/dark-mode/#toggling-color-mode
 */
const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: '2.5rem',
      letterSpacing: '-0.5px'
    },
  },
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
        primary: {
          main: '#3f51b5',
        },
        secondary: {
          main: '#f50057', 
        },
        background: {
          default: '#fafafa',
          paper: '#ffffff',
        },
        error: {
          main: '#f44336'
        }
      },
    },
    dark: {
      palette: {
        mode: 'dark',
        primary: {
          main: '#7986cb', 
        },
        secondary: {
          main: '#4db6ac',
        },
        background: {
          default: '#121212',
          paper: '#1e1e1e',
        },
        error: {
          main: '#f44336'
        }
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
          letterSpacing: '0.5px'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          transition: 'box-shadow 0.2s ease',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(0,0,0,0.12)'
          }
        }
      }
    }
  }
});

/**
 * Custom hook to manage state with localStorage.
 * 
 * This hook synchronizes a state variable with localStorage, ensuring that the data persists
 * across page reloads. It retrieves the initial value from localStorage (if available) and
 * updates localStorage whenever the state changes.
 * 
 * @param {string} key - The key used to store the value in localStorage.
 * @param {*} initialValue - The initial value for the state if no value exists in localStorage.
 * @returns {[*, Function]} - Returns the state value and a function to update it.
 */
const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue; // Retrieve value from localStorage or use initial value
    } catch (error) {
      console.error('Error reading localStorage:', error);
      return initialValue;
    }
  });

  /**
   * Updates both the state and localStorage with the new value.
   * 
   * This function ensures that the value is stored persistently in localStorage
   * and updates the state to reflect the new value.
   * 
   * @param {*} newValue - The new value to store in state and localStorage.
   */
  const setStoredValue = (newValue) => {
    try {
      const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  return [value, setStoredValue];
};

/**
 * AppContent Component
 * 
 * This component contains the main content of the application, including the header, stats, filter,
 * and book list sections. It manages the application's state and handles localStorage integration.
 */
const AppContent = () => {
  const { mode, setMode } = useColorScheme(); // Manage the color scheme (light, dark, or system)

  // State for the list of books and reading goal, synchronized with localStorage
  const [books, setBooks] = useLocalStorage('reading-list', []);
  const [goal, setGoal] = useLocalStorage('reading-goal', 12);

  // State for filtered books, derived from the main books list
  const [filteredBooks, setFilteredBooks] = useState(books);

  return (
    <>
      <CssBaseline /> {/* Reset CSS to ensure consistent styling */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header section */}
        <Box textAlign="center" mb={6}>
          {/* Decorative image */}
          <Box sx={{ mb: 2 }}>
            <img 
              src={FlowerImage} 
              alt="Decoration" 
              style={{ 
                width: 80, 
                height: 80,
                opacity: 0.8,
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }}
            />
          </Box>
          
          {/* Application title */}
          <Typography 
            variant="h1" 
            component="h1" 
            gutterBottom
            sx={{ 
              color: 'primary.main',
              mb: 2
            }}
          >
            Shamita's Books
          </Typography>
          
          {/* Theme toggle radio buttons */}
          <FormControl component="fieldset" sx={{ mb: 4 }}>
            <RadioGroup
              row
              aria-label="theme"
              name="theme-toggle"
              value={mode || 'system'} // Current theme mode
              onChange={(event) => setMode(event.target.value)} // Update theme mode
              sx={{ justifyContent: 'center', gap: 2 }}
            >
              <FormControlLabel 
                value="system" 
                control={<Radio />} 
                label="System" 
              />
              <FormControlLabel 
                value="light" 
                control={<Radio />} 
                label="Light" 
              />
              <FormControlLabel 
                value="dark" 
                control={<Radio />} 
                label="Dark" 
              />
            </RadioGroup>
          </FormControl>
        </Box>
      
        {/* Stats and filter section */}
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'center',
          gap: 4,
          mb: 6,
          flexWrap: 'wrap',
          textAlign: 'center'
        }}>
          {/* Reading stats card */}
          <Paper elevation={0} sx={{ p: 3, width: 400, maxWidth: '100%' }}>
            <ReadingStats books={books} goal={goal} setGoal={setGoal} />
          </Paper>
          {/* Search and filter card */}
          <Paper elevation={0} sx={{ p: 3, width: 400, maxWidth: '100%' }}>
            <SearchFilter books={books} setFilteredBooks={setFilteredBooks} />
          </Paper>
        </Box>

        {/* Book list section */}
        <Paper elevation={0} sx={{ p: 2 }}>
          <BookList books={filteredBooks} setBooks={setBooks} />
        </Paper>
      </Container>
    </>
  );
};

/**
 * App Component
 * 
 * This is the root component of the application. It wraps the `AppContent` component
 * with a `ThemeProvider` to provide the custom theme to the entire app.
 * 
 * @returns {JSX.Element} - The root component of the application.
 */
export default function App() {
  return (
    <ThemeProvider theme={theme}> {/* Provide the custom theme to the entire app */}
      <AppContent />
    </ThemeProvider>
  );
}