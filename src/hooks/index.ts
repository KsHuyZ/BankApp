import {useContext, useEffect} from 'react';
import {AuthContext} from '../context/AuthContext';
import socket from '../libs/socket';

export const useAuth = () => {
  const {
    state: profile,
    saveProfile,
    updateProfile,
    clearProfile,
  } = useContext(AuthContext);
  return {profile, saveProfile, updateProfile, clearProfile};
};

export function useSocketEvent(
  event: string,
  callback: (...args: any) => void,
) {
  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on(event, callback);

    return () => {
      socket.off(event, callback);
    };
  }, [callback, event, socket]);

  return socket;
}
