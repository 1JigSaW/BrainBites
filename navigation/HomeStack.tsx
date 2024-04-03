import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";
import LeaderBoardScreen from "../screens/LeaderBoardScreen";
import ArrowBackIcon from "../components/icons/ArrowBackIcon";
import AchievementsScreen from "../screens/AchievementsScreen";
import MyCardsScreen from "../screens/MyCardsScreen";
import MyTopicsScreen from "../screens/MyTopicsScreen";
import {Nunito_Semibold, Quicksand_Bold, Quicksand_Regular} from "../fonts";
import {Platform, Text, View} from "react-native";
import MainScreen from "../screens/MainScreen";
import SubTopicScreen from "../screens/SubTopicScreen";
import {BACKGROUND, BLACK, MAIN_SECOND, RED_SECOND} from "../colors";
import CardsSubtopicScreen from "../screens/CardsSubtopicScreen";
import BackIcon from "../components/icons/BackIcon";
import Launch1Screen from "../screens/Onboarding/Launch1Screen";
import QuizCompletedScreen from "../screens/QuizCompletedScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Brain2Icon from "../components/icons/Brain2Icon";
import HeartIcon from "../components/icons/HeartIcon";
import Brain2IconSmall from "../components/icons/Brain2IconSmall";

export type HomeStackParamList = {
    HomeScreen: undefined;
    MainScreen: {
        open?: boolean;
    };
    SubTopicScreen: {
        topic_id: number,
        topic_name: string,
    };
    QuizCompletedScreen: {
        subtopic_id: number,
        correct_answers: number,
        quiz_length: number,
        topic_id: number,
        topic_name: string,
        correctAnswerIds: number[],
        swipedCardIds: number[],
    };
    LeaderBoardScreen: undefined;
    AchievementsScreen: undefined;
    ProfileScreen: undefined;
    MyCardsScreen: undefined;
    MyTopicsScreen: {
        topics: {
            id: number;
            title: string;
        }[];
    };
    CardsSubtopicScreen: {
        subtopic_id: number,
        topic_id: number,
        topic_name: string,
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
                          borderBottomStartRadius: 15,
                          borderBottomEndRadius: 15,
                          elevation: 0,
                    },
                      cardStyle: { backgroundColor: BACKGROUND },

                      headerRight: () => (
                    <View style={{ alignItems: 'flex-end', marginRight: 10 }}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Brain2Icon size={100} color={BLACK} style={{marginRight: 10, marginTop: 0, transform: [{ scale: 0.6 }]}}/>
                            <Text style={{ color: BLACK, fontSize: 16, fontFamily: Quicksand_Regular, marginTop: -2 }}>10</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: -5}}>
                            <HeartIcon size={100} color={RED_SECOND} style={{marginRight: 10, marginTop: 0, transform: [{ scale: 0.6 }]}} />
                            <Text style={{ color: BLACK, fontSize: 16, fontFamily: Quicksand_Regular, marginTop: -2 }}>10</Text>
                        </View>
                    </View>
                    ),
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
                        <BackIcon color={Platform.OS === 'ios' ? 'black': tintColor} size={100} style={{marginLeft: 5, marginTop: 5}} />
                    ),
                    headerTitleStyle: {
                        fontFamily: Quicksand_Bold,
                        fontSize: 28,
                    },
                      headerStyle: {
                          backgroundColor: MAIN_SECOND,
                          borderBottomStartRadius: 15,
                          borderBottomEndRadius: 15,
                    },
                      cardStyle: { backgroundColor: BACKGROUND },
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
                        <BackIcon color={Platform.OS === 'ios' ? 'black': tintColor} size={100} style={{marginLeft: 5, marginTop: 5}} />
                    ),
                    headerTitleStyle: {
                        fontFamily: Quicksand_Bold,
                        fontSize: 28,
                    },
                      headerStyle: {
                          backgroundColor: MAIN_SECOND,
                          borderBottomStartRadius: 15,
                          borderBottomEndRadius: 15,
                    },
                      cardStyle: { backgroundColor: BACKGROUND },
                }}

            />
            <Stack.Screen name="ProfileScreen"
                          component={ProfileScreen}
                          options={{
                                headerBackTitleVisible: false,
                                headerTitle: 'Account',
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
                                      borderBottomStartRadius: 15,
                                      borderBottomEndRadius: 15,
                                },
                              cardStyle: { backgroundColor: BACKGROUND}
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
