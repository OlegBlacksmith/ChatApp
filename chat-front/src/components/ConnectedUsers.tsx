import React from 'react';

interface ConnectedUsersProps {
  users: string[];
}

const ConnectedUsers: React.FC<ConnectedUsersProps> = ({ users }) => (
  <div className="float-left bg-blue-500 text-white text-center w-52 h-[400px] mr-1 rounded-lg">
    <div className="rounded-t-lg bg-blue-700 p-2">
      <h4 className="text-center text-base font-bold">Connected Users</h4>
    </div>
    {users.map((u, idx) => 
    <div className=' text-base' 
    key={idx}>🟢{u}</div>)}
  </div>
);

export default ConnectedUsers;