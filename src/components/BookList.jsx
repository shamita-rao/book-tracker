import { useState } from 'react';
import { 
  TableContainer, 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell,
  Select,
  MenuItem,
  TextField,
  ButtonGroup,
  IconButton,
  Tooltip,
  Box,
  Paper
} from '@mui/material';
import { Add, Check, Close, Edit, Delete } from '@mui/icons-material';

/**
 * BookList Component
 * 
 * This component renders a table of books with functionality to add, edit, and delete books.
 * It uses Material-UI components for styling and interactivity.
 * 
 * @param {Object[]} books - Array of book objects to display in the table.
 * @param {Function} setBooks - Function to update the state of the books array.
 * 
 * Each book object contains the following properties:
 * @property {string} id - Unique identifier for the book.
 * @property {string} name - Title of the book.
 * @property {string} author - Author of the book.
 * @property {string} status - Reading status of the book (e.g., "to-read", "reading", "completed", "dnf").
 * @property {number} rating - Rating of the book (0-5 stars).
 * @property {string} dateStarted - Date the book was started (in YYYY-MM-DD format).
 * @property {string} dateFinished - Date the book was finished (in YYYY-MM-DD format).
 * @property {string} notes - Additional notes about the book.
 */
const BookList = ({ books, setBooks }) => {
  // State to track which book is being edited
  const [editingId, setEditingId] = useState(null);

  // State to toggle the "Add Book" row visibility
  const [showAddRow, setShowAddRow] = useState(false);

  // State to hold the new book details
  const [newBook, setNewBook] = useState({
    name: '',
    author: '',
    status: 'to-read',
    rating: 0,
    dateStarted: '',
    dateFinished: '',
    notes: ''
  });

  // Options for the "status" dropdown
  const statusOptions = [
    { value: 'to-read', label: 'To Read' },
    { value: 'reading', label: 'Reading' },
    { value: 'completed', label: 'Completed' },
    { value: 'dnf', label: 'Did Not Finish' }
  ];

  // Options for the "rating" dropdown
  const ratingOptions = [0, 1, 2, 3, 4, 5].map(num => ({
    value: num,
    label: num === 0 ? 'Not rated' : '⭐'.repeat(num)
  }));

  /**
   * Adds a new book to the list.
   * 
   * This function creates a new book object with a unique ID and appends it to the books array.
   * After adding the book, it resets the "Add Book" form.
   */
  const handleAddBook = () => {
    setBooks([...books, { ...newBook, id: Date.now() }]); // Add new book with a unique ID
    resetNewBookForm(); // Reset the form after adding
  };

  /**
   * Deletes a book from the list by its ID.
   * 
   * @param {string} id - The ID of the book to delete.
   * 
   * This function filters out the book with the matching ID from the books array.
   */
  const handleDeleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id)); // Remove the book with the matching ID
  };

  /**
   * Handles changes in form fields for both new and existing books.
   * 
   * @param {Object} e - The event object from the input field.
   * @param {string|null} id - The ID of the book being edited (null for new books).
   * 
   * This function updates the corresponding field in the book object or the new book form.
   * If the status is changed to "completed", it automatically sets the "dateFinished" field to today's date.
   */
  const handleFieldChange = (e, id = null) => {
    const { name, value } = e.target;

    if (id) {
      // Update an existing book
      const updatedBooks = books.map(book => 
        book.id === id ? { ...book, [name]: name === 'rating' ? parseInt(value) : value } : book
      );

      // Automatically set the "dateFinished" if the status is changed to "completed"
      if (name === 'status' && value === 'completed') {
        const today = new Date().toISOString().split('T')[0];
        setBooks(updatedBooks.map(book => 
          book.id === id ? { ...book, dateFinished: book.dateFinished || today } : book
        ));
      } else {
        setBooks(updatedBooks);
      }
    } else {
      // Update the new book form
      setNewBook(prev => ({ ...prev, [name]: name === 'rating' ? parseInt(value) : value }));
    }
  };

  /**
   * Resets the "Add Book" form to its initial state.
   * 
   * This function clears all fields in the new book form and hides the "Add Book" row.
   */
  const resetNewBookForm = () => {
    setNewBook({
      name: '',
      author: '',
      status: 'to-read',
      rating: 0,
      dateStarted: '',
      dateFinished: '',
      notes: ''
    });
    setShowAddRow(false); // Hide the "Add Book" row
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2, maxWidth: '95vw', mx: 'auto' }}>
      <Table stickyHeader aria-label="book table">
        <TableHead>
          <TableRow>
            {/* Table headers */}
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Dates</TableCell>
            <TableCell>Notes</TableCell>
            <TableCell align="right">
              {/* Button to show the "Add Book" row */}
              <Tooltip title="Add book">
                <IconButton 
                  color="primary" 
                  onClick={() => setShowAddRow(true)}
                  disabled={showAddRow} // Disable if the row is already visible
                >
                  <Add />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Row for adding a new book */}
          {showAddRow && (
            <TableRow sx={{ backgroundColor: 'action.hover' }}>
              {/* Input fields for the new book */}
              {['name', 'author'].map(field => (
                <TableCell key={field}>
                  <TextField
                    size="small"
                    fullWidth
                    name={field}
                    value={newBook[field]}
                    onChange={(e) => handleFieldChange(e)}
                    required
                  />
                </TableCell>
              ))}
              <TableCell>
                {/* Dropdown for selecting the status */}
                <Select
                  size="small"
                  fullWidth
                  name="status"
                  value={newBook.status}
                  onChange={(e) => handleFieldChange(e)}
                >
                  {statusOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                {/* Dropdown for selecting the rating */}
                <Select
                  size="small"
                  fullWidth
                  name="rating"
                  value={newBook.rating}
                  onChange={(e) => handleFieldChange(e)}
                >
                  {ratingOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                {/* Input fields for dates */}
                <Box display="flex" gap={1}>
                  <TextField
                    type="date"
                    size="small"
                    name="dateStarted"
                    value={newBook.dateStarted}
                    onChange={(e) => handleFieldChange(e)}
                  />
                  <TextField
                    type="date"
                    size="small"
                    name="dateFinished"
                    value={newBook.dateFinished}
                    onChange={(e) => handleFieldChange(e)}
                    disabled={newBook.status !== 'completed'} // Disable if status is not "completed"
                  />
                </Box>
              </TableCell>
              <TableCell>
                {/* Input field for notes */}
                <TextField
                  size="small"
                  fullWidth
                  name="notes"
                  value={newBook.notes}
                  onChange={(e) => handleFieldChange(e)}
                />
              </TableCell>
              <TableCell>
                {/* Buttons to save or cancel adding a new book */}
                <ButtonGroup>
                  <Tooltip title="Save">
                    <IconButton
                      color="success"
                      onClick={handleAddBook}
                      disabled={!newBook.name || !newBook.author} // Disable if required fields are empty
                    >
                      <Check />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Cancel">
                    <IconButton color="error" onClick={resetNewBookForm}>
                      <Close />
                    </IconButton>
                  </Tooltip>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          )}

          {/* Rows for existing books */}
          {books.map(book => {
            const isEditing = editingId === book.id; // Check if the current book is being edited
            
            return (
              <TableRow key={book.id} hover>
                {/* Book title */}
                <TableCell>
                  {isEditing ? (
                    <TextField
                      size="small"
                      fullWidth
                      name="name"
                      value={book.name}
                      onChange={(e) => handleFieldChange(e, book.id)}
                    />
                  ) : book.name}
                </TableCell>
                {/* Book author */}
                <TableCell>
                  {isEditing ? (
                    <TextField
                      size="small"
                      fullWidth
                      name="author"
                      value={book.author}
                      onChange={(e) => handleFieldChange(e, book.id)}
                    />
                  ) : book.author}
                </TableCell>
                {/* Book status */}
                <TableCell>
                  {isEditing ? (
                    <Select
                      size="small"
                      fullWidth
                      name="status"
                      value={book.status}
                      onChange={(e) => handleFieldChange(e, book.id)}
                    >
                      {statusOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                      ))}
                    </Select>
                  ) : statusOptions.find(opt => opt.value === book.status)?.label || book.status}
                </TableCell>
                {/* Book rating */}
                <TableCell>
                  {isEditing ? (
                    <Select
                      size="small"
                      fullWidth
                      name="rating"
                      value={book.rating}
                      onChange={(e) => handleFieldChange(e, book.id)}
                    >
                      {ratingOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                      ))}
                    </Select>
                  ) : book.rating === 0 ? 'Not rated' : '⭐'.repeat(book.rating)}
                </TableCell>
                {/* Book dates */}
                <TableCell>
                  <Box display="flex" gap={1}>
                    {isEditing ? (
                      <TextField
                        type="date"
                        size="small"
                        name="dateStarted"
                        value={book.dateStarted}
                        onChange={(e) => handleFieldChange(e, book.id)}
                      />
                    ) : book.dateStarted}
                    {isEditing ? (
                      <TextField
                        type="date"
                        size="small"
                        name="dateFinished"
                        value={book.dateFinished}
                        onChange={(e) => handleFieldChange(e, book.id)}
                        disabled={book.status !== 'completed'} // Disable if status is not "completed"
                      />
                    ) : book.dateFinished}
                  </Box>
                </TableCell>
                {/* Book notes */}
                <TableCell>
                  {isEditing ? (
                    <TextField
                      size="small"
                      fullWidth
                      name="notes"
                      value={book.notes}
                      onChange={(e) => handleFieldChange(e, book.id)}
                    />
                  ) : book.notes}
                </TableCell>
                {/* Buttons for editing or deleting a book */}
                <TableCell>
                  {isEditing ? (
                    <ButtonGroup>
                      <IconButton color="success" onClick={() => setEditingId(null)}>
                        <Check />
                      </IconButton>
                      <IconButton color="error" onClick={() => setEditingId(null)}>
                        <Close />
                      </IconButton>
                    </ButtonGroup>
                  ) : (
                    <ButtonGroup>
                      <IconButton color="primary" onClick={() => setEditingId(book.id)}>
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteBook(book.id)}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </ButtonGroup>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookList;