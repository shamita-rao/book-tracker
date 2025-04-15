import { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import BookList from './components/BookList';
import ReadingStats from './components/ReadingStats';
import SearchFilter from './components/SearchFilter';

const App = () => {
  // State management
  const [books, setBooks] = useLocalStorage('reading-list', []);
  const [goal, setGoal] = useLocalStorage('reading-goal', 12);
  const [filteredBooks, setFilteredBooks] = useState(books);

  // Sync filtered books when main books change
  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Shamita's Books</h1>
      
      <div className="row mb-4">
        {/* Stats Card */}
        <div className="col-md-6 mb-3 mb-md-0">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <ReadingStats 
                books={books} 
                goal={goal} 
                setGoal={setGoal} 
              />
            </div>
          </div>
        </div>
        
        {/* Filter Card */}
        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <SearchFilter 
                books={books} 
                setFilteredBooks={setFilteredBooks} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Book List */}
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <BookList 
            books={filteredBooks} 
            setBooks={setBooks} 
          />
        </div>
      </div>
    </div>
  );
};

export default App;