import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";
import LeaderBoardScreen from "../screens/LeaderBoardScreen";

export type HomeStackParamList = {
    HomeScreen: undefined;
    LeaderBoardScreen: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name="LeaderBoardScreen" component={LeaderBoardScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};

export default HomeStack;
