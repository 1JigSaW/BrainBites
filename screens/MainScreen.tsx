import {StackScreenProps} from "@react-navigation/stack";
import {HomeStackParamList} from "../navigation/HomeStack";
import {
    BACKGROUND,
    BLACK,
    BLUE,
    FIRST_PLACE,
    MAIN_SECOND, PROGRESS_BACKGROUND,
    RED,
    RED_SECOND,
    SECOND_PLACE,
    SECONDARY_SECOND, THIRD_PLACE,
    WHITE
} from "../colors";
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image, Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {Nunito_Bold, Nunito_Regular, Quicksand_Bold, Quicksand_Regular} from "../fonts";
import {useCheckRestoreLives, useGetUsers, useGetUserStats, usePurchaseLives} from "../queries/user";
import React, {useContext, useEffect, useLayoutEffect, useState} from "react";
import MainContext from "../navigation/MainContext";
import {useIsFocused} from "@react-navigation/native";
import {SvgUri} from "react-native-svg";
import Brain2Icon from "../components/icons/Brain2Icon";
import HeartIcon from "../components/icons/HeartIcon";
import PlusIcon from "../components/icons/PlusIcon";
import WeeklyProgressBar from "../components/WeeklyProgressBar";
import {useGetCurrentStreak, useUpdateStreak} from "../queries/streak";
import {useGetUserTopicsProgress} from "../queries/topic";
import FirstPlaceIcon from "../components/icons/FirstPlaceIcon";
import SecondPlaceIcon from "../components/icons/SecondPlaceIcon";
import ThirdPlaceIcon from "../components/icons/ThirdPlaceIcon";
import TradeIcon from "../components/icons/TradeIcon";
import DonationModal from "../components/DonationModal";
import TradeModal from "../components/TradeModal";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {NEXT_LIFE_RESTORE_TIME} from "../constants";
import RemainingTimeDisplay from "../components/RemainingTimeDisplay";

type Props = StackScreenProps<HomeStackParamList, 'MainScreen'>;

const { width } = Dimensions.get('window');

const getCurrentWeekProgress = (streakStartDay: any, currentStreakCount: number) => {
  const currentDayIndex = new Date().getDay();
  const currentDayAdjustedIndex = (currentDayIndex === 0 ? 6 : currentDayIndex - 1); // Преобразовываем в формат, где 0 - это понедельник, 6 - воскресенье

  const progress = Array(7).fill(false);

  for (let i = streakStartDay, count = 0; count < currentStreakCount; i = (i + 1) % 7, count++) {
    if (i <= currentDayAdjustedIndex) {
      progress[i] = true;
    }
  }

  return progress;
};

