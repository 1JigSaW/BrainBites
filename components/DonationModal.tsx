import React, {useContext, useEffect, useState} from 'react';
import {
    Modal,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    Text,
    Dimensions,
    Alert, Platform, EmitterSubscription,
} from 'react-native';
import Brain2Icon from "./icons/Brain2Icon";
import {BLACK, MAIN_SECOND} from "../colors";
import {Quicksand_Bold, Quicksand_Regular} from "../fonts";
import Toast from "react-native-toast-message";
import {useAddXP} from "../queries/user";
import MainContext from "../navigation/MainContext";
import {adapty} from "react-native-adapty";

const productIds = [
    'low_01',
    'medium_01',
    'high_01',
];

const screenWidth = Dimensions.get('window').width;
const donationOptionWidth = (screenWidth - 60) / 3;
type PriceType = {
    localizedString: string;
    // Include other price-related fields here
};

type ProductType = {
    adaptyId: string;
    vendorId: string;
    localizedTitle: string; // Assuming this is the product name
    price: PriceType; // Assuming this holds pricing information
    android: {
        isConsumable: boolean;
    };
    vendorProductId: string;
};


const DonationModal = ({isVisible, onClose, refetch}: any) => {
    const {userId} = useContext(MainContext);
    const [products, setProducts] = useState<any>([]);

    const {mutate: addXP} = useAddXP();

// useEffect(() => {
//     let purchaseUpdateSubscription: EmitterSubscription;
//     let purchaseErrorSubscription: EmitterSubscription;
//
//     async function initializeIAP() {
//         try {
//             // Инициализируем соединение с IAP
//             await initConnection();
//             console.log('IAP Connection initialized');
//
//             // После успешной инициализации устанавливаем слушателей
//             purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase) => {
//                 console.log('purchaseUpdatedListener', purchase);
//                 // Подтверждаем покупку для Android
//                 if (Platform.OS === 'android' && !purchase.isAcknowledgedAndroid) {
//                     try {
//                         const ackResult = await acknowledgePurchaseAndroid(purchase.purchaseToken);
//                         console.log('acknowledgePurchaseAndroid success', ackResult);
//                     } catch (ackErr) {
//                         console.warn('acknowledgePurchaseAndroid error', ackErr);
//                     }
//                 }
//                 // Обработка успешной покупки
//             });
//
//             purchaseErrorSubscription = purchaseErrorListener((error) => {
//                 console.warn('purchaseErrorListener', error);
//                 Alert.alert('Purchase Error', error.message);
//             });
//
//             // Очищаем незавершенные покупки для Android
//             if (Platform.OS === 'android') {
//                 await flushFailedPurchasesCachedAsPendingAndroid();
//             }
//
//             // Загружаем доступные продукты
//             const productsList = await getProducts({ skus: productIds });
//             console.log(1)
//             setProducts(productsList);
//             console.log('Products:', productsList);
//         } catch (err) {
//             console.warn('IAP setup error:', err);
//         }
//     }
//
//     initializeIAP();
//
//     return () => {
//         purchaseUpdateSubscription?.remove();
//         purchaseErrorSubscription?.remove();
//         endConnection();
//     };
// }, []);

    useEffect(() => {
    async function initializeIAP() {
        const id = '01';
        const locale = 'en';
        try {
            const paywall = await adapty.getPaywall(id, locale);
            if (paywall && paywall.products) {
                const products = await adapty.getPaywallProducts(paywall);
                console.log("Products:", products);
                setProducts(products);
            }
        } catch (error) {
            console.error("Error fetching paywall:", error);
        }
    }
    initializeIAP();
}, [isVisible]);

const handleDonationPress = async (product: any) => {
    try {
        console.log('productId', product);
        // Здесь предполагается, что productId передается в функцию корректно
        const purchaseResult = await adapty.makePurchase(product);
        console.log("Purchase result:", purchaseResult);
        if (userId) {
                addXP({ userId, xpAmount: Number((product as any).localizedTitle) }, {
                onSuccess: () => {
                    refetch();
                    Toast.show({
                        type: 'success',
                        text1: 'Purchase and XP Add Successful',
                        text2: `Your purchase was successful and you've been awarded ${Number((product as any).localizedTitle)} XP!`
                    });
                    onClose();
                },
                onError: (error) => {
                    console.error('Error adding XP:', error);
                    Toast.show({
                        type: 'error',
                        text1: 'XP Add Failed',
                        text2: 'Failed to add XP after purchase.'
                    });
                }
            });
            }
    } catch (error) {
        console.warn("Purchase failed:", error);
        Toast.show({
            type: 'error',
            text1: 'Error payments',
            text2: 'Failed after purchase.'
        });
    }
};


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
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollViewContainer}
                    >
                        {products.sort((a: { localizedTitle: string; }, b: { localizedTitle: string; }) => {
                            const nameA = parseInt(a.localizedTitle, 10);
                            const nameB = parseInt(b.localizedTitle, 10);
                            return nameA - nameB;
                        }).map((product: any) => (
                            <TouchableOpacity
                                key={product.vendorProductId}
                                style={styles.donationOption}
                                onPress={() => handleDonationPress(product)}
                            >
                                <Image source={{uri: `https://d3vnk4nlqgkldn.cloudfront.net/donat_images/${product.vendorProductId}.png` }} style={styles.logo} />
                                <View style={{ flexDirection: "row", marginVertical: -4 }}>
                                    <Text style={styles.textCount}>{(product as any).localizedTitle}</Text>
                                    <View style={{ transform: [{ scale: 0.6 }], marginLeft: -4 }}>
                                        <Brain2Icon size={100} color={BLACK}/>
                                    </View>
                                </View>
                                <Text style={styles.textPrice}>{product.price.localizedString}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
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
        height: '22%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    scrollViewContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        width: 80,
        height: 80,
        marginHorizontal: 5,
    },
    donationOption: {
        width: donationOptionWidth,
        alignItems: 'center',
        backgroundColor: MAIN_SECOND,
        borderRadius: 20,
        marginHorizontal: 7,
        padding: 5,
        paddingVertical: 7
    },
    textPrice: {
        fontSize: 18,
        fontFamily: Quicksand_Regular,
        color: BLACK
    },
    textCount: {
        fontSize: 18,
        fontFamily: Quicksand_Bold,
        color: BLACK,
    }
});

export default DonationModal;
