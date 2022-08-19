import { all, call } from 'redux-saga/effects';
import { categorySaga } from './categories/category.saga';
import { userSaga } from './user/user.saga';

// This encapsulates all the different saga
export function* rootSaga() {
  yield all([call(categorySaga), call(userSaga)]);
}
