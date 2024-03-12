import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";
import LeaderBoardScreen from "../screens/LeaderBoardScreen";
import ArrowBackIcon from "../components/icons/ArrowBackIcon";
import AchievementsScreen from "../screens/AchievementsScreen";
import MyCardsScreen from "../screens/MyCardsScreen";
import MyTopicsScreen from "../screens/MyTopicsScreen";
import {Nunito_Semibold, Quicksand_Bold, Quicksand_Regular} from "../fonts";
import {Platform} from "react-native";
import MainScreen from "../screens/MainScreen";
import SubTopicScreen from "../screens/SubTopicScreen";
import {BACKGROUND, BLACK, MAIN_SECOND} from "../colors";
import CardsSubtopicScreen from "../screens/CardsSubtopicScreen";
import BackIcon from "../components/icons/BackIcon";
import Launch1Screen from "../screens/Onboarding/Launch1Screen";
import QuizCompletedScreen from "../screens/QuizCompletedScreen";

export type HomeStackParamList = {
    HomeScreen: undefined;
    MainScreen: undefined;
    SubTopicScreen: {
        topic_id: number,
        topic_name: string,
    };
    QuizCompletedScreen: {
        subtopic_id: number
    };
    LeaderBoardScreen: undefined;
    AchievementsScreen: undefined;
    MyCardsScreen: undefined;
    MyTopicsScreen: {
        topics: {
            id: number;
            title: string;
        }[];
    };
    CardsSubtopicScreen: {
        subtopic_id: number
    };
};

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MainScreen" component={MainScreen} options={{headerShown: false}}/>
            <Stack.Screen name="SubTopicScreen" component={SubTopicScreen}
                  options={{
                    headerBackTitleVisible: false,
                    headerTitleAlign: 'center',
                    headerBackImage: ({ tintColor }) => (
                        <BackIcon color={Platform.OS === 'ios' ? 'black': tintColor} size={100} style={{marginLeft: 5, marginTop: 5}} />
                    ),
                    headerTitleStyle: {
                        fontFamily: Quicksand_Bold,
                        fontSize: 28,
                    },
                      headerStyle: {
                          backgroundColor: MAIN_SECOND,
                          borderBottomStartRadius: 20,
                          borderBottomEndRadius: 20,
                    },
                      cardStyle: { backgroundColor: BACKGROUND },
                }}
            />
            <Stack.Screen name="CardsSubtopicScreen"
                          component={CardsSubtopicScreen}
                          options={{
                              headerBackTitleVisible: false,
                              headerTitleStyle: {
                                  fontFamily: Quicksand_Bold,
                                  fontSize: 28,
                              },
                              cardStyle: { backgroundColor: BACKGROUND },
                          }}
            />
            <Stack.Screen name="QuizCompletedScreen" component={QuizCompletedScreen} options={{headerShown: false}}/>
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
