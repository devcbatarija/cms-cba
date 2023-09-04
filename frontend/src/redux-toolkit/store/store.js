import { configureStore } from '@reduxjs/toolkit';
import testSlices from '../slices/testSlices';
import loginSlices from '../slices/auth.slices';
import userSlices from '../slices/userSlices';

const store = configureStore({
  reducer: {
    test: testSlices,
    login:loginSlices,
    users:userSlices
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;
