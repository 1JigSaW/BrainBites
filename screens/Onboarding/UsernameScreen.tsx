import React, { useContext, useEffect, useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput, ActivityIndicator, Platform,
} from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { OnboardingStackParamList } from "../../navigation/OnboardingNavigator";
import {BACKGROUND, BLACK, BLOCK_BUTTON, BLUE, MAIN_SECOND, RED, SECONDARY_SECOND, WHITE} from "../../colors";
import {useCheckUsernameUnique} from "../../queries/user";
import {Nunito_Bold, Nunito_Regular, Nunito_Semibold, Quicksand_Bold, Quicksand_Regular} from "../../fonts";

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

        setIsCheckingUsername(true);

        usernameCheck.mutate(username, {
            onSuccess: (data) => {
                setIsCheckingUsername(false);
                if (data.isUnique) {
                    navigation.navigate('CardCountSelectionScreen', { username });
                } else {
                    setIsUsernameTaken(true);
                }
            },
            onError: (error) => {
                setIsCheckingUsername(false);
            }
        });
    };

    const handleTextChange = (text: string) => {
        setUsername(text);
        if (isUsernameTaken) {
            setIsUsernameTaken(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND }}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <Text style={styles.mainText}>Enter a unique name</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            value={username}
                            onChangeText={handleTextChange}
                        />
                        {isUsernameTaken && (
                            <Text style={styles.errorText}>Username is already taken</Text>
                        )}
                    </View>
                </ScrollView>
                <TouchableOpacity
                    style={[styles.continueButton, (isUsernameTaken || username === '') && { backgroundColor: BLOCK_BUTTON }]}
                    onPress={handleContinuePress}
                    disabled={isUsernameTaken || username === '' || isCheckingUsername}
                >
                    {isCheckingUsername ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={[styles.textButton, (isUsernameTaken || username === '') && { opacity: 0.9 }]}>
                            Next
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: BACKGROUND,
    },
    container: {
        flex: 1,
        backgroundColor: MAIN_SECOND,
        margin: 15,
        borderRadius: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 15,
    },
    input: {
        width: '100%',
        padding: 10,
        borderColor: BLACK,
        backgroundColor: WHITE,
        borderRadius: 20,
        fontSize: 18,
        fontFamily: Quicksand_Regular,
        paddingHorizontal: 15,
    },
    continueButton: {
        margin: 10,
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: SECONDARY_SECOND,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
    },
    textButton: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: Quicksand_Regular,
        color: WHITE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainText: {
        color: BLACK,
        fontSize: 24,
        fontFamily: Quicksand_Bold,
        textAlign: 'center',
        marginBottom: 15,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    errorText: {
        color: RED,
        textAlign: 'center',
        width: '100%',
        fontFamily: Quicksand_Regular,
        fontSize: 16,
    },
});

export default UsernameScreen;

