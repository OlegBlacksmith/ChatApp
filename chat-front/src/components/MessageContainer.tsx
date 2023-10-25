import {useEffect, useRef } from 'react';

interface Message {
    user: string;
    message: string;
  }
  
  interface MessageContainerProps {
    messages: Message[];
  }
  
  const MessageContainer: React.FC<MessageContainerProps> = ({ messages }) => {
    
    const messageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if(messageRef && messageRef.current){
        const { scrollHeight, clientHeight } = messageRef.current;
        messageRef.current.scrollTo({
          left: 0, top: scrollHeight - clientHeight,
        behavior: 'smooth' 
        });
      }
    }, [messages]);
    
    return (
      <div className=" h-[400px] bg-gray-100 overflow-auto rounded-lg border border-gray-200 mb-2">
        {messages.map((m, index) => (
          <div key={index} className="text-right pr-5 text-xl">
            <div className="inline-flex mx-auto p-4 text-white text-xl bg-blue-500 rounded-full mt-3">
                {m.message}
            </div>
            <div className="text-xs mb-3 mr-5">{m.user}</div>
          </div>
        ))}
      </div>
    );
  };
  
  export default MessageContainer;