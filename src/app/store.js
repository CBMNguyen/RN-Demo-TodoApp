import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import todoReducer from './TodoSlice';

const rootReducer = combineReducers({
  todo: todoReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
