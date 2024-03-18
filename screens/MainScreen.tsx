import {StackScreenProps} from "@react-navigation/stack";
import {HomeStackParamList} from "../navigation/HomeStack";
import {
    BACKGROUND,
    BLACK,
    BLUE,
    FIRST_PLACE,
    MAIN_SECOND,
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
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {Nunito_Bold, Nunito_Regular, Quicksand_Bold, Quicksand_Regular} from "../fonts";
import {useGetUsers, useGetUserStats} from "../queries/user";
import React, {useContext, useEffect, useState} from "react";
import MainContext from "../navigation/MainContext";
import {useIsFocused} from "@react-navigation/native";
import {SvgUri} from "react-native-svg";
import Brain2Icon from "../components/icons/Brain2Icon";
import HeartIcon from "../components/icons/HeartIcon";
import PlusIcon from "../components/icons/PlusIcon";
import WeeklyProgressBar from "../components/WeeklyProgressBar";
import {useGetCurrentStreak} from "../queries/streak";
import {useGetUserTopicsProgress} from "../queries/topic";
import FirstPlaceIcon from "../components/icons/FirstPlaceIcon";
import SecondPlaceIcon from "../components/icons/SecondPlaceIcon";
import ThirdPlaceIcon from "../components/icons/ThirdPlaceIcon";

type Props = StackScreenProps<HomeStackParamList, 'MainScreen'>;

const { width } = Dimensions.get('window');

const MainScreen = ({ navigation, route }: Props) => {
    const [activeButton, setActiveButton] = useState<string>('xp');
    const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    const { userId, cardCount } = useContext(MainContext);
    const [centralIndex, setCentralIndex] = useState(0);
    console.log('userId', userId)
    const isFocused = useIsFocused();
    const { data: topicsProgress, isLoading, error, refetch: topicRefetch } = useGetUserTopicsProgress(userId);

    const sortBy = activeButton;
    const returnAll = false;

    const {
        data: users,
        isLoading: isLoadingUsers,
        isError: isErrorUsers
    } = useGetUsers({ sortBy, returnAll, userId });
    console.log('users', users)

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

    const calculateProgress = (streakCount: number) => {
        const progressArray = new Array(days.length).fill(false);
        for (let i = 0; i < streakCount && i < progressArray.length; i++) {
            progressArray[i] = true;
        }
        return progressArray;
    };

    const progressArray = calculateProgress(streakData?.current_streak ?? 2);

    const currentStreak = streakData?.current_streak ?? 0;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND }}>
            <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('ProfileScreen')}>
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
            </TouchableOpacity>
            <View>
                <FlatList
                    data={topicsProgress}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <TouchableOpacity style={styles.topicContainer} onPress={() => navigation.navigate('SubTopicScreen', {
                                topic_id: item.topic_id,
                                topic_name: item.topic_name,
                            })}>
                          <Image source={{ uri: item.image }} style={styles.topicImage} />
                          <View style={styles.overlay} />
                          <Text style={styles.topicTitle}>{item.topic_name}</Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    snapToInterval={width * 0.75}
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
        </SafeAreaView>
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
        backgroundColor: WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        marginTop: 5
    },
    topicContainer: {
        width: width * 0.55,
        marginRight: 10,
        marginTop: 40,
    },
    topicImage: {
        width: '100%',
        height: width * 0.5,
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
    }
});

export default MainScreen;