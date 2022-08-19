import { useEffect } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import Home from './components/routes/home/home.component';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/routes/navigation/navigation.component';
import Authentication from './components/routes/authentication/authentication.component';
import Shop from './components/routes/shop/shop.component';
// import {
//   onAuthStateChangedListener,
//   createUserDoc,
//   getCurrentUser,
// } from './utils/firebase.utils';
import Checkout from './components/routes/checkout/checkout.component';
// import { setCurrentUser } from './store/user/user.actions';
import { checkUserSession } from './store/user/user.actions';

const App = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChangedListener(async (user) => {
  //     if (user) {
  //       await createUserDoc(user);
  //     }
  //     // this dispatches actions to the root reducer which in turns passes the actions to every single reducer dispatch function
  //     dispatch(setCurrentUser(user));
  //   });
  //   return unsubscribe;
  // }, [dispatch]);

  useEffect(() => {
    dispatch(checkUserSession());
  });
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
