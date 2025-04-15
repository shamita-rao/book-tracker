import { useState } from 'react';
import { FaFilter, FaUndo } from 'react-icons/fa';

const SearchFilter = ({ books, setFilteredBooks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = books.filter(book => {
      const matchesSearch = 
        book.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || book.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
    setFilteredBooks(filtered);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setFilteredBooks(books);
  };

  return (
    <div className="card shadow-sm mb-4" style={{ 
      backgroundColor: '#f8f4f1',
      border: '1px solid #dac0bf',
      overflow: 'hidden' 
    }}>
      <div className="card-body p-3">
        <h5 className="card-title mb-3" style={{ color: '#2f0302' }}>Filter Books</h5>
        <form onSubmit={handleSearch}>
          <div className="row g-2 align-items-center"> 
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                style={{ 
                  backgroundColor: '#f8f4f1',
                  borderColor: '#dac0bf',
                  height: '38px' 
                }}
                placeholder="Search by title or author"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                style={{ 
                  backgroundColor: '#f8f4f1',
                  borderColor: '#dac0bf',
                  height: '38px' 
                }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">-</option>
                <option value="to-read">To Read</option>
                <option value="reading">Reading</option>
                <option value="completed">Completed</option>
                <option value="dnf">Did Not Finish</option>
              </select>
            </div>
            <div className="col-md-3 d-flex gap-1">
              <button 
                type="submit" 
                className="btn flex-grow-1"
                style={{ 
                  backgroundColor: '#2f0302',
                  color: 'white',
                  border: 'none',
                  height: '38px' 
                }}
              >
                <FaFilter className="me-1" /> Filter
              </button>
              <button 
                type="button" 
                className="btn d-flex align-items-center justify-content-center"
                style={{ 
                  backgroundColor: '#f8f4f1',
                  color: '#2f0302',
                  border: '1px solid #dac0bf',
                  width: '38px',
                  height: '38px',
                  padding: 0
                }}
                onClick={resetFilters}
              >
                <FaUndo />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchFilter;