import client from './client';

// count all user
export const countAll = () => client.get('/api/user/countAll');
