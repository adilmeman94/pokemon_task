import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { logout, userData } = useAuth();

  return (
    <AppBar position='static'>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#ce416b',
        }}
      >
        <Typography
          variant='h6'
          component='div'
        >
          Pokedex
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'secondary.main' }}>{userData?.avatar}</Avatar>
          <Button
            color='inherit'
            onClick={logout}
            sx={{ textTransform: 'none' }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
