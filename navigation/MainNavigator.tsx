import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from "./HomeStack";
import BrainIcon from "../components/icons/BrainIcon";
import {BLUE} from "../colors";
import CardsStack from "./CardsStack";
import CardsIcon from "../components/icons/CardsIcon";

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    borderTopWidth: 1,
                    borderColor: 'black',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 10,
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowOffset: { width: 0, height: -1 },
                    borderWidth: 1,
                },
                tabBarActiveTintColor: 'blue',  // Цвет иконки при активации
            }}>
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) =>
                        <BrainIcon size={70} color={focused ? BLUE : color} style={{ marginTop: 10 }} />
                }}
            />
            <Tab.Screen
                name="Cards"
                component={CardsStack}
                options={{
                    title: 'Cards',
                    tabBarIcon: ({ color, focused }) =>
                        <CardsIcon size={23} color={focused ? BLUE : color} style={{ marginTop: 10 }} />
                }}
            />
        </Tab.Navigator>
    );
};

export default MainNavigator;

