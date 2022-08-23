import { AnyAction } from 'redux';
import {
  signInSuccess,
  signInFailure,
  signupStart,
  signUpSuccess,
  signupFailure,
  signOutSuccess,
  signOutFailure,
} from './user.actions';
import { UserData } from '../../utils/firebase.utils';

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};
const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (
  state = INITIAL_STATE,
  action: AnyAction
): UserState => {
  if (signInSuccess.match(action.type)) {
    return { ...state, currentUser: action.payload };
  }

  if (signupStart.match(action.type)) {
    return { ...state, isLoading: true };
  }
  if (signUpSuccess.match(action.type)) {
    return { ...state, currentUser: action.payload, isLoading: false };
  }
  if (signOutSuccess.match(action.type)) {
    return { ...state, currentUser: null };
  }
  if (
    signupFailure.match(action.type) ||
    signInFailure.match(action.type) ||
    signOutFailure.match(action.type)
  ) {
    return { ...state, error: action.payload };
  }

  return state;
};
