import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Chat {
    message: string;
    isUser: boolean;
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
        }
    },
});

export const { addMessage } = conversationSlice.actions;
export default conversationSlice.reducer;