// src/interfaces/Chat.ts

import { User } from './ProjectManager-interfaces';

// Message Types
export enum MessageType {
  Text = 'Text',
  Attachment = 'Attachment',
  Audio = 'Audio',
}

// Chat Message Interface
export interface ChatMessage {
  id: string;
  sender: User;
  content: string;
  timestamp: string; // ISO date format
  type: MessageType;
  attachmentUrl?: string; // For attachments and audio messages
}

// Chat Interface
export interface Chat {
  id: string;
  name: string; // Added for group chats
  isGroupChat: boolean;
  participants: User[];
  messages: ChatMessage[];
  lastMessage: string; // Display the last message in the chat list
  createdAt: string; // ISO date format
  updatedAt: string; // ISO date format
}