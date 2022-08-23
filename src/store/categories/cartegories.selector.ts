import { createSelector } from 'reselect';
import { CategoriesState } from './categories.reducer';
import { CategoryMap } from './cartegories.types';

//Initial value of the reducer

const categoriesReducer = (state): CategoriesState => {
  return state.categories;
};

// memoize the categories - this function returns a cached state of the categories in the categories reducer
// it means as longs as the categoriesReducer doesnt change do not create a new categories array
const cachedCategories = createSelector(
  [categoriesReducer],
  (categoriesSlice) => {
    return categoriesSlice.categories;
  }
);

// this memoizes the reduce function since it returns a new value each time it is called
// as long as the categories does not change , do not run the reduce method
export const selectCategoriesMap = createSelector(
  [cachedCategories],
  (categories): CategoryMap => {
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap);
  }
);

export const selectCategoriesIsLoading = createSelector(
  [categoriesReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
