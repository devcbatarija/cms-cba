import { configureStore } from '@reduxjs/toolkit';
import testSlices from '../slices/testSlices';
import loginSlices from '../slices/auth.slices';
import userSlices from '../slices/userSlices';
import eventSlices from '../slices/eventSlices';


const store = configureStore({
  reducer: {
    test: testSlices,
    login:loginSlices,
    users:userSlices,
    events:eventSlices
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;
