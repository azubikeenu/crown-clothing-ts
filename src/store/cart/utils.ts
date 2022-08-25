/*Remove an item from the cart */
import { CategoryItem } from '../categories/cartegories.types';
import { CartItem } from './carttypes';

export const removeItemFromCart = (
  product: CategoryItem,
  cartItems: CartItem[]
): CartItem[] => cartItems.filter((item) => item.id !== product.id);

/*Decrement the cart Item count */
export const decrementProductCount = (
  product: CartItem,
  cartItems: CartItem[]
): CartItem[] => {
  if (product.quantity === 1) return removeItemFromCart(product, cartItems);
  return cartItems.map((item) => {
    return item.id === product.id
      ? { ...item, quantity: product.quantity - 1 }
      : item;
  });
};
/*Add an item to the cart  */
export const addCartItem = (
  product: CategoryItem,
  cartItems: CartItem[]
): CartItem[] => {
  const isProductExisting =
    cartItems && cartItems.find((item) => item.id === product.id);
  if (isProductExisting) {
    return cartItems.map((item) => {
      return item.id === isProductExisting.id
        ? { ...item, quantity: isProductExisting.quantity + 1 }
        : item;
    });
  }
  return [...cartItems, { ...product, quantity: 1 }];
};
