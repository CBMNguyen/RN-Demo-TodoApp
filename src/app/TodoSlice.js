import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  todo: [],
  color: '',
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodo: (state, action) => {
      state.todo = action.payload;
    },

    addNewTodoItem: (state, action) => {
      state.todo.push(action.payload);
    },

    updateTodoItem: (state, action) => {
      state.todo = state.todo.map(item =>
        item.id === action.payload.id
          ? {
              ...item,
              title: action.payload.title,
              description: action.payload.description,
              isCompleted: action.payload.isCompleted,
            }
          : item,
      );
    },

    deleteTodoItem: (state, action) => {
      state.todo = state.todo.filter(item => item.id !== action.payload.id);
    },
  },
});

const {reducer, actions} = todoSlice;
export const {setTodo, addNewTodoItem, updateTodoItem, deleteTodoItem} =
  actions;
export default reducer;
