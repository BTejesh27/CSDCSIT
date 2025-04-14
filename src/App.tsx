import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
import { theme as lightTheme } from "./theme";
import Layout from "./Layouts";
import AppRoutes from "./routes";
import Sidebar from "./Layouts/Sidebar";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false); // State for mobile drawer

  const theme = createTheme({
    ...lightTheme,
    palette: {
      ...lightTheme.palette,
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#121212" : "#FFFFFF", // Dark mode background
        paper: darkMode ? "#1E1E1E" : "#FFFFFF", // Dark mode paper
      },
      text: {
        primary: darkMode ? "#FFFFFF" : "#212121", // Dark mode text
        secondary: darkMode ? "#B0B0B0" : "#757575",
      },
    },
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Sidebar
            mobileOpen={mobileOpen}
            onClose={handleDrawerToggle}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <AppRoutes />
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
