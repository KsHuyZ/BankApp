import React, {createContext, useReducer, ReactElement, ReactNode} from 'react';
import {socketEmit} from '../utils';

export const initialProfile: ProfileType = {
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  balance: 0,
  accessToken: '',
  refreshToken: '',
};

const enum REDUCER_ACTION_TYPE {
  SETPROFILE,
  UPDATEPROFILE,
  CLEARPROFILE,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: ProfileType;
};

const profileReducer = (state: ProfileType, action: ReducerAction) => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.SETPROFILE:
      if (!action.payload) {
        return state;
      }
      return action.payload;
    case REDUCER_ACTION_TYPE.UPDATEPROFILE:
      return action.payload;
    case REDUCER_ACTION_TYPE.CLEARPROFILE:
      return initialProfile;
    default:
      return state;
  }
};

const useAuthContext = (profile: ProfileType) => {
  const [state, dispatch] = useReducer(profileReducer, profile);
  const saveProfile = (item: ProfileType) => {
    socketEmit('create-user', {_id: item._id});
    dispatch({type: REDUCER_ACTION_TYPE.SETPROFILE, payload: item});
  };
  const updateProfile = (item: ProfileType) =>
    dispatch({type: REDUCER_ACTION_TYPE.UPDATEPROFILE, payload: item});

  const clearProfile = () => dispatch({type: REDUCER_ACTION_TYPE.CLEARPROFILE});

  return {state, saveProfile, updateProfile, clearProfile};
};

type UseAuthType = ReturnType<typeof useAuthContext>;

const initContextState: UseAuthType = {
  state: initialProfile,
  saveProfile: () => {},
  clearProfile: () => {},
  updateProfile: () => {},
};

export const AuthContext = createContext(initContextState);

type ChildrenType = {
  children?: ReactNode;
};

const AuthProvider = ({children}: ChildrenType): ReactElement => {
  return (
    <AuthContext.Provider value={useAuthContext(initialProfile)}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
