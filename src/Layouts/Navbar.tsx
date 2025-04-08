import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${240}px)` },
        ml: { sm: `${240}px` },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center", 
        }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h2" className="navbarTitle">
          CSD & CSIT Department
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
