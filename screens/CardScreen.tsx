import {useContext, useEffect} from "react";
import MainContext from "../navigation/MainContext";
import {StackScreenProps} from "@react-navigation/stack";
import {HomeStackParamList} from "../navigation/HomeStack";
import {CardsStackParamList} from "../navigation/CardsStack";
import Swiper from 'react-native-deck-swiper';
import SaveIcon from "../components/icons/SaveIcon";
import CardComponent from "../components/CardComponent";
import {useGetUnseenCards} from "../queries/card";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";

type Props = StackScreenProps<CardsStackParamList, 'CardsScreen'>;

const CardsScreen = ({ navigation }: Props) => {
    const { userId } = useContext(MainContext);
    const pageSize = 20;

    const {
        data: cardsData,
        isLoading,
        isError,
        error,
        refetch
    } = useGetUnseenCards(userId, pageSize);

    // Handle navigation to the test if required
    useEffect(() => {
        if (!cardsData) {

        }
    }, [cardsData, navigation]);
    console.log('cardsData', cardsData);


    useEffect(() => {
        refetch();
    }, [refetch]);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (isError) {
        return (
            <View style={styles.container}>
                <Text>Could not load cards: {error?.message}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Swiper
                cards={cardsData} // Assume your API response contains a 'cards' array
                renderCard={(card) => <CardComponent card={card} />}
                onSwipedAll={() => {console.log(111)}} // Refetch when all cards are swiped
                backgroundColor="#f0f0f0"
                stackSize={pageSize}
                stackScale={10}
                stackSeparation={15}
                disableBottomSwipe
                disableTopSwipe
                // Other props for Swiper...
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // ...rest of your styles
});

export default CardsScreen;


