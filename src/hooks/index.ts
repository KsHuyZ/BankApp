import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

export const useAuth = () => {
  const {
    state: profile,
    saveProfile,
    updateProfile,
    clearProfile,
  } = useContext(AuthContext);
  return {profile, saveProfile, updateProfile, clearProfile};
};
