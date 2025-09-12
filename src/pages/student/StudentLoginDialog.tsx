import { Drawer, Box, Typography, TextField, Button, CircularProgress, IconButton } from "@mui/material";
import { useSnackbar } from "notistack";
import { School as SchoolIcon, Phone as PhoneIcon, Login as LoginIcon, Close as CloseIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface Props {
  open: boolean;
  phonenumber: string;
  password: string;
  loading: boolean;
  error: string;
  setPhonenumber: (val: string) => void;
  setPassword: (val: string) => void;
  onLogin: () => Promise<void>;
}

export default function StudentLoginDialog({ open, phonenumber, password, loading, error, setPhonenumber, setPassword, onLogin }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/"); // Go to home, or replace with previous tab logic if needed
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: 400,
          maxWidth: '90vw',
          boxShadow: 6,
          zIndex: 1301,
        }
      }}
      ModalProps={{
        keepMounted: true,
        sx: { zIndex: 1301 }
      }}
    >
      <Box sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderBottom: '1px solid #eee' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LoginIcon />
            <Typography variant="h5" fontWeight={600}>Student Portal</Typography>
          </Box>
          <IconButton aria-label="close" onClick={handleClose} size="large">
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ p: 4, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <TextField
            label="Phone Number"
            fullWidth
            margin="normal"
            value={phonenumber}
            onChange={e => setPhonenumber(e.target.value)}
            variant="outlined"
            InputProps={{ startAdornment: <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} /> }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password (Registration Number)"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            variant="outlined"
            InputProps={{ startAdornment: <SchoolIcon sx={{ mr: 1, color: 'text.secondary' }} /> }}
          />
          {error && (
            <Box sx={{ mt: 2, p: 2, bgcolor: "#ffeaea", borderRadius: 2 }}>
              <Typography color="error" variant="body2">{error}</Typography>
            </Box>
          )}
          <Button
            onClick={() => onLogin().catch(err => enqueueSnackbar(err.message || "Login failed", { variant: "error" }))}
            disabled={loading}
            variant="contained"
            size="large"
            fullWidth
            sx={{ py: 1.5, borderRadius: 2, fontWeight: 600, textTransform: 'none', fontSize: '1.1rem', mt: 4 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
