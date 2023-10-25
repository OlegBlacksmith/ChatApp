"use client"
import Chat from '@/components/Chat';
import Lobby from '@/components/Lobby';
import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr';

const App = () => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [messages, setMessages] = useState<{ user: string; message: string }[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [rooms, setRooms] = useState<string[]>([]);

  const joinRoom = async (user: string, room: string) => {
    try {
      const newConnection = new HubConnectionBuilder()
        .withUrl("https://localhost:7229/chat")
        .configureLogging(LogLevel.Information)
        .build();

      newConnection.on("ReceiveMessage", (user : string, message : string) => {
        setMessages(messages  => [...messages, {user, message}])
      });

      newConnection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      newConnection.on('ReceiveChatRooms', (rooms: string[]) => {
        setRooms(rooms);
      });

      newConnection.onclose(e => {
        setConnection(null);
        setMessages([]);
        setUsers([]);
        setRooms([]);
      });

      await newConnection.start();
      await newConnection.invoke("JoinRoom", { user, room });
      setConnection(newConnection);
      await newConnection.invoke("SendChatRooms", {rooms});
    } catch (e) {
      console.log(e);
    }
  };
  

  const sendMessage = async (message: string): Promise<void> => {
    try {
      await connection?.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  };

  const closeConnection = async () => {
    try{
      await connection?.stop();
    }catch(e) {
      console.log(e);
    }
  };
  

  return (
    <div>
      <div className='bg-blue-600 rounded 
        text-white text-lg font-bold
        flex items-center justify-center'>
          My Chat 0.1.1
      </div>
      <div>
        {!connection
        ? <Lobby joinRoom={joinRoom} />
        : <Chat messages={messages} sendMessage={sendMessage} 
            closeConnection={closeConnection} users={users} rooms={rooms}/>}
      </div>
    </div>
  );
};

export default App;