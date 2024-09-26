import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { sendMessage, subscribeToMessages, unsubscribeFromMessages } from '../../store/slices/chatSlice';
import { AppDispatch, RootState } from '../../store/index.ts';
import { ChatMessage, MessageType } from '../../interfaces/Chat.ts';
import { UserRole } from '../../interfaces/ProjectManager-interfaces.ts';
import Button from './Button.tsx';
import Input from './Input.tsx';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ChatHeader = styled.div`
  padding: 10px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ccc;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

const MessageBubble = styled.div<{ isSent: boolean }>`
  max-width: 70%;
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  background-color: ${props => props.isSent ? '#dcf8c6' : '#fff'};
  align-self: ${props => props.isSent ? 'flex-end' : 'flex-start'};
`;

const ChatInput = styled.div`
  display: flex;
  padding: 10px;
  background-color: #f0f0f0;
`;

const ChatComponent= () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentChat = useSelector((state: RootState) => state.chat.currentChat);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [message, setMessage] = useState<string>('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [audioMessage, setAudioMessage] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const audioRecorderRef = useRef<MediaRecorder | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentChat) {
      dispatch(subscribeToMessages(currentChat.id));
    }
    return () => {
      if (currentChat) {
        unsubscribeFromMessages(currentChat.id);
      }
    };
  }, [currentChat, dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages]);

  const handleSendMessage = () => {
    if (!currentChat || (!message && !attachment && !audioMessage) || !currentUser) return;

    const newMessage: Omit<ChatMessage, 'id'> = {
      sender: currentUser,
      content: message || 'Attachment',
      timestamp: new Date().toISOString(),
      type: attachment ? MessageType.Attachment : audioMessage ? MessageType.Audio : MessageType.Text,
      attachmentUrl: attachment ? URL.createObjectURL(attachment) : audioMessage ? URL.createObjectURL(audioMessage) : undefined,
    };

    dispatch(sendMessage(currentChat.id, newMessage));
    setMessage('');
    setAttachment(null);
    setAudioMessage(null);
  };

  const handleFileUpload = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachment(e.target.files[0]);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioRecorderRef.current = recorder;
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
        setAudioMessage(blob);
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (audioRecorderRef.current) {
      audioRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  if (!currentChat || !currentUser) return null;

  return (
    <ChatContainer>
      <ChatHeader>
        <h2>{currentChat.isGroupChat ? currentChat.name : currentChat.participants.filter(user => user.id !== currentUser.id).map(user => user.name).join(', ')}</h2>
      </ChatHeader>
      <ChatMessages>
        {currentChat.messages.map((msg) => (
          <MessageBubble key={msg.id} isSent={msg.sender.id === currentUser.id}>
            <strong>{msg.sender.name}: </strong>
            {msg.type === MessageType.Text && <span>{msg.content}</span>}
            {msg.type === MessageType.Attachment && <a href={msg.attachmentUrl} download>Download File</a>}
            {msg.type === MessageType.Audio && <audio controls src={msg.attachmentUrl} />}
          </MessageBubble>
        ))}
        <div ref={messagesEndRef} />
      </ChatMessages>
      <ChatInput>
        <Input
          type="text"
          value={message}
          onChange={(e: { target: { value: any }; }) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <input type="file" onChange={handleFileUpload} />
        <Button onClick={handleSendMessage}>Send</Button>
        <Button onClick={isRecording ? stopRecording : startRecording}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Button>
      </ChatInput>
    </ChatContainer>
  );
};

export default ChatComponent;