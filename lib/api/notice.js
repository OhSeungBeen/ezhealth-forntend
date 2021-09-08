import client from './client';

export const writeNotice = ({ title, body }) => {
  client.post('/api/notice', { title, body });
};

export const readeNotice = (id) => client.get(`/api/notice/${id}`);
