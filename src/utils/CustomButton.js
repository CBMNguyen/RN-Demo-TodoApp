import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

export default function CustomButton({onPress, title, style}) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
      style={({pressed}) => [
        {backgroundColor: pressed ? 'pink' : 'deeppink', borderRadius: 10},
        styles.button,
        {...style},
      ]}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
});
