import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import BookRow from './BookRow';
import AddBookRow from './AddBookRow';

const BookList = ({ books, setBooks }) => {
  const [editingId, setEditingId] = useState(null);
  const [newBook, setNewBook] = useState({
    name: '',
    author: '',
    status: 'to-read',
    rating: 0,
    dateStarted: '',
    dateFinished: '',
    notes: ''
  });
  const [showAddRow, setShowAddRow] = useState(false);

  // Add new book
  const handleAddBook = () => {
    const updatedBooks = [...books, { ...newBook, id: Date.now() }];
    setBooks(updatedBooks);
    resetNewBookForm();
  };

  // Update existing book
  const handleUpdateBook = (id) => {
    setEditingId(null); // Exit edit mode
  };

  // Delete book
  const handleDeleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  // Handle field changes
  const handleFieldChange = (e, id = null) => {
    const { name, value } = e.target;
    if (id) {
      setBooks(books.map(book => 
        book.id === id ? { ...book, [name]: value } : book
      ));
    } else {
      setNewBook(prev => ({ 
        ...prev, 
        [name]: name === 'rating' ? parseInt(value) : value 
      }));
    }
  };

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
    setShowAddRow(false);
  };

  return (
    <div className="table-responsive bg-transparent">
      <table className="table table-hover align-middle bg-transparent">
        <thead className="bg-transparent">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>Rating</th>
            <th>Dates</th>
            <th>Notes</th>
            <th>
              <button 
                className="btn btn-sm btn-success"
                onClick={() => setShowAddRow(true)}
                disabled={showAddRow}
              >
                <FaPlus />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {showAddRow && (
            <AddBookRow
              newBook={newBook}
              onAdd={handleAddBook}
              onCancel={resetNewBookForm}
              onFieldChange={(e) => handleFieldChange(e)}
            />
          )}

          {books.map(book => (
            <BookRow
              key={book.id}
              book={book}
              editingId={editingId}
              onEdit={setEditingId}
              onSave={handleUpdateBook} 
              onDelete={handleDeleteBook}
              onFieldChange={(e, id) => handleFieldChange(e, id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;