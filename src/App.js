import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Provider} from 'react-redux';
import store from './app/store';
import Done from './screens/Done';
import screenName from './screens/screenName';
import Splash from './screens/Splash';
import Task from './screens/Task';
import Todo from './screens/Todo';

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTab = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarIcon: ({focused, size, color}) => {
        let iconName;

        if (route.name === screenName.Todo) {
          iconName = 'clipboard-list';
          size = focused ? 30 : 25;
        }

        if (route.name === screenName.Done) {
          iconName = 'clipboard-check';
          size = focused ? 30 : 25;
        }
        return <FontAwesome5 name={iconName} size={size} color={color} />;
      },
      tabBarLabelStyle: {
        fontSize: 15,
        fontWeight: 'bold',
      },
      tabBarStyle: {height: 55},
      tabBarActiveBackgroundColor: '#FF69B4',
      tabBarActiveTintColor: '#fff',
    })}>
    <Tab.Screen name={screenName.Todo} component={Todo} />
    <Tab.Screen name={screenName.Done} component={Done} />
  </Tab.Navigator>
);

function App(props) {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName={screenName.Splash}
          screenOptions={{
            headerStyle: {
              backgroundColor: '#FF69B4',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}>
          <RootStack.Screen
            options={{headerShown: false}}
            name={screenName.Splash}
            component={Splash}
          />
          <RootStack.Screen name={screenName.Task} component={Task} />
          <RootStack.Screen name="My Tasks" component={HomeTab} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
