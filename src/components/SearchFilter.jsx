import { useState } from 'react';
import { 
  Box,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Select,
  Button,
  Typography,
  Grid,
  IconButton
} from '@mui/material';
import { FilterAlt as FilterIcon, Replay as ResetIcon } from '@mui/icons-material';

/**
 * SearchFilter Component
 * 
 * This component provides functionality to filter a list of books based on a search term
 * (matching the book title or author) and a status filter (e.g., "to-read", "reading").
 * It allows users to dynamically filter the displayed books and reset the filters.
 * 
 * @param {Object[]} books - Array of book objects representing the user's reading list.
 * @param {Function} setFilteredBooks - Function to update the filtered list of books in the parent component.
 * 
 * Each book object contains the following properties:
 * @property {string} name - The title of the book.
 * @property {string} author - The author of the book.
 * @property {string} status - The reading status of the book (e.g., "to-read", "reading", "completed", "dnf").
 */
const SearchFilter = ({ books, setFilteredBooks }) => {
  /**
   * State to track the search term entered by the user.
   * 
   * This state is updated whenever the user types in the search input field.
   * It is used to filter books whose title or author matches the search term.
   */
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * State to track the selected status filter.
   * 
   * This state is updated whenever the user selects a status from the dropdown menu.
   * It is used to filter books based on their reading status.
   */
  const [statusFilter, setStatusFilter] = useState('all');

  /**
   * Handles the filtering of books based on the search term and status filter.
   * 
   * This function is triggered when the user submits the filter form. It filters the `books` array
   * by checking if the book's title or author matches the search term (case-insensitive) and if
   * the book's status matches the selected status filter. The filtered list is then passed to
   * the parent component via the `setFilteredBooks` function.
   * 
   * @param {Object} e - The event object from the form submission.
   */
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Filter books based on the search term and status filter
    const filtered = books.filter(book => {
      const matchesSearch = 
        book.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Check if the title matches the search term
        book.author.toLowerCase().includes(searchTerm.toLowerCase()); // Check if the author matches the search term
      const matchesStatus = statusFilter === 'all' || book.status === statusFilter; // Check if the status matches the filter
      return matchesSearch && matchesStatus; // Include the book if both conditions are met
    });

    // Update the filtered books in the parent component
    setFilteredBooks(filtered);
  };

  /**
   * Resets the search term and status filter to their default values.
   * 
   * This function clears the search term, resets the status filter to "all", and restores
   * the full list of books in the parent component by passing the original `books` array
   * to the `setFilteredBooks` function.
   */
  const resetFilters = () => {
    setSearchTerm(''); // Clear the search term
    setStatusFilter('all'); // Reset the status filter to "all"
    setFilteredBooks(books); // Reset the filtered books to the full list
  };

  return (
    <Card elevation={3} sx={{ mb: 3 }}>
      <CardContent sx={{ textAlign: 'center' }}>
        {/* Title for the filter section */}
        <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
          Filter Books
        </Typography>
        
        {/* Form to handle filtering */}
        <Box component="form" onSubmit={handleSearch}>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            {/* Input field for the search term */}
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Search by title or author"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update the search term state
              />
            </Grid>
            
            {/* Dropdown to select the status filter */}
            <Grid item xs={12} md={3}>
              <Select
                fullWidth
                size="small"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)} // Update the status filter state
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="to-read">To Read</MenuItem>
                <MenuItem value="reading">Reading</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="dnf">Did Not Finish</MenuItem>
              </Select>
            </Grid>
            
            {/* Buttons for filtering and resetting */}
            <Grid item xs={12} md={4}>
              <Box display="flex" gap={1} justifyContent="center">
                {/* Button to apply the filter */}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<FilterIcon />}
                  sx={{ flex: 1, maxWidth: 200 }}
                >
                  Filter
                </Button>
                
                {/* Button to reset the filters */}
                <IconButton
                  onClick={resetFilters}
                  color="secondary"
                  sx={{ border: '1px solid', borderColor: 'divider' }}
                >
                  <ResetIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SearchFilter;