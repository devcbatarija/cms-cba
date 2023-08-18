import { configureStore } from '@reduxjs/toolkit';
import testSlices from '../slices/testSlices';

const store = configureStore({
  reducer: {
    test: testSlices,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;
