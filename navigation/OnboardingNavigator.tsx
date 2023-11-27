import {createStackNavigator} from "@react-navigation/stack";
import UsernameScreen from "../screens/Onboarding/UsernameScreen";
import TopicSelectionScreen from "../screens/Onboarding/TopicSelectionScreen";
import CardCountSelectionScreen from "../screens/Onboarding/CardCountSelectionScreen";


export type OnboardingStackParamList = {
    UsernameScreen: undefined;
    CardCountSelectionScreen: {
        username: string;
    };
    TopicSelectionScreen: {
        username: string;
        count_cards: number;
    };
};

const Stack = createStackNavigator<OnboardingStackParamList>();

const OnboardingNavigator= () => {
    return (
        <Stack.Navigator initialRouteName="UsernameScreen">
            <Stack.Screen name="UsernameScreen" component={UsernameScreen} options={{headerShown: false}}/>
            <Stack.Screen name="CardCountSelectionScreen" component={CardCountSelectionScreen} options={{headerShown: false}}/>
            <Stack.Screen name="TopicSelectionScreen" component={TopicSelectionScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}


export default OnboardingNavigator;
