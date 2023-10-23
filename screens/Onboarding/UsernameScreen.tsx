import React, { useContext, useEffect, useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
} from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { OnboardingStackParamList } from "../../navigation/OnboardingNavigator";
import {BACKGROUND, BLACK, BLUE} from "../../colors";

type Props = StackScreenProps<OnboardingStackParamList, 'UsernameScreen'>;

const UsernameScreen = ({ navigation }: Props) => {
    const [username, setUsername] = useState('');

    return (
        <ScrollView style={{ flex: 1, backgroundColor: BACKGROUND }} contentContainerStyle={{ flexGrow: 1 }}>
            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter unique username"
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>
                <TouchableOpacity style={styles.continueButton} onPress={() => {
                }}>
                    <Text style={styles.textButton}>Continue</Text>
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
        marginBottom: 20,
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
        color: BACKGROUND
    },
    textButton: {
        color: BACKGROUND,
        fontSize: 15,
        fontFamily: 'Abel',
    }
});

export default UsernameScreen;

