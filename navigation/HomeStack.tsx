import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";
import LeaderBoardScreen from "../screens/LeaderBoardScreen";
import ArrowBackIcon from "../components/icons/ArrowBackIcon";
import AchievementsScreen from "../screens/AchievementsScreen";

export type HomeStackParamList = {
    HomeScreen: undefined;
    LeaderBoardScreen: undefined;
    AchievementsScreen: undefined;
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
                        <ArrowBackIcon color={tintColor} size={25} style={{marginLeft: 10, marginTop: 5}} />
                    ),
                    headerTitleStyle: {
                        fontFamily: 'Abel',
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
                        <ArrowBackIcon color={tintColor} size={25} style={{marginLeft: 10, marginTop: 5}} />
                    ),
                    headerTitleStyle: {
                        fontFamily: 'Abel',
                        fontSize: 28,
                    },
                }}

            />
        </Stack.Navigator>
    );
};

export default HomeStack;
