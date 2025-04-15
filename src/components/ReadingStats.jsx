const ReadingStats = ({ books, goal, setGoal }) => {
    const booksRead = books.filter(book => book.status === 'completed').length;
    const percentage = Math.min(100, (booksRead / goal) * 100);
  
    return (
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title">Reading Goal!</h5>
          <div className="d-flex align-items-center mb-3">
            <input
              type="number"
              className="form-control w-25 me-3"
              min="1"
              value={goal}
              onChange={(e) => setGoal(Math.max(1, Number(e.target.value)))}
            />
            <span className="text-muted">books this year</span>
          </div>
          <div className="progress mb-2" style={{ height: '24px' }}>
            <div
              className="progress-bar progress-bar-striped"
              role="progressbar"
              style={{ width: `${percentage}%` }}
            >
              {percentage.toFixed(0)}%
            </div>
          </div>
          <p className="mb-0 text-center">
            <strong>{booksRead}</strong> of <strong>{goal}</strong> completed
            {booksRead < goal && (
              <span className="text-muted"> ({goal - booksRead} left)</span>
            )}
          </p>
        </div>
      </div>
    );
  };
  
  export default ReadingStats;