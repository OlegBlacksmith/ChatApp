import ConnectedUsers from './ConnectedUsers';
import MessageContainer from './MessageContainer';
//import RoomsList from './RoomsList';
import SendMessageForm from './SendMessageForm';

interface Message {
  user: string;
  message: string;
}

interface ChatProps {
  messages: { user: string; message: string }[];
  sendMessage: (message: string) => Promise<void>;
  closeConnection: () => Promise<void>;
  users: string[];
  rooms: string[];
}

const Chat: React.FC<ChatProps> = ({ messages, sendMessage, closeConnection, users, rooms }) =>
    <div className='text-right'>
            <div className='mb-1 mt-1'>
        <button
          className="
          bg-red-500 
          hover:bg-red-600 
          text-white 
          font-bold py-2 px-4 rounded" 
          onClick={() => closeConnection()}>
          🔙
        </button>
      </div>
      
      <ConnectedUsers users={users}/>
      <div className="grid">
        <MessageContainer messages={messages} />
        <SendMessageForm sendMessage={sendMessage}/>
      </div>
    </div>
export default Chat;