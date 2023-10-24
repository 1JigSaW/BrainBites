import {createStackNavigator} from "@react-navigation/stack";
import UsernameScreen from "../screens/Onboarding/UsernameScreen";
import TopicSelectionScreen from "../screens/Onboarding/TopicSelectionScreen";


export type OnboardingStackParamList = {
    UsernameScreen: undefined;
    TopicSelectionScreen: undefined;
};

const Stack = createStackNavigator<OnboardingStackParamList>();

const OnboardingNavigator= () => {
    return (
        <Stack.Navigator initialRouteName="UsernameScreen">
            <Stack.Screen name="UsernameScreen" component={UsernameScreen} options={{headerShown: false}}/>
            <Stack.Screen name="TopicSelectionScreen" component={TopicSelectionScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}


export default OnboardingNavigator;
