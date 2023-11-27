import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CardsScreen from "../screens/CardScreen";
import CardTopicScreen from "../screens/CardTopicScreen";


export type CardsStackParamList = {
    CardsScreen: undefined;
    QuizScreen: undefined;
    CardTopicScreen: undefined;
};

const Stack = createStackNavigator<CardsStackParamList>();

const CardsStack = () => {
    return (
        <Stack.Navigator>
            {/*<Stack.Screen name="CardsScreen" component={CardsScreen} options={{headerShown: false}}/>*/}
            <Stack.Screen name="CardTopicScreen" component={CardTopicScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};

export default CardsStack;
