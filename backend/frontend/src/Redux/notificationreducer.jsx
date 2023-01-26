/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useSelector, useDispatch } from 'react-redux';

// Define the initial state for the slice
const initialState = {
  unreadMessageCount: 0,
  connectionStatus: 'Uninstantiated',
};

// Create the notification slice
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setUnreadMessageCount: (state, action) => {
      state.unreadMessageCount = action.payload;
    },

    setConnectionStatus: (state, action) => {
      console.log('notification reducer', action.payload);
      state.connectionStatus = action.payload;
    },
  },
});

export const { setUnreadMessageCount, setConnectionStatus, incrementCount } = notificationSlice.actions;

export default notificationSlice.reducer;

// Use the slice in your component

export const notification = () => {
  const dispatch = useDispatch();

  console.log('notification');
  const authTokens = useSelector((state) => state.user?.token?.access_token);
  const FTokens = useSelector((state) => state.freelancer?.token?.access_token);

  const { readyState } = useWebSocket(
    authTokens
      ? `ws://lan-cer.online/new/notifications/`
      : FTokens
        ? `ws://lan-cer.online/new/notifications/`
        : null,
    {
      queryParams: {
        token: authTokens || FTokens,
      },
      onOpen: () => {
        console.log('Connected to Notifications!');
      },
      onClose: () => {
        console.log('Disconnected from Notifications!');
      },
      onMessage: (e) => {
        const data = JSON.parse(e.data);
        console.log(data);
        switch (data.type) {
          case 'unread_count':
            dispatch(setUnreadMessageCount(data.unread_count));
            break;
          case 'new_message_notification':
            dispatch(setUnreadMessageCount((count) => (count += 1)));
            break;
          default:
            console.error('Unknown message type!');
            break;
        }
      },
    },
  );
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];
  dispatch(setConnectionStatus(connectionStatus));
};
