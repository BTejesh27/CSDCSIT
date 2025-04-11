import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { academicCalendar } from './api/academic';

const AcademicCalendar: React.FC = () => {
  return (
    <Box sx={{ p: 4, fontFamily: 'sans-serif', maxWidth: '1200px', mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            textTransform: 'uppercase',
            background: 'linear-gradient(to right, #f59e0b, #d97706)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {academicCalendar.collegeName}
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mt: 2 }}>
          {academicCalendar.title}
        </Typography>
      </Box>

      {/* Fourth Year */}
      <YearSection
        title="🎓 IV Year B.Tech All Branches (R20)"
        events={academicCalendar.fourthYear}
      />

      {/* Third Year */}
      <YearSection
        title="🎓 III Year B.Tech All Branches (R20)"
        events={academicCalendar.thirdYear}
      />

      {/* Second Year */}
      <YearSection
        title="🎓 II Year B.Tech All Branches (R23)"
        events={academicCalendar.secondYear}
      />

      {/* First Year */}
      <Box sx={{ mb: 12 }}>
        <Typography variant="h6" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
          🎓 I Year B.Tech All Branches (R23)
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          {academicCalendar.firstYear.induction}
        </Typography>
        <YearSection title="" events={academicCalendar.firstYear.events} />
      </Box>

      {/* Holidays */}
      <HolidaysTable holidays={academicCalendar.holidays} />

      {/* Marks Submission */}
      <MarksSubmissionTable submissions={academicCalendar.marksSubmission} />

      {/* Footer */}
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography fontWeight="bold" color="text.primary">
          PRINCIPAL
        </Typography>
        <Typography fontWeight="bold" color="text.primary">
          S.R.K.R. Engineering College(A)
        </Typography>
        <Typography color="text.secondary">China Amiran, Shimavaran-SM 2M,</Typography>
        <Typography color="text.secondary">W.G.Dist., Andira Pradesh</Typography>
      </Box>
    </Box>
  );
};

// Component for each year section
const YearSection: React.FC<{ title: string; events: typeof academicCalendar.fourthYear }> = ({ title, events }) => {
  return (
    <Box sx={{ mb: 12 }}>
      {title && (
        <Typography variant="h6" fontWeight="bold" color="primary" sx={{ mb: 4 }}>
          {title}
        </Typography>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                I Semester
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                II Semester
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event, index) => (
              <TableRow key={index}>
                <TableCell>{event.description}</TableCell>
                <TableCell align="center">{event.semester1}</TableCell>
                <TableCell align="center">{event.semester2}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

// Component for holidays table
const HolidaysTable: React.FC<{ holidays: typeof academicCalendar.holidays }> = ({ holidays }) => {
  return (
    <Box sx={{ mb: 12 }}>
      <Typography variant="h6" fontWeight="bold" color="success.main" sx={{ mb: 4 }}>
        📅 LIST OF HOLIDAYS
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Month</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>List of Holidays</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Working Days
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {holidays.map((holiday, index) => (
              <TableRow key={index}>
                <TableCell>{holiday.month}</TableCell>
                <TableCell>{holiday.holidays}</TableCell>
                <TableCell align="center">{holiday.workingDays}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

// Component for marks submission table
const MarksSubmissionTable: React.FC<{ submissions: typeof academicCalendar.marksSubmission }> = ({ submissions }) => {
  return (
    <Box sx={{ mb: 8 }}>
      <Typography variant="h6" fontWeight="bold" color="error.main" sx={{ mb: 4 }}>
        📝 Submission of Mid/Internal Marks
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Year</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Semester
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                I Mid Marks
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                II Mid Marks
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Internal Marks
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.map((submission, index) => (
              <TableRow key={index}>
                <TableCell>{submission.year}</TableCell>
                <TableCell align="center">{submission.semester}</TableCell>
                <TableCell align="center">{submission.mid1}</TableCell>
                <TableCell align="center">{submission.mid2}</TableCell>
                <TableCell align="center">{submission.internal}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AcademicCalendar;