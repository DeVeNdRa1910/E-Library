import { configureStore } from '@reduxjs/toolkit';
import bookSlice from './store/features/books/bookSlice';


//Dont do this in nextjs we have creat store on per request
/* const store = configureStore({
  reducer: {
    books: bookSlice,
  },
}); */

function createStore(){
  return configureStore({
    reducer: {
      books: bookSlice,
    },
  });
} 

export type AppStore = ReturnType<typeof createStore>
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export default createStore;
