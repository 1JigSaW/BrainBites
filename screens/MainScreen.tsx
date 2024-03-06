import {StackScreenProps} from "@react-navigation/stack";
import {HomeStackParamList} from "../navigation/HomeStack";
import {BACKGROUND, BLACK, MAIN_SECOND, RED, RED_SECOND, SECONDARY_SECOND, WHITE} from "../colors";
import {Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {Quicksand_Bold, Quicksand_Regular} from "../fonts";
import {useGetUserStats} from "../queries/user";
import React, {useContext, useEffect} from "react";
import MainContext from "../navigation/MainContext";
import {useIsFocused} from "@react-navigation/native";
import {SvgUri} from "react-native-svg";
import Brain2Icon from "../components/icons/Brain2Icon";
import HeartIcon from "../components/icons/HeartIcon";
import PlusIcon from "../components/icons/PlusIcon";
import WeeklyProgressBar from "../components/WeeklyProgressBar";
import {useGetCurrentStreak} from "../queries/streak";

type Props = StackScreenProps<HomeStackParamList, 'MainScreen'>;

const MainScreen = ({ navigation, route }: Props) => {
      const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    const { userId, cardCount } = useContext(MainContext);
    console.log('userId', userId)
    const isFocused = useIsFocused();

    const {
        data: userStats,
        isLoading: isLoadingStats,
        isError,
        refetch,
    } = useGetUserStats(userId);

    const {
        data: streakData,
        isLoading: isLoadingStreak,
        isError: isErrorStreak,
        refetch: refetchStreak,
    } = useGetCurrentStreak(userId);

    useEffect(() => {
        if (isFocused && userId) {
            refetch();
            refetchStreak();
        }
    }, [isFocused, userId, refetch, cardCount]);

    console.log(userStats)

    const calculateProgress = (streakCount) => {
        // Create an array with false values for each day of the week
        const progressArray = new Array(days.length).fill(false);
        // Based on the streak count, set the corresponding days to true
        for (let i = 0; i < streakCount && i < progressArray.length; i++) {
            progressArray[i] = true;
        }
        return progressArray;
    };

    const progressArray = calculateProgress(streakData?.current_streak ?? 2);

    const currentStreak = streakData?.current_streak ?? 0;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND }}>
            <View style={styles.header}>
                <View style={styles.headerLine1}>
                    <View style={styles.centerRow}>
                        <View style={styles.circleImageView}>
                            <SvgUri
                                style={styles.circleImage}
                                uri={`https://api.dicebear.com/7.x/shapes/svg?seed=${userStats?.username}`}
                            />
                        </View>
                        <Text style={styles.textUsername}>{userStats?.username}</Text>
                    </View>
                    <View style={styles.iconsContainer}>
                        <View style={styles.centerRow}>
                            <Brain2Icon size={100} color={BLACK} style={{marginRight: 10, marginTop: 3}}/>
                            <Text style={styles.textVariable}>{userStats?.xp}</Text>
                        </View>
                        <View style={styles.centerRow}>
                            <HeartIcon size={100} color={RED_SECOND} style={{marginRight: 10, marginTop: 3}} />
                            <Text style={styles.textVariable}>{userStats?.lives}</Text>
                            <View style={styles.circle}>
                                <PlusIcon size={100} color={BLACK} />
                            </View>
                        </View>
                    </View>
                </View>
                <WeeklyProgressBar total={currentStreak} progress={progressArray} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: MAIN_SECOND,
        height: 100,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
    },
    headerLine1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    centerRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    circleImageView: {
        width: 60,
        height: 60,
        borderRadius: 35,
        overflow: 'hidden',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleImage: {
        width: '100%',
        height: '100%',
    },
    textUsername: {
        fontSize: 24,
        color: BLACK,
        fontFamily: Quicksand_Regular,
        marginLeft: 5,
    },
    iconsContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 20,
        marginTop: 5
    },
    textVariable: {
        fontSize: 24,
        color: BLACK,
        fontFamily: Quicksand_Regular,
    },
    circle: {
        width: 25,
        height: 25,
        borderRadius: 60,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        marginTop: 5
    },
});

export default MainScreen;