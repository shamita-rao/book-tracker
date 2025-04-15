import { FaCheck, FaTimes } from 'react-icons/fa';

const AddBookRow = ({ 
  newBook, 
  onAdd, 
  onCancel, 
  onFieldChange 
}) => {
  return (
    <tr className="bg-light">
      <td>
        <input
          type="text"
          className="form-control form-control-sm"
          name="name"
          value={newBook.name}
          onChange={(e) => onFieldChange(e)}
          placeholder="Book title"
          required
        />
      </td>
      <td>
        <input
          type="text"
          className="form-control form-control-sm"
          name="author"
          value={newBook.author}
          onChange={(e) => onFieldChange(e)}
          placeholder="Author"
          required
        />
      </td>
      <td>
        <select
          className="form-select form-select-sm"
          name="status"
          value={newBook.status}
          onChange={(e) => onFieldChange(e)}
        >
          <option value="to-read">To Read</option>
          <option value="reading">Reading</option>
          <option value="completed">Completed</option>
          <option value="dnf">Did Not Finish</option>
        </select>
      </td>
      <td>
        <select
          className="form-select form-select-sm"
          name="rating"
          value={newBook.rating}
          onChange={(e) => onFieldChange(e)}
        >
          {[0, 1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>
              {num === 0 ? 'Not rated' : '⭐'.repeat(num)}
            </option>
          ))}
        </select>
      </td>
      <td>
        <div className="d-flex gap-1">
          <input
            type="date"
            className="form-control form-control-sm"
            name="dateStarted"
            value={newBook.dateStarted}
            onChange={(e) => onFieldChange(e)}
          />
          <input
            type="date"
            className="form-control form-control-sm"
            name="dateFinished"
            value={newBook.dateFinished}
            onChange={(e) => onFieldChange(e)}
            disabled={newBook.status !== 'completed'}
          />
        </div>
      </td>
      <td>
        <input
          type="text"
          className="form-control form-control-sm"
          name="notes"
          value={newBook.notes}
          onChange={(e) => onFieldChange(e)}
          placeholder="Notes"
        />
      </td>
      <td>
        <div className="d-flex gap-1">
          <button 
            className="btn btn-sm btn-success"
            onClick={onAdd}
            aria-label="Save book"
            disabled={!newBook.name || !newBook.author} // Disable if required fields empty
          >
            <FaCheck />
          </button>
          <button 
            className="btn btn-sm btn-danger"
            onClick={onCancel}
            aria-label="Cancel"
            type="button"
          >
            <FaTimes />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AddBookRow;