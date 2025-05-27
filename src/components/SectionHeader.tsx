import React from 'react';
import { Typography, Box } from '@mui/material';

interface SectionHeaderProps {
  title: string;
  description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => (
  <Box mb={4}>
    <Typography variant="h4" component="h1" gutterBottom>
      {title}
    </Typography>
    <Typography variant="subtitle1" color="text.secondary">
      {description}
    </Typography>
  </Box>
);

export default SectionHeader;