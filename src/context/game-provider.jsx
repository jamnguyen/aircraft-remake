import React from 'react';
import { io } from "socket.io-client";
import { SOCKET_URL } from '../app-config';
import IOMessage from '../constants/io-messages';

const GameContext = React.createContext();

export const GameProvider = ({ children }) => {
  const [availables, setAvailables] = React.useState([]);
  const [isHandshaking, setIsHandshaking] = React.useState(true);
  const [error, setError] = React.useState(null);
  const socket = React.useRef();

  // Setup Socket io here
  const connect = (username, onSuccess, onError) => {
    setAvailables([]);
    setIsHandshaking(true);
    setError(null);
    socket.current = io(
      SOCKET_URL,
      {
        query: { username },
        transports: ["websocket"]
      }
    );
    
    socket.current.on(IOMessage.CONNECTED, () => {
      setIsHandshaking(false);
      setError(null);
    });

    socket.current.on(IOMessage.CONNECT_SUCCESS, () => {
      onSuccess && onSuccess();
    });

    socket.current.on(IOMessage.DISCONNECTED, () => {
      console.log('DISCONNECTED');
      setError({ message: "Connect failed, please try again later." });
    });

    socket.current.on(IOMessage.CONNECT_ERROR, () => {
      console.log('CONNECT_ERROR');
      setError({ message: "Connect failed, please try again later." });
    });

    socket.current.on(IOMessage.AVAILABLE_LIST, (data) => {
      setAvailables(data || []);
    });
  };

  const updateUser = (payload) => {
    socket.current?.emit(IOMessage.USER_CHANGE, payload);
  }

  const getUserId = () => {
    return socket.current?.id;
  };

  const value = {
    availables,
    isHandshaking,
    error,
    connect,
    updateUser,
    getUserId,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = React.useContext(GameContext);
  if (context) {
    return context;
  } else {
    throw new Error('useGame must be used inside GameProvider!');
  }
};
