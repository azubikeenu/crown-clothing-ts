import { Outlet } from 'react-router-dom';
import { Fragment } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';

import { ReactComponent as Logo } from '../../../assets/crown.svg';
import CartIcon from '../../cart-icon/cart-icon.component';
import CartDropdown from '../../cart-dropdown/cartdropdown.component';

import { selectIsCartOpened } from '../../../store/cart/cart.selector';

// import { UserContext } from '../../../contexts/user.context';
// import { CartContext } from '../../../contexts/cart.context';
// import { signOutUser } from '../../../utils/firebase.utils';

import { selectCurrentUser } from '../../../store/user/user.selector';
import { signOutStart } from '../../../store/user/user.actions';

import {
  NavigationContainer,
  LogoContainer,
  NavLink,
  NavLinksContainer,
} from './navigation.styles';

const Navigation = () => {
  // whenever a value inside the UseContext(currentUser) updates , the component is re-rendered
  // const { currentUser } = useContext(UserContext);
  // this allows us to interact from a component with the redux store
  const currentUser = useSelector(selectCurrentUser);

  const isCartOpened = useSelector(selectIsCartOpened);
  const dispatch = useDispatch();

  const signOutHandler = () => dispatch(signOutStart());

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <Logo className="logo" />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutHandler}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinksContainer>
        {isCartOpened && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
