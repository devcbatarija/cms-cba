import { configureStore } from '@reduxjs/toolkit';
import testSlices from '../slices/testSlices';
import loginSlices from '../slices/auth.slices';


const store = configureStore({
  reducer: {
    test: testSlices,
    login:loginSlices
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;
