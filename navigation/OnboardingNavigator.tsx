import {createStackNavigator} from "@react-navigation/stack";
import UsernameScreen from "../screens/Onboarding/UsernameScreen";
import CardCountSelectionScreen from "../screens/Onboarding/CardCountSelectionScreen";
import Launch1Screen from "../screens/Onboarding/Launch1Screen";
import Launch2Screen from "../screens/Onboarding/Launch2Screen";
import Launch3Screen from "../screens/Onboarding/Launch3Screen";


export type OnboardingStackParamList = {
    Launch1Screen: undefined;
    Launch2Screen: undefined;
    Launch3Screen: undefined;
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
        <Stack.Navigator initialRouteName="Launch1Screen">
            <Stack.Screen name="Launch1Screen" component={Launch1Screen} options={{headerShown: false}}/>
            <Stack.Screen name="Launch2Screen" component={Launch2Screen} options={{headerShown: false}}/>
            <Stack.Screen name="Launch3Screen" component={Launch3Screen} options={{headerShown: false}}/>
            <Stack.Screen name="UsernameScreen" component={UsernameScreen} options={{headerShown: false}}/>
            <Stack.Screen name="CardCountSelectionScreen" component={CardCountSelectionScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}


export default OnboardingNavigator;
