import { 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  LinearProgress, 
  Box,
  Stack
} from '@mui/material';

/**
 * ReadingStats Component
 * 
 * This component displays a user's reading progress toward a yearly reading goal.
 * It includes a progress bar, a goal input field, and statistics about books read.
 * 
 * @param {Object[]} books - Array of book objects representing the user's reading list.
 * @param {number} goal - The user's yearly reading goal (number of books).
 * @param {Function} setGoal - Function to update the user's reading goal.
 * 
 * Each book object contains the following properties:
 * @property {string} status - The reading status of the book (e.g., "to-read", "reading", "completed").
 */
const ReadingStats = ({ books, goal, setGoal }) => {
  /**
   * Calculate the number of books that have been completed.
   * 
   * This filters the `books` array to count only those with a `status` of "completed".
   * It ensures that only books marked as completed contribute to the progress.
   */
  const booksRead = books.filter(book => book.status === 'completed').length;

  /**
   * Calculate the percentage of the goal that has been achieved.
   * 
   * This divides the number of books read by the goal and multiplies by 100 to get a percentage.
   * The `Math.min` function ensures the percentage does not exceed 100%.
   */
  const percentage = Math.min(100, (booksRead / goal) * 100);

  /**
   * Calculate the number of books left to reach the goal.
   * 
   * This subtracts the number of books read from the goal. If the goal is exceeded,
   * the result will be negative, but it is not displayed in the UI.
   */
  const booksLeft = goal - booksRead;

  return (
    <Card elevation={3} sx={{ height: '100%' }}>
      <CardContent sx={{ textAlign: 'center' }}> 
        {/* Title for the reading goal section */}
        <Typography variant="h6" gutterBottom>
          Reading Goal
        </Typography>
        
        {/* Input field to set the reading goal */}
        <Stack 
          direction="row" 
          alignItems="center" 
          justifyContent="center" 
          spacing={2} 
          mb={3}
        >
          <TextField
            type="number"
            variant="outlined"
            size="small"
            sx={{ width: 100 }}
            value={goal}
            onChange={(e) => setGoal(Math.max(1, Number(e.target.value)))} 
            // Ensure the goal is at least 1 to prevent invalid input
          />
          <Typography variant="body1" color="text.secondary">
            books this year
          </Typography>
        </Stack>

        {/* Progress bar to visualize the percentage of the goal achieved */}
        <Box 
          position="relative" 
          mb={2}
          sx={{ mx: 'auto', maxWidth: '80%' }} 
        >
          <LinearProgress 
            variant="determinate" 
            value={percentage} 
            sx={{ 
              height: 24,
              borderRadius: 1,
              backgroundColor: 'action.selected', // Background color for the progress bar
              '& .MuiLinearProgress-bar': {
                backgroundColor: 'success.main', // Color of the progress bar
                transition: 'transform 0.4s ease-out' // Smooth transition for progress updates
              }
            }}
          />
          {/* Display the percentage value in the center of the progress bar */}
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'common.white',
              fontWeight: 'bold'
            }}
          >
            {percentage.toFixed(0)}%
          </Typography>
        </Box>

        {/* Display the number of books read and the goal */}
        <Typography variant="body1">
          <Box component="span" fontWeight="bold">{booksRead}</Box> of{' '}
          <Box component="span" fontWeight="bold">{goal}</Box> completed
          {/* Show the number of books left if the goal is not yet reached */}
          {booksLeft > 0 && (
            <Box component="span" color="text.secondary" ml={1}>
              ({booksLeft} left)
            </Box>
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReadingStats;