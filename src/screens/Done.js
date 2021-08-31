import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {deleteTodoItem, setTodo, updateTodoItem} from '../app/TodoSlice';
import screenName from './screenName';

export default function Done({navigation}) {
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
          data={todo.filter(item => item.isCompleted === true)}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate('Task', item)}>
              <View style={styles.item_row}>
                {/* Side left color */}
                <View
                  style={[{backgroundColor: item.color}, styles.side_color]}
                />

                {/* Check box */}
                <CheckBox
                  style={styles.checkbox_button}
                  value={item.isCompleted}
                  onValueChange={value => updateItem(item, value)}
                />

                {/* Content */}
                <View style={styles.item_body}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>

                {/* Button delete todo item */}
                <TouchableOpacity
                  style={styles.delete_button}
                  onPress={() => deleteItem(item)}>
                  <FontAwesome5 name="trash" size={25} color="#f00" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
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
  },

  side_color: {
    width: 20,
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  input: {
    width: '100%',
    margin: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#555',

    fontSize: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },

  item_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  item_body: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 0,
  },

  checkbox_button: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  delete_button: {
    width: 30,
    height: 30,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  item: {
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },

  title: {
    fontFamily: 'DancingScript',
    fontSize: 35,
  },

  description: {
    fontFamily: 'DancingScript',
    fontSize: 20,
    color: '#999',
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    bottom: 10,

    width: 60,
    height: 60,
    backgroundColor: '#0080ff',
    borderRadius: 30,
    elevation: 1,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  empty_text: {
    fontSize: 45,
    color: '#ccc',
  },

  empty_emoji: {
    fontSize: 50,
  },
});
