import { configureStore } from '@reduxjs/toolkit';
import testSlices from '../slices/testSlices';
import loginSlices from '../slices/auth.slices';
import userSlices from '../slices/userSlices';
import eventSlices from '../slices/eventSlices';
import publicationSlices from '../slices/publicationSlices';
import programSlices from '../slices/programSlices';

const store = configureStore({
  reducer: {
    test: testSlices,
    login:loginSlices,
    users:userSlices,
    events:eventSlices,
    publications: publicationSlices,
    program: programSlices
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;
