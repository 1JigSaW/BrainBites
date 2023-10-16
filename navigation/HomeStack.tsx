import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";

export type HomeStackParamList = {
    HomeScreen: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};

export default HomeStack;
