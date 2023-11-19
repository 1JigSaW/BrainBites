import React, { useContext, useEffect, useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput, ActivityIndicator,
} from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { OnboardingStackParamList } from "../../navigation/OnboardingNavigator";
import {BACKGROUND, BLACK, BLUE, RED} from "../../colors";
import {useCheckUsernameUnique} from "../../queries/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {onboardingUsername} from "../../constants";

type Props = StackScreenProps<OnboardingStackParamList, 'UsernameScreen'>;

const UsernameScreen = ({ navigation }: Props) => {
    const [username, setUsername] = useState('');
    const [isUsernameTaken, setIsUsernameTaken] = useState(false);

    const usernameCheck = useCheckUsernameUnique();

    const [isCheckingUsername, setIsCheckingUsername] = useState(false);

    const handleContinuePress = async () => {
        if (!username) {
            return;
        }

        setIsCheckingUsername(true);  // Включить индикатор загрузки

        usernameCheck.mutate(username, {
            onSuccess: (data) => {
                setIsCheckingUsername(false);  // Выключить индикатор загрузки
                if (data.isUnique) {
                    navigation.navigate('TopicSelectionScreen', { username });
                } else {
                    setIsUsernameTaken(true);
                }
            },
            onError: (error) => {
                setIsCheckingUsername(false);  // Выключить индикатор загрузки в случае ошибки
            }
        });
    };

    const handleTextChange = (text: string) => {
        setUsername(text);
        if (isUsernameTaken) {
            setIsUsernameTaken(false);  // reset the error if user starts typing
        }
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: BACKGROUND }} contentContainerStyle={{ flexGrow: 1 }}>
            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter unique username"
                        value={username}
                        onChangeText={handleTextChange} // Updated handler
                    />
                    {isUsernameTaken && <Text style={{ color: RED, textAlign: 'center', width: '100%' }}>Username is already taken</Text>}
                </View>
                <TouchableOpacity
                    style={[styles.continueButton, (isUsernameTaken || username === '') && {backgroundColor: '#ccc'}]}
                    onPress={handleContinuePress}
                    disabled={isUsernameTaken || username === '' || isCheckingUsername}
                >
                    {isCheckingUsername ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={[styles.textButton, (isUsernameTaken || username === '') && {opacity: 0.5}]}>
                            Continue
                        </Text>
                    )}
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: BACKGROUND,
        paddingHorizontal: 23,
        paddingVertical: 5,
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
    },
    inputContainer: {
        width: '100%',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        padding: 15,
        borderColor: BLACK,
        borderWidth: 1,
        borderRadius: 20,
        fontSize: 15,
        fontFamily: 'Abel',
    },
    continueButton: {
        padding: 15,
        backgroundColor: BLUE,
        borderRadius: 20,
        color: BACKGROUND,
        width: '100%'
    },
    textButton: {
        color: BACKGROUND,
        fontSize: 15,
        fontFamily: 'Abel',
        textAlign: 'center',
    }
});

export default UsernameScreen;

