import { CATEGORIES_ACTION } from './cartegories.action.types';
import { createAction } from '../../utils/reducers/reducer.utils';
import { getCategories } from '../../utils/firebase.utils';


// export const setCategoriesMap = (payload) =>
//   createAction(CATEGORIES_ACTION.SET_CATEGORIES, payload);

// Now uses redux thunk
export const fetchCategoriesStart = () =>
  createAction(CATEGORIES_ACTION.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (payload) =>
  createAction(CATEGORIES_ACTION.FETCH_CATEGORIES_SUCCESS, payload);

export const fetchCategoriesFailed = (error) =>
  createAction(CATEGORIES_ACTION.FETCH_CATEGORIES_FAILED, error);



export const fetchCategoriesAsync = () => async (dispatch) => {
  // initial state
  dispatch(fetchCategoriesStart());
  try {
    // on success
    const categories = await getCategories();
    dispatch(fetchCategoriesSuccess(categories));
  } catch (error) {
    // on error
    dispatch(fetchCategoriesFailed(error));
  }
};