const MainScreen = ({ navigation, route }: Props) => {
    const [activeButton, setActiveButton] = useState<string>('xp');
    const [isModalVisibleDonation, setIsModalVisibleDonation] = useState(false);
    const [isModalVisibleTrade, setIsModalVisibleTrade] = useState(false);
    const [isLoadingTrade, setIsLoadingTrade] = useState(false);
    const [availableHeight, setAvailableHeight] = useState(0);
    const toggleModalDonation = () => setIsModalVisibleDonation(!isModalVisibleDonation);
    const toggleModalTrade = () => setIsModalVisibleTrade(!isModalVisibleTrade);
    const [remainingTime, setRemainingTime] = useState<number | null>(null);

    const { mutate: purchaseLives } = usePurchaseLives();

    const { userId, cardCount } = useContext(MainContext);

    const isFocused = useIsFocused();
    const { data: topicsProgress, isLoading, error, refetch: topicRefetch } = useGetUserTopicsProgress(userId);
    const sortBy = activeButton;
    const returnAll = false;
    const { data, mutate, isLoading: isLoadingLives } = useCheckRestoreLives();

    useEffect(() => {
        if (userId && isFocused) {
            mutate({ userId });
        }
    }, [userId, isFocused]);

    useEffect(() => {
        if (data && data.restoring && typeof data.time_left === 'number') {
            setRemainingTime(data.time_left + 5);
        } else {
            setRemainingTime(null);
        }
    }, [data]);

    const {
        data: users,
        isLoading: isLoadingUsers,
        isError: isErrorUsers
    } = useGetUsers({ sortBy, returnAll, userId });

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

    useLayoutEffect(() => {
        const screenHeight = Dimensions.get('window').height;
        const headerAndLeaderboardHeight = 130 + 10;
        const calculatedHeight = screenHeight - headerAndLeaderboardHeight;

        setAvailableHeight(calculatedHeight);
    }, []);

    useEffect(() => {
        if (isFocused && userId) {
            refetch();
            refetchStreak();
        }
    }, [isFocused, userId, cardCount]);

    const onTrade = async () => {
        setIsLoadingTrade(true);
        const cost = 15;
        if (userId) {
            purchaseLives({ userId, cost }, {
                onSuccess: async () => {
                    await refetch();
                    setIsLoadingTrade(false);
                },
                onError: (error) => {
                    setIsLoadingTrade(false);
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: error.message || "An error occurred",
                    });
                }
            });
        } else {
            setIsLoadingTrade(false);
        }
    };


    const currentStreak = streakData?.current_streak ?? 0;

    return (
        <>
        <SafeAreaView style={{ flex:0, backgroundColor: MAIN_SECOND }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND }}>
            <View style={{ flex: 1, backgroundColor: BACKGROUND }}>
            <TouchableOpacity style={[styles.header]} onPress={() => navigation.navigate('ProfileScreen')}>
                <View style={styles.headerLine1}>
                    <View style={styles.centerRow}>
                        <View style={styles.circleImageView}>
                            {isLoadingStats ? (
                                <ActivityIndicator size="large" color={BLUE} />
                            ) : (
                                <SvgUri
                                    style={styles.circleImage}
                                    uri={`https://api.dicebear.com/7.x/shapes/svg?seed=${userStats?.username}`}
                                />
                            )}
                        </View>
                        {isLoadingStats ? (
                            <ActivityIndicator size="small" color={BLUE} />
                        ) : (
                            <Text style={styles.textUsername}>{userStats?.username}</Text>
                        )}
                    </View>
                    <View style={[styles.iconsContainer]}>
                        <TouchableOpacity style={[styles.centerRow]} onPress={toggleModalDonation}>
                            <Brain2Icon size={100} color={BLACK} style={{marginRight: 10, marginTop: 3}}/>
                            {isLoadingStats ? (
                                <ActivityIndicator size="small" color={BLUE} />
                            ) : (
                                <Text style={styles.textVariable}>{userStats?.xp}</Text>
                            )}
                            <TouchableOpacity
                                style={styles.circle}
                                onPress={toggleModalDonation}
                                // hitSlop={{ top: 10, left: 10, right: 10 }}
                            >
                                <PlusIcon size={100} color={BLACK} />
                            </TouchableOpacity>
                            <DonationModal isVisible={isModalVisibleDonation} onClose={toggleModalDonation} refetch={refetch} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.centerRow, {paddingBottom: 20, zIndex: 4 }]} onPress={toggleModalTrade}>
                        {!isLoadingLives ? (
                            <>
                                <HeartIcon size={100} color={RED_SECOND} style={[{marginRight: 10, marginTop: 3},
                                    (remainingTime && userStats?.lives === 0) ? {opacity: 0.5} : {opacity: 1}]} />
                                 {(remainingTime && userStats?.lives === 0) ? (
                                    <RemainingTimeDisplay
                                        remainingTime={remainingTime}
                                        setRemainingTime={setRemainingTime}
                                        mutate={mutate}
                                        userId={userId}
                                        refetch={refetch}
                                    />
                                ) : (
                                    isLoadingStats ? (
                                        <ActivityIndicator size="small" color={BLUE} />
                                    ) : (
                                        <Text style={styles.textVariable}>{userStats?.lives}</Text>
                                    )
                                )}
                                <TouchableOpacity
                                    style={styles.circle}
                                    onPress={toggleModalTrade}
                                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                                >
                                    <TradeIcon size={120} color={BLACK} style={{marginTop: 9, marginLeft: 8}}/>
                                </TouchableOpacity>
                                <TradeModal isVisible={isModalVisibleTrade}
                                            onClose={toggleModalTrade}
                                            onTrade={onTrade}
                                            isLoading={isLoadingTrade}
                                            userStats={userStats}
                                />
                                </>
                            ) : (
                                <ActivityIndicator size="small" color={BLUE} />
                        )}
                        </TouchableOpacity>
                    </View>
                </View>
                <WeeklyProgressBar total={currentStreak} progress={currentStreak} />
            </TouchableOpacity>
            <View style={{flex: 1}}>
                <FlatList
                    data={topicsProgress}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) =>
                        isLoading ? (
                            <View style={{borderRadius: 20, height: 1000}}></View>
                        ) : (
                            <TouchableOpacity style={styles.topicContainer} onPress={() => navigation.navigate('SubTopicScreen', {
                                topic_id: item.topic_id,
                                topic_name: item.topic_name,
                            })}>
                          <Image source={{ uri: item.image }} style={[styles.topicImage]} />
                          <View style={[styles.progressOverlay, { width: `${item.progress * 100}%`, height: width * 0.55 }]} />
                          <View style={styles.overlay} />
                          <Text style={styles.topicTitle}>{item.topic_name}</Text>
                      </TouchableOpacity>
                    )
                    }
                    keyExtractor={(item, index) => index.toString()}
                    snapToInterval={width * 0.5}
                    decelerationRate={"fast"}
                    snapToAlignment={"start"}
                    contentInset={{
                      right: width * 0.25,
                      left: 0,
                    }}
                    contentContainerStyle={{
                      paddingHorizontal: 10,
                    }}
                />
            </View>
            <TouchableOpacity style={styles.leaderboardContainer} onPress={() => navigation.navigate('LeaderBoardScreen')}>
                <Text style={styles.titleLeaderboard}>Leaderboard</Text>
                <View style={styles.blockNum}>
                    {isLoadingUsers ? (
                        <ActivityIndicator size="large" color={BLUE} />
                    ) : (
                        users && users.map(user => (
                            <React.Fragment key={user.id}>
                                <View style={styles.listItemContainer}>
                                    {user.user_rank === 1 ? <FirstPlaceIcon size={100} color={FIRST_PLACE} style={{marginRight: 19, marginLeft: 7}}/> :
                                        user.user_rank === 2 ? <SecondPlaceIcon size={100} color={SECOND_PLACE} style={{marginRight: 19, marginLeft: 7}}/> :
                                            user.user_rank === 3 ? <ThirdPlaceIcon size={100} color={THIRD_PLACE} style={{marginRight: 19, marginLeft: 7}}/>:
                                        <Text style={styles.listNumber}>#{user.user_rank}</Text>}
                                    <View style={styles.circleImageLeaderboard}>
                                        <SvgUri
                                            style={styles.listImage}
                                            uri={`https://api.dicebear.com/7.x/shapes/svg?seed=${user.username}`}
                                        />
                                    </View>
                                    <Text style={styles.listText}>{user.username}</Text>
                                    <Text style={styles.listEndNumber}>
                                        {sortBy === 'xp' ? user.xp :
                                            sortBy === 'read_cards' ? user.read_cards :
                                                sortBy === 'badges' ? user.badges_count : ''}
                                    </Text>
                                </View>
                            </React.Fragment>
                        ))
                    )}
                </View>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
            </>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: MAIN_SECOND,
        height: 130,
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
        marginBottom: 5
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
        marginTop: 5,
        paddingBottom: 0
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
        backgroundColor: WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        marginTop: 5,
    },
    topicContainer: {
        width: width * 0.35,
        marginRight: 10,
        marginTop: 40,
    },
    topicImage: {
        width: '100%',
        height: '90%',
        borderRadius: 10,
    },
    topicTitle: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: Quicksand_Bold,
        color: BLACK,
        marginTop: 5,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: WHITE,
        opacity: 0.3,
    },
    leaderboardContainer: {
        backgroundColor: MAIN_SECOND,
        marginTop: 30,
        borderRadius: 20,
        marginHorizontal: 10,
        marginBottom: 10
    },
    titleLeaderboard: {
        color: BLACK,
        fontSize: 24,
        fontFamily: Quicksand_Bold,
        textAlign: "center",
        marginTop: 10,
        marginBottom: 10
    },
    listItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        paddingHorizontal: 10,
        backgroundColor: WHITE,
        marginHorizontal: 10,
        borderRadius: 20,
        marginBottom: 5,
    },
    listNumber: {
        color: '#000',
        fontFamily: Quicksand_Regular,
        fontSize: 14,
        fontStyle: 'normal',
        marginRight: 5,
        width: 35,
    },
    listImage: {
        width: '100%',
        height: '100%',
    },
    listText: {
        flex: 1,
        color: BLACK,
        fontFamily: Quicksand_Regular,
        fontSize: 12,
        fontStyle: 'normal',
    },
    listEndNumber: {
        color: '#000',
        fontFamily: Quicksand_Bold,
        fontSize: 18,
        fontStyle: 'normal',
        marginLeft: 15,
    },
    listSeparator: {
        height: 1,
        backgroundColor: 'black',
        marginLeft: 10,
        marginRight: 10,
    },
    blockNum: {
        marginBottom: 10,
    },
    circleImageLeaderboard: {
        width: 24,
        height: 24,
        borderRadius: 35,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    progressOverlay: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        opacity: 0.0,
    },
});

export default MainScreen;
