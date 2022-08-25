import { createSelector } from 'reselect';
import { CartState } from './cart.reducer';
import { RootState } from '../store';

const selectCartReducer = (state: RootState): CartState => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cartSlice) => {
    return cartSlice.cartItems;
  }
);

export const selectIsCartOpened = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.isCartOpened
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (newCartItems) =>
    newCartItems.reduce((total, item) => total + item.price * item.quantity, 0)
);

export const selectCartCount = createSelector(
  [selectCartItems],
  (newCartItems) =>
    newCartItems.reduce((total, item) => total + item.quantity, 0)
);
