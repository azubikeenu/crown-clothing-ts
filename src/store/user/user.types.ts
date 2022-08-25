import { ObjectProperties } from '../../utils/firebase.utils';
import { User } from 'firebase/auth';

export enum USER_ACTIONS {
  SET_CURRENT_USER = 'user/SET_CURRENT_USER',
  CHECK_USER_SESSION = 'user/CHECK_USER_SESSION',
  EMAIL_SIGN_IN = 'user/EMAIL_SIGN_IN',
  GOOGLE_SIGN_IN = 'user/GOOGLE_SIGN_IN',
  SIGN_IN_SUCCESS = 'user/SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE = 'user/SIGN_IN_FAILURE',
  SIGN_UP_START = 'user/SIGN_UP_START',
  SIGN_UP_SUCCESS = 'user/SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE = 'user/SIGN_UP_FAILURE',
  SIGN_OUT_START = 'user/SIGN_OUT_START',
  SIGN_OUT_SUCCESS = 'user/SIGN_OUT_SUCCESS',
  SIGN_OUT_FAIURE = 'user/SIGN_OUT_FAILURE',
}

export type UserSignUp = {
  displayName: string;
  email: string;
  password: string;
};

export type UserSignUpSuccess = {
  user: User;
  objectProperties: ObjectProperties;
};
