type ProfileType = {
  firstName: string;
  lastName: string;
  balance: number;
  email: string;
  token: string;
};

const enum REDUCER_ACTION_TYPE {
  SETPROFILE,
  UPDATEPROFILE,
  CLEARPROFILE,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: string;
};
type UseAuthHookType = {
  profile: ProfileType;
  saveProfile: () => void;
  updateProfile: () => void;
  clearProfile: () => void;
};
type RegisterFormType = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  rePassword: string;
};
