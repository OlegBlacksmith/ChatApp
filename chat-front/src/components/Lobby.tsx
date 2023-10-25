"use client"
import { useState } from 'react';

interface LobbyProps {
  joinRoom?: (user: string, room: string) => void;
}

const Lobby: React.FC<LobbyProps> = ({ joinRoom }) => {
  const [user, setUser] = useState<string>('');
  const [room, setRoom] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (joinRoom) {
      joinRoom(user, room);
    }
  };

  return (
    <form className="w-400 mx-auto" onSubmit={handleSubmit}>
      <div className='flex items-center justify-center mt-2 bg-blue-500 h-20 
      text-white font-semibold'>
        WELCOME
      </div>
      <div className="flex items-center justify-center mt-2">
        <input
          type="text"
          placeholder="name"
          className="w-60 border rounded py-2 px-3 text-center"
          onChange={(e) => setUser(e.target.value)}
          value={user}
        />
      </div>
      <div className="flex items-center justify-center mt-2">
        <input
          type="text"
          placeholder="room"
          className="w-60 border rounded py-2 px-3 text-center"
          onChange={(e) => setRoom(e.target.value)}
          value={room}
        />
      </div>
      <div className='flex items-center justify-center mt-4'>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
          disabled={!user || !room}
        >
          Join
        </button>
        </div>
    </form>
  );
};

export default Lobby;