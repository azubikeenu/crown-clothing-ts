import { CATEGORIES_ACTION, Category } from './cartegories.types';
import { createAction } from '../../utils/reducers/reducer.utils';
import {
  Action,
  ActionWithPayload,
  withMatcher,
} from '../../utils/reducers/reducer.utils';

export type FetchCategoriesStart =
  Action<CATEGORIES_ACTION.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<
  CATEGORIES_ACTION.FETCH_CATEGORIES_SUCCESS,
  Category[]
>;

export type FetchCategoriesFailed = ActionWithPayload<
  CATEGORIES_ACTION.FETCH_CATEGORIES_FAILED,
  Error
>;

export const fetchCategoriesStart = withMatcher(
  (): FetchCategoriesStart =>
    createAction(CATEGORIES_ACTION.FETCH_CATEGORIES_START)
);

export const fetchCategoriesSuccess = withMatcher(
  (payload: Category[]): FetchCategoriesSuccess =>
    createAction(CATEGORIES_ACTION.FETCH_CATEGORIES_SUCCESS, payload)
);

export const fetchCategoriesFailed = withMatcher(
  (error: Error): FetchCategoriesFailed =>
    createAction(CATEGORIES_ACTION.FETCH_CATEGORIES_FAILED, error)
);
