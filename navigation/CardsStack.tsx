import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CardsScreen from "../screens/CardScreen";
import CardTopicScreen from "../screens/CardTopicScreen";
import SubTopicScreen from "../screens/SubTopicScreen";
import ArrowBackIcon from "../components/icons/ArrowBackIcon";
import CardsSubtopicScreen from "../screens/CardsSubtopicScreen";
import {Nunito_Semibold} from "../fonts";
import {Platform} from "react-native";


export type CardsStackParamList = {
    CardsScreen: undefined;
    QuizScreen: undefined;
    CardTopicScreen: undefined;
    SubTopicScreen: {
        topic_id: number,
        topic_name: string,
    };
    CardsSubtopicScreen: {
        subtopic_id: number
    };
};

const Stack = createStackNavigator<CardsStackParamList>();

const CardsStack = () => {


    return (
        <Stack.Navigator>
            {/*<Stack.Screen name="CardsScreen" component={CardsScreen} options={{headerShown: false}}/>*/}
            <Stack.Screen
                name="CardTopicScreen"
                component={CardTopicScreen}
                options={{
                  headerBackTitleVisible: false,
                  headerTitleAlign: 'center',
                  headerTitle: 'Topic',
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
                name="SubTopicScreen"
                component={SubTopicScreen}
                options={{
                    headerBackTitleVisible: false,
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
            <Stack.Screen name="CardsSubtopicScreen"
                          component={CardsSubtopicScreen}
                          options={{
                              headerBackTitleVisible: false,
                              headerTitleStyle: {
                                  fontFamily: Nunito_Semibold,
                                  fontSize: 28,
                              },
                              // headerTitleAlign: 'center',
                              // headerBackImage: ({ tintColor }) => (
                              //     <ArrowBackIcon color={tintColor} size={25} style={{marginLeft: 10, marginTop: 5}} />
                              // ),
                              // headerTitleStyle: {
                              //     fontFamily: 'Abel',
                              //     fontSize: 28,
                              // },
                          }}
            />
        </Stack.Navigator>
    );
};

export default CardsStack;
