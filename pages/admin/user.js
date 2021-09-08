import React from 'react';

import Admin from 'layouts/Admin.js';
import UserContainer from '../../containers/admin/userContainer';

const User = () => {
  return (
    <Admin>
      <UserContainer />
    </Admin>
  );
};

export default User;
