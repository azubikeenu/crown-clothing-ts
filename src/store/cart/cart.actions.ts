import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from '../../utils/reducers/reducer.utils';
import { CartItem, CART_ACTIONS } from './carttypes';
import {
  addCartItem,
  decrementProductCount,
  removeItemFromCart,
} from './utils';

export type SetCartItemsAction = ActionWithPayload<
  CART_ACTIONS.SET_CART_ITEMS,
  CartItem[]
>;

export type SetIsCartOpenedAction = ActionWithPayload<
  CART_ACTIONS.SET_IS_CART_OPENED,
  boolean
>;

export const setCartItemsAction = withMatcher(
  (cartItems: CartItem[]): SetCartItemsAction =>
    createAction(CART_ACTIONS.SET_CART_ITEMS, cartItems)
);

export const setIsCartOpenedAction = withMatcher(
  (boolean: boolean): SetIsCartOpenedAction => {
    return createAction(CART_ACTIONS.SET_IS_CART_OPENED, boolean);
  }
);

export const addItemToCart = withMatcher(
  (itemToAdd: CartItem, cartItems: CartItem[]): SetCartItemsAction => {
    const newCartItems = addCartItem(itemToAdd, cartItems);
    return createAction(CART_ACTIONS.SET_CART_ITEMS, newCartItems);
  }
);

export const decrementCount = withMatcher(
  (product: CartItem, cartItems: CartItem[]): SetCartItemsAction => {
    const newCartItems = decrementProductCount(product, cartItems);
    return createAction(CART_ACTIONS.SET_CART_ITEMS, newCartItems);
  }
);

export const removeItem = withMatcher(
  (product: CartItem, cartItems: CartItem[]) => {
    const newCartItems = removeItemFromCart(product, cartItems);
    return createAction(CART_ACTIONS.SET_CART_ITEMS, newCartItems);
  }
);
