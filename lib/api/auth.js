import client from './client';

// register
export const register = ({ username, password }) =>
  client.post('/api/auth/register', { username, password });

// login
export const login = ({ username, password }) =>
  client.post('/api/auth/login', { username, password });

// login check
export const logincheck = () => client.get('/api/auth/check');

export const logout = () => client.post('/api/auth/logout');
