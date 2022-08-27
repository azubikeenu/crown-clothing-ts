import { useDispatch, useSelector } from 'react-redux';
import {
  removeItem,
  decrementCount,
  addItemToCart,
} from '../../store/cart/cart.actions';
import { selectCartItems } from '../../store/cart/cart.selector';

import {
  CheckoutItemContainer,
  BaseSpan,
  Arrow,
  ImageContainer,
  Quantity,
  RemoveButton,
  Value,
} from './checkout-item.styles';

const CheckoutItem = ({ cartItem }) => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const IncrementQuantityHandler = () =>
    dispatch(addItemToCart(cartItem, cartItems));

  const decrementQuantityHandler = () =>
    dispatch(decrementCount(cartItem, cartItems));

  const removeItemHandler = () => dispatch(removeItem(cartItem, cartItems));
  const { imageUrl, name, price, quantity } = cartItem;
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={decrementQuantityHandler}>&#10094;</Arrow>
        <Value> {quantity}</Value>
        <Arrow onClick={IncrementQuantityHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
      <RemoveButton onClick={removeItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
