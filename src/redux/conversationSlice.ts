import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Chat {
    message: string;
    isUser: boolean;
    createdAt: Date;
}

export interface ConversationState {
    conversation: Chat[];
}

const initialState: ConversationState = {
    conversation: [],
}

export const conversationSlice = createSlice({
    name: "conversationSlice",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Chat>) => {
            state.conversation.unshift(action.payload);
        },
        clearConversation: (state) => {
            state.conversation = [];
        }
    },
});

export const { addMessage, clearConversation } = conversationSlice.actions;
export default conversationSlice.reducer;