import { User } from 'firebase/auth';
import { ObjectProperties, UserData } from '../../utils/firebase.utils';
import {
  ActionWithPayload,
  createAction,
  withMatcher,
  Action,
} from '../../utils/reducers/reducer.utils';

import { UserSignUpSuccess, USER_ACTIONS } from './user.types';

import { UserSignUp } from './user.types';

export type SetCurrentUserAction = ActionWithPayload<
  USER_ACTIONS.SET_CURRENT_USER,
  UserData
>;

export type CheckUserSessionAction = Action<USER_ACTIONS.CHECK_USER_SESSION>;

export type GoogleSignInAction = Action<USER_ACTIONS.GOOGLE_SIGN_IN>;

export type EmailSignInCredentials = {
  email: string;
  password: string;
};

export type EmailSignInAction = ActionWithPayload<
  USER_ACTIONS.EMAIL_SIGN_IN,
  EmailSignInCredentials
>;

export type SignInSuccessAction = ActionWithPayload<
  USER_ACTIONS.SIGN_IN_SUCCESS,
  UserData
>;

export type SignInFailureAction = ActionWithPayload<
  USER_ACTIONS.SIGN_IN_FAILURE,
  Error
>;

export type SignUpStartAction = ActionWithPayload<
  USER_ACTIONS.SIGN_UP_START,
  UserSignUp
>;

export type SignUpSuccessAction = ActionWithPayload<
  USER_ACTIONS.SIGN_UP_SUCCESS,
  UserSignUpSuccess
>;

export type SignUpFailureAction = ActionWithPayload<
  USER_ACTIONS.SIGN_UP_FAILURE,
  Error
>;

export type SignOutStartAction = Action<USER_ACTIONS.SIGN_OUT_START>;

export type SignOutSuccessAction = Action<USER_ACTIONS.SIGN_OUT_SUCCESS>;

export type SignOutFailureAction = ActionWithPayload<
  USER_ACTIONS.SIGN_OUT_FAIURE,
  Error
>;

export const setCurrentUser = withMatcher(
  (user: UserData): SetCurrentUserAction =>
    createAction(USER_ACTIONS.SET_CURRENT_USER, user)
);

export const checkUserSession = withMatcher(
  (): CheckUserSessionAction => createAction(USER_ACTIONS.CHECK_USER_SESSION)
);

export const googleSignIn = withMatcher(
  (): GoogleSignInAction => createAction(USER_ACTIONS.GOOGLE_SIGN_IN)
);

export const emailSignIn = withMatcher(
  (email: string, password: string): EmailSignInAction =>
    createAction(USER_ACTIONS.EMAIL_SIGN_IN, {
      email,
      password,
    })
);

export const signInSuccess = withMatcher(
  (user: UserData & { id: string }): SignInSuccessAction => {
    return createAction(USER_ACTIONS.SIGN_IN_SUCCESS, user);
  }
);

export const signInFailure = withMatcher(
  (error: Error): SignInFailureAction =>
    createAction(USER_ACTIONS.SIGN_IN_FAILURE, error)
);

export const signupStart = withMatcher(
  (email: string, password: string, displayName: string): SignUpStartAction =>
    createAction(USER_ACTIONS.SIGN_UP_START, {
      email,
      password,
      displayName,
    })
);

export const signUpSuccess = withMatcher(
  (user: User, objectProperties: ObjectProperties): SignUpSuccessAction =>
    createAction(USER_ACTIONS.SIGN_UP_SUCCESS, {
      user,
      objectProperties,
    })
);

export const signupFailure = withMatcher(
  (error: Error): SignUpFailureAction =>
    createAction(USER_ACTIONS.SIGN_UP_FAILURE, error)
);

export const signOutStart = withMatcher(
  (): SignOutStartAction => createAction(USER_ACTIONS.SIGN_OUT_START)
);

export const signOutSuccess = withMatcher(
  (): SignOutSuccessAction => createAction(USER_ACTIONS.SIGN_OUT_SUCCESS)
);

export const signOutFailure = withMatcher(
  (error: Error): SignOutFailureAction =>
    createAction(USER_ACTIONS.SIGN_OUT_FAIURE, error)
);
