export const logger = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }
  console.log('initial state', store.getState());
  console.log('payload', action.payload);
  console.log('type', action.type);
  next(action);
  console.log('next state', store.getState());
  console.log('payload', action.payload);
  console.log('type', action.type);
};
