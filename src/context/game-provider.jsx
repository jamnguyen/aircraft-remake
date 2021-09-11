import React from 'react';
import { io } from "socket.io-client";
import { SOCKET_URL } from '../app-config';
import IOMessage from '../constants/io-messages';

const GameContext = React.createContext();

export const GameProvider = ({ children }) => {
  const [availables, setAvailables] = React.useState([]);
  const [request, setRequest] = React.useState(null);
  const [isHandshaking, setIsHandshaking] = React.useState(true);
  const [error, setError] = React.useState(null);
  const socket = React.useRef();

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
    
    // ---------------------------------------------
    // RECEIVING MESSAGES
    // INITIALIZE
    // ---------------------------------------------
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

    // ---------------------------------------------
    // GAME LOUNGE
    // ---------------------------------------------
    socket.current.on(IOMessage.AVAILABLE_LIST, (data) => {
      setAvailables(data || []);
    });
  
    socket.current.on(IOMessage.BATTLE_REQUEST, (payload) => {
      setRequest(payload);
    });

    socket.current.on(IOMessage.BATTLE_REQUEST_CANCEL, (payload) => {
      setRequest(payload);
    });

    socket.current.on(IOMessage.BATTLE_ACCEPTED, (payload) => {
      // @TODO: MOVE TO BOARD SETUP
    });

    socket.current.on(IOMessage.BATTLE_REJECTED, (payload) => {
      setRequest(payload);
    });
  };

  // -----------------------------------------------
  // EMITTING MESSAGES
  // GAME LOUNGE
  // -----------------------------------------------
  const updateUser = (payload) => {
    socket.current?.emit(IOMessage.USER_CHANGE, payload);
  }

  const getUserId = () => {
    return socket.current?.id;
  };

  const requestBattle = (player) => {
    setRequest({
      message: `Waiting ${player.username} to accept...`,
      opponent: player
    });
    socket.current?.emit(IOMessage.BATTLE_REQUEST, player.id);
  }

  const cancelRequest = () => {
    socket.current?.emit(IOMessage.BATTLE_REQUEST_CANCEL, request?.opponent.id);
    setRequest(null);
  }

  const acceptBattle = () => {
    socket.current?.emit(IOMessage.BATTLE_ACCEPTED, request?.opponent.id);
  }

  const rejectBattle = () => {
    socket.current?.emit(IOMessage.BATTLE_REJECTED, request?.opponent.id);
  }

  const value = {
    availables,
    isHandshaking,
    error,
    request,
    connect,
    updateUser,
    getUserId,
    setRequest,
    requestBattle,
    cancelRequest,
    acceptBattle,
    rejectBattle,
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
