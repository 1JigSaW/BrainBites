import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  return (
      <NavigationContainer>
        <Tab.Navigator>
          {/*<Tab.Screen name="Home" />*/}
          {/*<Tab.Screen name="Settings" />*/}
        </Tab.Navigator>
      </NavigationContainer>
  );
}

export default App;
