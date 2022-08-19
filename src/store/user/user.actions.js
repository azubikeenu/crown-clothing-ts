import { createAction } from '../../utils/reducers/reducer.utils';
import { USER_ACTIONS } from './user.actions.types';

export const setCurrentUser = (user) =>
  createAction(USER_ACTIONS.SET_CURRENT_USER, user);

export const checkUserSession = () =>
  createAction(USER_ACTIONS.CHECK_USER_SESSION);
export const googleSignIn = () => createAction(USER_ACTIONS.GOOGLE_SIGN_IN);
export const emailSignIn = (email, password) =>
  createAction(USER_ACTIONS.EMAIL_SIGN_IN, { email, password });
export const signInSuccess = (userAuth) =>
  createAction(USER_ACTIONS.SIGN_IN_SUCCESS, userAuth);
export const signInFailure = (error) =>
  createAction(USER_ACTIONS.SIGN_IN_FAILURE, error);

export const signupStart = (email, password, displayName) =>
  createAction(USER_ACTIONS.SIGN_UP_START, { email, password, displayName });

export const signUpSuccess = (userAuth , objectProperties) =>
  createAction(USER_ACTIONS.SIGN_UP_SUCCESS, {userAuth , objectProperties});

export const signupFailure = (error) =>
  createAction(USER_ACTIONS.SIGN_IN_FAILURE, error);

export const signOutStart = ()=> createAction(USER_ACTIONS.SIGN_OUT_START)
export const signOutSuccess = ()=> createAction(USER_ACTIONS.SIGN_OUT_SUCCESS)
export const signOutFailure = (error)=> createAction(USER_ACTIONS.SIGN_OUT_FAIURE , error)
