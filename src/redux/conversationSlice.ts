import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {v4 as uuidv4} from 'uuid';

export interface Chat extends ChatRequest{
    createdAt: string;
    id: string;
}

export interface ChatRequest {
    message: string;
    isUser: boolean;
}

export interface ConversationState {
    conversation: Chat[];
    isLoading: boolean;
}

const initialState: ConversationState = {
    conversation: [],
    isLoading: false,
}

export const conversationSlice = createSlice({
    name: "conversationSlice",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<ChatRequest>) => {
            const newTime = new Date();
            state.conversation.unshift({...action.payload , createdAt: newTime.toUTCString(), id: uuidv4()});
        },
        clearConversation: (state) => {
            state.conversation = [];
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    },
});

export const { setIsLoading, addMessage, clearConversation } = conversationSlice.actions;
export default conversationSlice.reducer;