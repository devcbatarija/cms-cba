import { configureStore } from '@reduxjs/toolkit';
import testSlices from '../slices/testSlices';
import loginSlices from '../slices/auth.slices';
import userSlices from '../slices/userSlices';
import eventSlices from '../slices/eventSlices';
import publicationSlices from '../slices/publicationSlices';
import programSlices from '../slices/programSlices';
import podcastSlices from '../slices/podcastSlices';
import testimonioSlices from '../slices/testimonioSlices';
import gallerySlices from '../slices/gallerySlices';
import becaSlices from '../slices/becaSlices';
const store = configureStore({
  reducer: {
    test: testSlices,
    login:loginSlices,
    users:userSlices,
    events:eventSlices,
    publications: publicationSlices,
    programs: programSlices,
    podcasts:podcastSlices,
    testimonios:testimonioSlices,
    gallery: gallerySlices,
    becas: becaSlices,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;
