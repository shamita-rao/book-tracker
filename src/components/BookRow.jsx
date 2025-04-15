import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

const BookRow = ({ 
  book, 
  editingId, 
  onEdit, 
  onSave, 
  onDelete, 
  onFieldChange 
}) => {
  const statusColors = {
    'to-read': 'bg-secondary',
    'reading': 'bg-primary',
    'completed': 'bg-success',
    'dnf': 'bg-danger'
  };

  return (
    <tr>
      <td>
        {editingId === book.id ? (
          <input
            type="text"
            className="form-control form-control-sm"
            name="name"
            value={book.name}
            onChange={(e) => onFieldChange(e, book.id)}
            required
          />
        ) : (
          book.name
        )}
      </td>
      
      <td>
        {editingId === book.id ? (
          <input
            type="text"
            className="form-control form-control-sm"
            name="author"
            value={book.author}
            onChange={(e) => onFieldChange(e, book.id)}
            required
          />
        ) : (
          book.author
        )}
      </td>
      
      <td>
        {editingId === book.id ? (
          <select
            className="form-select form-select-sm"
            name="status"
            value={book.status}
            onChange={(e) => onFieldChange(e, book.id)}
          >
            <option value="to-read">To Read</option>
            <option value="reading">Reading</option>
            <option value="completed">Completed</option>
            <option value="dnf">Did Not Finish</option>
          </select>
        ) : (
          <span className={`badge ${statusColors[book.status]}`}>
            {book.status}
          </span>
        )}
      </td>
      
      <td>
        {editingId === book.id ? (
          <select
            className="form-select form-select-sm"
            name="rating"
            value={book.rating}
            onChange={(e) => onFieldChange(e, book.id)}
          >
            {[0, 1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>
                {num === 0 ? 'Not rated' : '⭐'.repeat(num)}
              </option>
            ))}
          </select>
        ) : (
          book.rating ? '⭐'.repeat(book.rating) : '-'
        )}
      </td>
      
      <td>
        {editingId === book.id ? (
          <div className="d-flex gap-1">
            <input
              type="date"
              className="form-control form-control-sm"
              name="dateStarted"
              value={book.dateStarted}
              onChange={(e) => onFieldChange(e, book.id)}
            />
            <input
              type="date"
              className="form-control form-control-sm"
              name="dateFinished"
              value={book.dateFinished}
              onChange={(e) => onFieldChange(e, book.id)}
              disabled={book.status !== 'completed'}
            />
          </div>
        ) : (
          <div className="small">
            {book.dateStarted && <div>Start: {book.dateStarted}</div>}
            {book.dateFinished && <div>End: {book.dateFinished}</div>}
          </div>
        )}
      </td>
      
      <td>
        {editingId === book.id ? (
          <input
            type="text"
            className="form-control form-control-sm"
            name="notes"
            value={book.notes}
            onChange={(e) => onFieldChange(e, book.id)}
          />
        ) : (
          <div className="small text-truncate" style={{maxWidth: '150px'}}>
            {book.notes || '-'}
          </div>
        )}
      </td>
      
      <td>
        <div className="d-flex gap-1">
          {editingId === book.id ? (
            <>
              <button 
                className="btn btn-sm btn-success"
                onClick={() => onSave(book.id)}
                aria-label="Save changes"
              >
                <FaCheck />
              </button>
              <button 
                className="btn btn-sm btn-danger"
                onClick={() => onEdit(null)}
                aria-label="Cancel editing"
              >
                <FaTimes />
              </button>
            </>
          ) : (
            <>
              <button 
                className="btn btn-sm btn-primary"
                onClick={() => onEdit(book.id)}
                aria-label="Edit book"
              >
                <FaEdit />
              </button>
              <button 
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(book.id)}
                aria-label="Delete book"
              >
                <FaTrash />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default BookRow;