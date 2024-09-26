// src/pages/Login.tsx
import * as React from 'react'; import  { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase.config.ts';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 40px;
  background-color: #1e1e1e;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
  color: #fff;
`;

const Title = styled.h2`
  text-align: center;
  color: #00ffff;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: none;
  border-radius: 4px;
  background-color: #2d2d2d;
  color: #fff;
  font-size: 16px;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #00ffff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #00ffff;
  color: #1e1e1e;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #00cccc;
  }
`;

const ErrorMessage = styled.p`
  color: #ff4d4d;
  text-align: center;
  margin-top: 10px;
`;

const StyledLink = styled(Link)`
  color: #00ffff;
  text-decoration: none;
  text-align: center;
  margin-top: 15px;
  display: block;
  &:hover {
    text-decoration: underline;
  }
`;

const Login= () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/projects');
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <LoginContainer>
      <Title>Login to DevHub</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Login</Button>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <StyledLink to="/register">New to DevHub? Create an account</StyledLink>
    </LoginContainer>
  );
};

export default Login;