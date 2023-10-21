import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CardsScreen from "../screens/CardScreen";


export type CardsStackParamList = {
    CardsScreen: undefined;
};

const Stack = createStackNavigator<CardsStackParamList>();

const CardsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="CardsScreen" component={CardsScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};

export default CardsStack;
