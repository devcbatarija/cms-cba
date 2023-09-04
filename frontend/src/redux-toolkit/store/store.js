import { configureStore } from '@reduxjs/toolkit';
import testSlices from '../slices/testSlices';
import loginSlices from '../slices/auth.slices';
import eventSlices from '../slices/eventSlices';


const store = configureStore({
  reducer: {
    test: testSlices,
    login:loginSlices,
    events:eventSlices
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;
