import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Paper,
} from '@mui/material';
import useLogin from '../hooks/useLogin';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const loginMutation = useLogin({
    onSuccess: (data) => {
      login(data);
      navigate('/');
    },
  });

  const validateEmail = (email) => {
    if (!email) return 'Email is required';
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return 'Enter valid email';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Minimum 6 characters';
    // if (/\s/.test(password)) {
    //   return 'Password cannot contain spaces';
    // }
    // if (password === email) {
    //   return 'Password cannot be the same as your email';
    // }
    // const passwordRegex =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
    // if (!passwordRegex.test(password)) {
    //   return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*())';
    // }
    return '';
  };

  const handleLogin = () => {
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (!emailErr && !passwordErr) {
      loginMutation.mutate({ email, password });
    }
  };

  const isFormValid = email && password && !emailError && !passwordError;

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Box
        sx={{
          height: 120,
          backgroundColor: '#ff9aa2',
          display: 'flex',
          alignItems: 'center',
          px: 4,
        }}
      >
        <Typography
          variant='h6'
          sx={{ color: '#fff', fontWeight: 600 }}
        >
          Pokedex
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: -6,
          height: 'calc(100vh - 200px)',          
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: 380,
            p: 10,
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography
            variant='h6'
            gutterBottom
          >
            Login to Pokedex
          </Typography>

          <TextField
            fullWidth
            size='small'
            margin='normal'
            placeholder='Email address'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(validateEmail(e.target.value));
            }}
            error={!!emailError}
            helperText={emailError}
          />

          <TextField
            fullWidth
            size='small'
            margin='normal'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(validatePassword(e.target.value));
            }}
            error={!!passwordError}
            helperText={passwordError}
          />

          <Button
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: '#ff9aa2',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#ff7b85',
              },
            }}
            variant='contained'
            disabled={!isFormValid || loginMutation.isLoading}
            onClick={handleLogin}
          >
            Login
          </Button>

          {/* Loader */}
          {loginMutation.isLoading && (
            <Box sx={{ mt: 3 }}>
              <CircularProgress size={22} />
              <Typography
                variant='caption'
                display='block'
                sx={{ mt: 1 }}
              >
                PLEASE WAIT WHILE WE ARE SIGNING YOU IN
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;
