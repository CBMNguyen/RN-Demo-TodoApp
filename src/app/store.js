import {
  configureStore,
  createSerializableStateInvariantMiddleware,
  isPlain,
} from '@reduxjs/toolkit';
import {Iterable} from 'immutable';
import {combineReducers} from 'redux';
import todoReducer from './TodoSlice';

const isSerializable = value => Iterable.isIterable(value) || isPlain(value);

const getEntries = value =>
  Iterable.isIterable(value) ? value.entries() : Object.entries(value);

const serializableMiddleware = createSerializableStateInvariantMiddleware({
  isSerializable,
  getEntries,
});

const rootReducer = combineReducers({
  todo: todoReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [serializableMiddleware],
});

export default store;
