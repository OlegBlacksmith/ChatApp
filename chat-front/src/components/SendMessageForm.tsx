import { useState } from 'react';

interface SendMessageFormProps {
  sendMessage: (message: string) => void;
}

const SendMessageForm: React.FC<SendMessageFormProps> = ({ sendMessage }) => {
  const [message, setMessage] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
  };

  return (
    <form onSubmit={handleFormSubmit} className="mb-4">
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Let's type..."
          className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className={`px-4 py-2 bg-blue-500 text-white rounded ${!message && 'opacity-50 cursor-not-allowed'}`}
          disabled={!message}
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default SendMessageForm;