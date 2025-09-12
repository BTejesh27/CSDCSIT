import { Card, CardContent, Paper, Typography, Grid, Chip, Stack, Button, Box, Divider, IconButton, Fade, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Avatar, alpha } from "@mui/material";
import { Email as EmailIcon, Phone as PhoneIcon, School as SchoolIcon, Edit as EditIcon, Visibility as VisibilityIcon, Download as DownloadIcon, CloudUpload as CloudUploadIcon, Close as CloseIcon } from "@mui/icons-material";
import "./student-details.css";
import { Theme } from "@mui/material/styles";

interface Student {
  _id?: string;
  name?: string;
  mail?: string;
  phonenumber?: string;
  registration_number?: string;
  batch?: string;
  branch?: string;
  resumeName?: string;
  resumePath?: string;
}

interface Props {
  student: Student;
  onEdit: () => void;
  resumeDialogOpen: boolean;
  setResumeDialogOpen: (open: boolean) => void;
  theme: Theme;
}

export default function StudentDetails({ student, onEdit, resumeDialogOpen, setResumeDialogOpen, theme }: Props) {
  return (
    <Fade in={!!student} timeout={800}>
      <Box>
        {/* Header */}
        <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 3, background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`, color: 'white', position: 'relative', overflow: 'hidden', '&::before': { content: '""', position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: alpha('#fff', 0.1), borderRadius: '50%', transform: 'translate(30%, -30%)' } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: alpha('#fff', 0.2), fontSize: '2rem', fontWeight: 600 }}>
              {student.name ? student.name.charAt(0).toUpperCase() : '?'}
            </Avatar>
            <Box>
              <Typography variant="h3" fontWeight={700} gutterBottom>
                Welcome Back!
              </Typography>
              <Typography variant="h5" sx={{ opacity: 0.9 }}>
                {student.name || <span style={{ color: '#bbb' }}>No Name</span>}
              </Typography>
              {student.branch && (
                <Chip label={student.branch} sx={{ mt: 1, bgcolor: alpha('#fff', 0.2), color: 'white', fontWeight: 600 }} />
              )}
            </Box>
          </Box>
        </Paper>
        <Grid container spacing={4}>
          {/* Student Information Card */}
          <Grid item xs={12} md={8}>
            <Card elevation={0} sx={{ borderRadius: 3, border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`, height: 'fit-content' }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'between', mb: 3 }}>
                  <Typography variant="h5" fontWeight={600} color="primary">
                    Personal Information
                  </Typography>
                  <IconButton onClick={onEdit} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) } }}>
                    <EditIcon color="primary" />
                  </IconButton>
                </Box>
                <Stack spacing={3}>
                  {student.mail && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <EmailIcon color="action" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Email</Typography>
                        <Typography variant="body1" fontWeight={500}>{student.mail}</Typography>
                      </Box>
                    </Box>
                  )}
                  {student.phonenumber && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <PhoneIcon color="action" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Phone Number</Typography>
                        <Typography variant="body1" fontWeight={500}>{student.phonenumber}</Typography>
                      </Box>
                    </Box>
                  )}
                  {student.registration_number && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <SchoolIcon color="action" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Registration Number</Typography>
                        <Typography variant="body1" fontWeight={500}>{student.registration_number}</Typography>
                      </Box>
                    </Box>
                  )}
                  <Divider />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Batch</Typography>
                      {student.batch ? (
                        <Chip label={student.batch} color="primary" variant="outlined" sx={{ mt: 1, fontWeight: 600 }} />
                      ) : (
                        <Typography variant="body1" sx={{ mt: 1, color: '#bbb' }}>No Batch</Typography>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Branch</Typography>
                      {student.branch ? (
                        <Chip label={student.branch} color="secondary" variant="outlined" sx={{ mt: 1, fontWeight: 600 }} />
                      ) : (
                        <Typography variant="body1" sx={{ mt: 1, color: '#bbb' }}>No Branch</Typography>
                      )}
                    </Grid>
                  </Grid>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          {/* Resume Card */}
          <Grid item xs={12} md={4}>
            <Card elevation={0} sx={{ borderRadius: 3, border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`, height: 'fit-content' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} color="secondary" gutterBottom>
                  Resume
                </Typography>
                {student.resumePath ? (
                  <Box>
                    <Box sx={{ width: '100%', height: 200, borderRadius: 2, overflow: 'hidden', background: '#f8f9fa', border: `2px dashed ${alpha(theme.palette.secondary.main, 0.3)}`, mb: 2, position: 'relative' }}>
                      <iframe src={`${import.meta.env.VITE_BACKEND_API_URL}/${student.resumePath.replace(/\\/g, '/')}`} title="Resume PDF" className="resume-iframe" />
                    </Box>
                    <Stack spacing={1}>
                      <Button variant="outlined" startIcon={<VisibilityIcon />} onClick={() => setResumeDialogOpen(true)} fullWidth sx={{ textTransform: 'none' }}>
                        View Fullscreen
                      </Button>
                      <Button href={`${import.meta.env.VITE_BACKEND_API_URL}/${student.resumePath.replace(/\\/g, '/')}`} target="_blank" variant="contained" startIcon={<DownloadIcon />} fullWidth sx={{ textTransform: 'none' }}>
                        Download
                      </Button>
                    </Stack>
                  </Box>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="body2" color="text.secondary">No resume uploaded yet</Typography>
                    <Button variant="outlined" onClick={onEdit} sx={{ mt: 2, textTransform: 'none' }}>
                      Upload Resume
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* Fullscreen Resume Dialog */}
        <Dialog open={resumeDialogOpen} onClose={() => setResumeDialogOpen(false)} maxWidth="xl" fullWidth PaperProps={{ sx: { borderRadius: 3, height: '90vh' } }}>
          <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'between', borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="h6" fontWeight={600}>Resume Preview</Typography>
            <IconButton onClick={() => setResumeDialogOpen(false)}><CloseIcon /></IconButton>
          </DialogTitle>
          <DialogContent sx={{ p: 0, height: '100%' }}>
            {student?.resumePath && (
              <iframe src={`${import.meta.env.VITE_BACKEND_API_URL}/${student.resumePath.replace(/\\/g, '/')}`} title="Resume PDF Fullscreen" className="resume-iframe-fullscreen" />
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </Fade>
  );
}
