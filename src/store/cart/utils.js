/*Remove an item from the cart */
export const removeItemFromCart = (product, cartItems) =>
  cartItems.filter((item) => item.id !== product.id);

/*Decrement the cart Item count */
export const decrementProductCount = (product, cartItems) => {
  if (product.quantity === 1) return removeItemFromCart(product, cartItems);
  return cartItems.map((item) => {
    return item.id === product.id
      ? { ...item, quantity: product.quantity - 1 }
      : item;
  });
};
/*Add an item to the cart  */
export const addCartItem = (product, cartItems) => {
  const isProductExisting = cartItems.find((item) => item.id === product.id);
  if (isProductExisting) {
    return cartItems.map((item) => {
      return item.id === isProductExisting.id
        ? { ...item, quantity: isProductExisting.quantity + 1 }
        : item;
    });
  }
  return [...cartItems, { ...product, quantity: 1 }];
};
