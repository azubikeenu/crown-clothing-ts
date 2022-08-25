import { all, call } from 'typed-redux-saga/macro';
import { categorySaga } from './categories/category.saga';
import { userSaga } from './user/user.saga';

// This encapsulates all the different saga
export function* rootSaga() {
  yield* all([call(categorySaga), call(userSaga)]);
}
