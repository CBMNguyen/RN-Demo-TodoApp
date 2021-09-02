import React, {useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../utils/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addNewTodoItem, updateTodoItem} from '../app/TodoSlice';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Task({navigation, route}) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#fff');
  const {todo} = useSelector(state => state.todo);

  useEffect(() => {
    if (route.params) {
      setTitle(route.params.title);
      setDescription(route.params.description);
      setColor(route.params.color);
    }
  }, []);

  const addTodoItem = async () => {
    const date = JSON.stringify(new Date());

    if (title.length === 0 || !title.trim()) {
      Alert.alert('Warning', 'Please enter title 😡 !');
    } else {
      try {
        const todoItem = {
          id: route.params
            ? route.params.id
            : Math.trunc(Math.random() * 1000).toString(),
          title,
          description,
          isCompleted: route.params ? route.params.isCompleted : false,
          color,
          createdAt: route.params ? route.params.createdAt : date,
          updatedAt: date,
        };

        let newTodo = [];

        if (route.params) {
          const index = todo.findIndex(item => item.id === route.params.id);
          if (index < 0) return;

          newTodo = [...todo];
          newTodo[index] = todoItem;
        } else {
          newTodo = [...todo, todoItem];
        }

        await AsyncStorage.setItem('Task', JSON.stringify(newTodo));

        if (route.params) {
          dispatch(updateTodoItem(todoItem));
        } else {
          dispatch(addNewTodoItem(todoItem));
        }

        navigation.goBack();
      } catch (error) {}
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={value => setTitle(value)}
        returnKeyType="next"
        returnKeyLabel="Next"
        placeholder="Title"
      />

      <TextInput
        style={styles.input}
        value={description}
        onChangeText={value => setDescription(value)}
        returnKeyType="done"
        returnKeyLabel="Done"
        placeholder="Description"
        multiline
      />

      <View style={styles.color_bar}>
        <TouchableOpacity style={styles.white} onPress={() => setColor('#fff')}>
          {color === '#fff' && (
            <FontAwesome5 name="check" size={25} color="#000" />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.red} onPress={() => setColor('#f005')}>
          {color === '#f005' && (
            <FontAwesome5 name="check" size={25} color="#000" />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.blue} onPress={() => setColor('#00f5')}>
          {color === '#00f5' && (
            <FontAwesome5 name="check" size={25} color="#000" />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.green} onPress={() => setColor('#0f0')}>
          {color === '#0f0' && (
            <FontAwesome5 name="check" size={25} color="#000" />
          )}
        </TouchableOpacity>
      </View>

      <CustomButton
        onPress={addTodoItem}
        style={{width: '100%', marginTop: 5}}
        title="Save Task"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
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
  color_bar: {
    flexDirection: 'row',
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#555',
    marginVertical: 10,
  },

  white: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  red: {
    flex: 1,
    backgroundColor: '#f005',
    justifyContent: 'center',
    alignItems: 'center',
  },

  blue: {
    flex: 1,
    backgroundColor: '#00f5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  green: {
    flex: 1,
    backgroundColor: '#0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});
