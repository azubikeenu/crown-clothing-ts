import { call, takeLatest, all, put } from 'typed-redux-saga/macro';
import { USER_ACTIONS } from './user.types';
import {
  getCurrentUser,
  createUserDoc,
  signInWithGooglePopUp,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
  ObjectProperties,
} from '../../utils/firebase.utils';
import {
  signInFailure,
  signInSuccess,
  signupFailure,
  signUpSuccess,
  signOutSuccess,
  signOutFailure,
  EmailSignInAction,
  SignUpStartAction,
  SignUpSuccessAction,
} from './user.actions';
import { User } from 'firebase/auth';

function* getUserSnapShot(userAuth: User, userProperties?: ObjectProperties) {
  try {
    const userSnapShot = yield* call(createUserDoc, userAuth, userProperties);
    if (userSnapShot) {
      yield* put(
        signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() })
      );
    }
  } catch (error) {
    yield* put(signInFailure(error as Error));
  }
}

function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getUserSnapShot, userAuth);
  } catch (error) {
    yield* put(signInFailure(error as Error));
  }
}

function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopUp);
    yield* call(getUserSnapShot, user);
  } catch (error) {
    yield* put(signInFailure(error as Error));
  }
}

function* signInWithEmail({ payload }: EmailSignInAction) {
  const { email, password } = payload;
  try {
    const userCredentails = yield* call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    if (userCredentails) {
      const { user } = userCredentails;
      yield* call(getUserSnapShot, user);
    }
  } catch (error) {
    yield* put(signInFailure(error as Error));
  }
}

function* signUpStart({
  payload: { email, password, displayName },
}: SignUpStartAction) {
  try {
    const userCredentails = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    if (userCredentails) {
      const { user } = userCredentails;
      yield* put(signUpSuccess(user, { displayName }));
    }
  } catch (error) {
    yield* put(signupFailure(error as Error));
  }
}

function* logInAfterSignUp({
  payload: { user, objectProperties },
}: SignUpSuccessAction) {
  yield* call(getUserSnapShot, user, objectProperties);
}

function* signOutStart() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailure(error as Error));
  }
}

function* onSignInWithGoogle() {
  yield* takeLatest(USER_ACTIONS.GOOGLE_SIGN_IN, signInWithGoogle);
}

function* onSignInWithEmail() {
  yield* takeLatest(USER_ACTIONS.EMAIL_SIGN_IN, signInWithEmail);
}

function* onSignupStart() {
  yield* takeLatest(USER_ACTIONS.SIGN_UP_START, signUpStart);
}

function* onSignupSuccess() {
  yield* takeLatest(USER_ACTIONS.SIGN_UP_SUCCESS, logInAfterSignUp);
}

function* onCheckUserSession() {
  yield* takeLatest(USER_ACTIONS.CHECK_USER_SESSION, isUserAuthenticated);
}
function* onSignOutStart() {
  yield* takeLatest(USER_ACTIONS.SIGN_OUT_START, signOutStart);
}

export function* userSaga() {
  yield* all([
    call(onCheckUserSession),
    call(onSignInWithGoogle),
    call(onSignInWithEmail),
    call(onSignupStart),
    call(onSignupSuccess),
    call(onSignOutStart),
  ]);
}
