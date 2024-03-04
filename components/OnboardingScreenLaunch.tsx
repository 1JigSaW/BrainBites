import React from 'react';
import {
    Dimensions,
    Image, SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {BACKGROUND, BLACK, MAIN_SECOND, SECONDARY_SECOND, WHITE} from "../colors";
import {Quicksand_Bold, Quicksand_Regular} from "../fonts";

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
  imageUri: string;
  title: string;
  text: string;
  onNext: () => void;
}

const OnboardingScreenLaunch = ({ imageUri, title, text, onNext }: OnboardingScreenProps) => (
    <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND }}>
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <Image
                    source={{ uri: imageUri }}
                    style={styles.image}
                />
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.text}>{text}</Text>
            </ScrollView>
            <TouchableOpacity onPress={onNext} style={styles.nextButton}>
                <Text style={styles.textButton}>Next</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: MAIN_SECOND,
        margin: 15,
        borderRadius: 20,
    },
    scrollViewContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    image: {
        width: width - 40,
        height: height / 2 - 20,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 24,
        marginVertical: 20,
        fontFamily: Quicksand_Bold,
        textAlign: 'center',
        color: BLACK,
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: Quicksand_Regular,
        color: BLACK,
    },
    nextButton: {
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
    }
});

export default OnboardingScreenLaunch;
