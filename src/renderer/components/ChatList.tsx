// src/components/ChatList.tsx
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChat, subscribeToChats } from '../../store/slices/chatSlice.ts';
import { AppDispatch, RootState } from '../../store/index.ts';

const ChatList= () => {
  const dispatch = useDispatch<AppDispatch>();
  const chats = useSelector((state: RootState) => state.chat.chats);

  useEffect(() => {
    dispatch(subscribeToChats());
  }, [dispatch]);

  const handleSelectChat = (chatId: string) => {
    const selectedChat = chats.find(chat => chat.id === chatId);
    if (selectedChat) {
      dispatch(setCurrentChat(selectedChat));
    }
  };

  return (
    <div className="chat-list">
      <h2>Your Chats</h2>
      <ul>
        {chats.map(chat => (
          <li key={chat.id} onClick={() => handleSelectChat(chat.id)}>
            {chat.isGroupChat ? (
              <strong>{chat.name}</strong>
            ) : (
              <strong>{chat.participants.filter(user => user.id !== '1').map(user => user.name).join(', ')}</strong>
            )}
            <p>{chat.lastMessage}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;