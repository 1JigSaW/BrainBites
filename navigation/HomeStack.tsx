import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";
import LeaderBoardScreen from "../screens/LeaderBoardScreen";
import ArrowBackIcon from "../components/icons/ArrowBackIcon";
import AchievementsScreen from "../screens/AchievementsScreen";
import MyCardsScreen from "../screens/MyCardsScreen";
import MyTopicsScreen from "../screens/MyTopicsScreen";
import {Nunito_Semibold} from "../fonts";
import {Platform} from "react-native";

export type HomeStackParamList = {
    HomeScreen: undefined;
    LeaderBoardScreen: undefined;
    AchievementsScreen: undefined;
    MyCardsScreen: undefined;
    MyTopicsScreen: {
        topics: {
            id: number;
            title: string;
        }[];
    };
};

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen
                name="LeaderBoardScreen"
                component={LeaderBoardScreen}
                options={{
                    headerBackTitleVisible: false,
                    headerTitle: 'Leaderboard',
                    headerTitleAlign: 'center',
                    headerBackImage: ({ tintColor }) => (
                        <ArrowBackIcon color={Platform.OS === 'ios' ? 'black': tintColor} size={25} style={{marginLeft: 10, marginTop: 5}} />
                    ),
                    headerTitleStyle: {
                        fontFamily: Nunito_Semibold,
                        fontSize: 28,
                    },
                }}

            />
            <Stack.Screen
                name="AchievementsScreen"
                component={AchievementsScreen}
                options={{
                    headerBackTitleVisible: false,
                    headerTitle: 'Achievements',
                    headerTitleAlign: 'center',
                    headerBackImage: ({ tintColor }) => (
                        <ArrowBackIcon color={Platform.OS === 'ios' ? 'black': tintColor} size={25} style={{marginLeft: 10, marginTop: 5}} />
                    ),
                    headerTitleStyle: {
                        fontFamily: Nunito_Semibold,
                        fontSize: 28,
                    },
                }}

            />
            <Stack.Screen
                name="MyCardsScreen"
                component={MyCardsScreen}
                options={{
                    headerBackTitleVisible: false,
                    headerTitle: 'My Cards',
                    headerTitleAlign: 'center',
                    headerBackImage: ({ tintColor }) => (
                        <ArrowBackIcon color={Platform.OS === 'ios' ? 'black': tintColor} size={25} style={{marginLeft: 10, marginTop: 5}} />
                    ),
                    headerTitleStyle: {
                        fontFamily: Nunito_Semibold,
                        fontSize: 28,
                    },
                }}

            />
            <Stack.Screen
                name="MyTopicsScreen"
                component={MyTopicsScreen}
                options={{
                    headerBackTitleVisible: false,
                    headerTitle: 'My Topics',
                    headerTitleAlign: 'center',
                    headerBackImage: ({ tintColor }) => (
                        <ArrowBackIcon color={Platform.OS === 'ios' ? 'black': tintColor} size={25} style={{marginLeft: 10, marginTop: 5}} />
                    ),
                    headerTitleStyle: {
                        fontFamily: Nunito_Semibold,
                        fontSize: 28,
                    },
                }}

            />
        </Stack.Navigator>
    );
};

export default HomeStack;
