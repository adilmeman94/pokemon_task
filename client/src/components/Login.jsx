import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
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
      console.log('Login successful:', data);
      login(data);
      navigate('/');
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'Email is required';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 6) {
      return 'Password must be at least 8 characters long';
    }
    // if (/\s/.test(password)) {
    //   return 'Password cannot contain spaces';
    // }
    // if (password === email) {
    //   return 'Password cannot be the same as your email';
    // }
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
    // if (!passwordRegex.test(password)) {
    //   return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*())';
    // }
    return '';
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
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

  const isFormValid = !emailError && !passwordError && email && password;

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      minHeight='100vh'
    >
      <Typography
        variant='h4'
        gutterBottom
      >
        Login To Pokedex
      </Typography>
      <TextField
        label='Email'
        variant='outlined'
        margin='normal'
        value={email}
        onChange={handleEmailChange}
        fullWidth
        required
        error={!!emailError}
        helperText={emailError}
      />
      <TextField
        label='Password'
        type='password'
        variant='outlined'
        margin='normal'
        value={password}
        onChange={handlePasswordChange}
        required
        fullWidth
        error={!!passwordError}
        helperText={passwordError}
      />
      <Button
        variant='contained'
        color='primary'
        size='large'
        style={{ marginTop: '16px' }}
        onClick={handleLogin}
        disabled={loginMutation.isLoading || !isFormValid}
      >
        Login
      </Button>
      <Box mt={2}>
        {loginMutation.isLoading && <CircularProgress />}
        {loginMutation.isLoading && (
          <span>PLEASE WAIT WE ARE SIGNGING YOU IN</span>
        )}
      </Box>
    </Box>
  );
};

export default Login;
