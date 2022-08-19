import { call, takeLatest, all, put } from 'redux-saga/effects';
import { USER_ACTIONS } from './user.actions.types';
import {
  getCurrentUser,
  createUserDoc,
  signInWithGooglePopUp,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from '../../utils/firebase.utils';
import {
  signInFailure,
  signInSuccess,
  signupFailure,
  signUpSuccess,
  signOutSuccess,
  signOutFailure,
} from './user.actions';

function* getUserSnapShot(userAuth, userProperties) {
  try {
    const userSnapShot = yield call(createUserDoc, userAuth, userProperties);
    if (userSnapShot)
      yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}
function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getUserSnapShot, userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopUp);
    yield call(getUserSnapShot, user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getUserSnapShot, user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}


function* signUpStart({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(signupFailure(error));
  }
}


function* logInAfterSignUp({ payload: { userAuth, objectProperties } }) {
  yield call(getUserSnapShot, userAuth, objectProperties);
}

function* signOutStart() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

function* onSignInWithGoogle() {
  yield takeLatest(USER_ACTIONS.GOOGLE_SIGN_IN, signInWithGoogle);
}

function* onSignInWithEmail() {
  yield takeLatest(USER_ACTIONS.EMAIL_SIGN_IN, signInWithEmail);
}

function* onSignupStart() {
  yield takeLatest(USER_ACTIONS.SIGN_UP_START, signUpStart);
}

function* onSignupSuccess() {
  yield takeLatest(USER_ACTIONS.SIGN_UP_SUCCESS, logInAfterSignUp);
}

function* onCheckUserSession() {
  yield takeLatest(USER_ACTIONS.CHECK_USER_SESSION, isUserAuthenticated);
}
function* onSignOutStart() {
  yield takeLatest(USER_ACTIONS.SIGN_OUT_START, signOutStart);
}

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onSignInWithGoogle),
    call(onSignInWithEmail),
    call(onSignupStart),
    call(onSignupSuccess),
    call(onSignOutStart),
  ]);
}
