// import { useContext } from 'react';
// import { CartContext } from '../../contexts/cart.context';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeItem,
  decrementCount,
  addItemToCart,
} from '../../store/cart/cart.actions';
import { selectCartItems } from '../../store/cart/cart.selector';
import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
  // const { addItemToCart, removeItem, decrementCount } = useContext(CartContext);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const IncrementQuantityHandler = () =>
    dispatch(addItemToCart(cartItem, cartItems));
  const decrementQuantityHandler = () =>
    dispatch(decrementCount(cartItem, cartItems));

  const removeItemHandler = () => dispatch(removeItem(cartItem, cartItems));
  const { imageUrl, name, price, quantity } = cartItem;
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={decrementQuantityHandler}>
          &#10094;
        </div>
        <span className="value"> {quantity}</span>
        <div className="arrow" onClick={IncrementQuantityHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={removeItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
