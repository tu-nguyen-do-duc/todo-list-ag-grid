import "./App.css";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            <nav>
              <Link to={"/"}>Home </Link>
              <Link to={"/todo"}>To do </Link>
            </nav>
            <Outlet />
          </Typography>  
        </Toolbar>
      </AppBar>
    </Container>
  );
}

export default App;