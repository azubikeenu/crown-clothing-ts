import { takeLatest, call, all, put } from 'redux-saga/effects';

import { getCategories } from '../../utils/firebase.utils';

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from './categories.action';
import { CATEGORIES_ACTION } from './cartegories.action.types';



export function* fetchCategoriesAsync() {
  try {
    // on success
    const categories = yield call(getCategories);
    yield put(fetchCategoriesSuccess(categories)); // this is an alternative for dispatch(fetchCategoriesAction)
  } catch (error) {
    // on error
   yield put(fetchCategoriesFailed(error));
  }
}



function* onFetchCategoriesStart() {
  // this is where we receive actions / take latest means if you hear a bunch of the same action , take the latest action
  yield takeLatest(
    CATEGORIES_ACTION.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}
export function* categorySaga() {
  yield all([call(onFetchCategoriesStart)]); // this waits until all the generator functions executes before it continues execution
}
