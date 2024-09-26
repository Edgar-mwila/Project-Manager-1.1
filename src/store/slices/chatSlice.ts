// src/store/slices/chatSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chat, ChatMessage } from '../../interfaces/Chat.ts';
import { db } from '../../config/firebase.config.ts';
import { ref, push, set, onChildAdded, off } from 'firebase/database';
import { AppThunk } from '../index.ts';

interface ChatState {
  chats: Chat[];
  currentChat: Chat | null;
}

const initialState: ChatState = {
  chats: [],
  currentChat: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChat(state, action: PayloadAction<Chat>) {
      state.chats.push(action.payload);
    },
    setCurrentChat(state, action: PayloadAction<Chat>) {
      state.currentChat = action.payload;
    },
    addMessage(state, action: PayloadAction<{ chatId: string; message: ChatMessage }>) {
      const chat = state.chats.find(chat => chat.id === action.payload.chatId);
      if (chat) {
        chat.messages.push(action.payload.message);
        chat.lastMessage = action.payload.message.content;
        chat.updatedAt = new Date().toISOString();
      }
    },
  },
});

export const { addChat, setCurrentChat, addMessage } = chatSlice.actions;

// Thunks
export const createChat = (chat: Omit<Chat, 'id'>): AppThunk => async (dispatch: (arg0: { payload: Chat; type: "chat/addChat"; }) => void) => {
  const newChatRef = push(ref(db, 'chats'));
  const newChat: Chat = { ...chat, id: newChatRef.key as string };
  await set(newChatRef, newChat);
  dispatch(addChat(newChat));
};

export const sendMessage = (chatId: string, message: Omit<ChatMessage, 'id'>): AppThunk => async (dispatch: (arg0: { payload: { chatId: string; message: ChatMessage; }; type: "chat/addMessage"; }) => void) => {
  const newMessageRef = push(ref(db, `chats/${chatId}/messages`));
  const newMessage: ChatMessage = { ...message, id: newMessageRef.key as string };
  await set(newMessageRef, newMessage);
  dispatch(addMessage({ chatId, message: newMessage }));
};

export const subscribeToChats = (): AppThunk => (dispatch: (arg0: { payload: Chat; type: "chat/addChat"; }) => void) => {
  const chatsRef = ref(db, 'chats');
  onChildAdded(chatsRef, (snapshot) => {
    const chat = snapshot.val() as Chat;
    dispatch(addChat(chat));
  });
};

export const subscribeToMessages = (chatId: string): AppThunk => (dispatch: (arg0: { payload: { chatId: string; message: ChatMessage; }; type: "chat/addMessage"; }) => void) => {
  const messagesRef = ref(db, `chats/${chatId}/messages`);
  onChildAdded(messagesRef, (snapshot) => {
    const message = snapshot.val() as ChatMessage;
    dispatch(addMessage({ chatId, message }));
  });
};

export const unsubscribeFromMessages = (chatId: string) => {
  const messagesRef = ref(db, `chats/${chatId}/messages`);
  off(messagesRef);
};

export default chatSlice.reducer;