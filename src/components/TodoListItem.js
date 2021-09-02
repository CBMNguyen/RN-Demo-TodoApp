import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function TodoListItem({
  item,
  updateItem,
  deleteItem,
  navigation,
}) {
  return (
    <View>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Task', item)}>
        <View style={styles.item_row}>
          {/* Side left color */}
          <View style={[{backgroundColor: item.color}, styles.side_color]} />

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

      <View style={{alignItems: 'flex-end'}}>
        <Text style={styles.date}>
          {moment(JSON.parse(item.updatedAt)).fromNow()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  side_color: {
    width: 20,
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
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
    elevation: 5,
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
  date: {
    marginRight: 25,
    marginTop: 4,
    fontSize: 12,
    color: '#888',
  },
});
