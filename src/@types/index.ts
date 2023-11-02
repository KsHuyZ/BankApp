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

type NotifiType = {
  _id: string;
  historyId: {
    _id: string;
    transactionId: {
      _id: string;
      fromUser: {
        firstName: string;
        lastName: string;
      };
      toUser: {
        firstName: string;
        lastName: string;
        cardNumber: string;
      };
      amount: number;
      message: string;
    };
    balanceAfter: number;
    transactionType: string;
    time: string;
  };
  seen: boolean;
};

type HistoryType = {
  _id: string;
  transactionType: string;
  time: string;
  amount: number;
  message: string;
  balanceAfter: number;
  transactionId: {
    message: string;
    amount: number;
  };
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
