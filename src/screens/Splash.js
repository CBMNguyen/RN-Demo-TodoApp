import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const Splash = ({navigation}) => {
  // 2s to My Task
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.replace('My Tasks');
    }, 2000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logoImage}
      />
      <Text style={styles.title}>To-Do App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logoImage: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 40,
    color: 'lightslategrey',
  },
});

export default Splash;
