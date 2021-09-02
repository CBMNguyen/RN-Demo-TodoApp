import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {deleteTodoItem, setTodo, updateTodoItem} from '../app/TodoSlice';
import TodoListItem from '../components/TodoListItem';
import screenName from './screenName';

export default function Todo({navigation}) {
  const dispatch = useDispatch();
  const {todo} = useSelector(state => state.todo);

  // Fetch data to AsyncStorage and save with Redux
  useEffect(() => {
    AsyncStorage.getItem('Task').then(data => {
      const todo = JSON.parse(data);
      dispatch(setTodo(todo));
    });
  }, [dispatch]);

  // Delete Todo item
  const deleteItem = async item => {
    const filterTodo = todo.filter(todoItem => item.id !== todoItem.id);
    await AsyncStorage.setItem('Task', JSON.stringify(filterTodo));
    dispatch(deleteTodoItem(item));
  };

  // Update Todo item
  const updateItem = async (item, value) => {
    const index = todo.findIndex(todoItem => todoItem.id === item.id);
    let todos = [...todo];
    todos[index] = {...todos[index], isCompleted: value};
    await AsyncStorage.setItem('Task', JSON.stringify(todos));
    dispatch(updateTodoItem(todos[index]));
  };
  return (
    <View style={styles.container}>
      {todo.length > 0 ? (
        <FlatList
          data={todo.filter(item => item.isCompleted === false)}
          renderItem={({item}) => (
            <TodoListItem
              item={item}
              updateItem={updateItem}
              deleteItem={deleteItem}
              navigation={navigation}
            />
          )}
          keyExtractor={item => +item.id}
        />
      ) : (
        // Render when not data
        <View style={styles.empty}>
          <Text style={styles.empty_text}>Nothing here</Text>
          <Text style={styles.empty_emoji}>😜</Text>
        </View>
      )}

      {/* Button add new todo item */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(screenName.Task)}>
        <FontAwesome5 name="plus" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    bottom: 10,

    width: 60,
    height: 60,
    backgroundColor: '#FF69B4',
    borderRadius: 30,
    elevation: 1,
  },

  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  empty_text: {
    fontSize: 40,
    color: '#ccc',
  },

  empty_emoji: {
    fontSize: 40,
  },
});
