type ProfileType = {
  _id: string;
  firstName?: string;
  lastName?: string;
  balance: number;
  email?: string;
  token?: string;
  phoneNumber?: string;
  cardNumber?: string;
  accessToken?: string;
  refreshToken?: string;
};

type HistoryType = {
  transactionType: string;
  time: string;
  ammount: number;
  message: string;
};

const enum REDUCER_ACTION_TYPE {
  SETPROFILE,
  UPDATEPROFILE,
  CLEARPROFILE,
}

type RegisterFormType = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  rePassword: string;
};
