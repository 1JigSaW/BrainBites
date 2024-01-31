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
import {Nunito_Bold, Nunito_Regular, Nunito_Semibold} from "../../fonts";

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
                    navigation.navigate('CardCountSelectionScreen', { username });
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
                <Text style={styles.mainText}>Enter a unique name</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter unique username"
                        value={username}
                        onChangeText={handleTextChange} // Updated handler
                    />
                    {isUsernameTaken && <Text style={{
                        color: RED,
                        textAlign: 'center',
                        width: '100%',
                        fontFamily: Nunito_Regular,
                        fontSize: 16,
                    }}>Username is already taken</Text>}
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
        marginHorizontal: 10,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 15,
    },
    input: {
        width: '100%',
        padding: 10,
        borderColor: BLACK,
        borderWidth: 1,
        borderRadius: 20,
        fontSize: 24,
        fontFamily: Nunito_Regular,
        paddingHorizontal: 15,
    },
    continueButton: {
        padding: 10,
        backgroundColor: BLUE,
        borderRadius: 20,
        color: BACKGROUND,
        width: '100%'
    },
    textButton: {
        color: BACKGROUND,
        fontSize: 20,
        fontFamily: Nunito_Semibold,
        fontWeight: '600',
        textAlign: 'center',
    },
    mainText: {
        color: BLACK,
        fontSize: 32,
        fontFamily: Nunito_Bold,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 20,
    }
});

export default UsernameScreen;

