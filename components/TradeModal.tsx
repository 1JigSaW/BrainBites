import React from 'react';
import {
    Modal,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    Text,
    Button,
    ActivityIndicator
} from 'react-native';
import Brain2Icon from "./icons/Brain2Icon";
import {
    BACKGROUND,
    BLACK,
    BLUE,
    CORRECT_ANSWER,
    INCORRECT_ANSWER,
    RED_SECOND,
    SECONDARY_SECOND,
    WHITE
} from "../colors";
import HeartIcon from "./icons/HeartIcon";
import TradeRightIcon from "./icons/TradeRightIcon";
import {Quicksand_Bold, Quicksand_Regular} from "../fonts";

const TradeModal = ({ isVisible, onClose, onTrade, isLoading, userStats }: any) => {
    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPressOut={onClose}
            >
                <View style={styles.modalView}>
                    <View style={styles.contentContainer}>
                        <View style={styles.iconsContainer}>
                            <View style={styles.quantitiesContainer}>
                                <Brain2Icon size={100} color={BLACK} />
                                <Text style={styles.quantityText}>15</Text>
                            </View>
                            <TradeRightIcon size={8} color={BLACK} style={styles.tradeIcon} />
                            <View style={styles.quantitiesContainer}>
                                <HeartIcon size={100} color={INCORRECT_ANSWER} />
                                <Text style={styles.quantityText}>1</Text>
                            </View>
                        </View>

                        <TouchableOpacity onPress={onTrade} style={[styles.tradeButton, isLoading || userStats?.xp < 15 && {opacity: 0.5}]}
                                          disabled={isLoading || userStats?.xp < 15}
                        >
                            {isLoading ? (
                                <ActivityIndicator size="small" color={BACKGROUND} />
                            ) : (
                                <Text style={styles.textButton}>Trade</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        padding: 10,
        height: '23%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        margin: 10
    },
    tradeIcon: {
        marginHorizontal: 10,
    },
    quantitiesContainer: {
        alignItems: 'center'
    },
    quantityText: {
        fontSize: 18,
        color: BLACK,
        fontFamily: Quicksand_Bold
    },
    tradeButton: {
        margin: 10,
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: SECONDARY_SECOND,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        width: '90%'
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

export default TradeModal;