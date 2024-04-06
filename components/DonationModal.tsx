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
    Alert, Platform,
} from 'react-native';
import {
    initConnection,
    getProducts,
    endConnection,
    requestPurchase, Product, RequestPurchase, flushFailedPurchasesCachedAsPendingAndroid,
} from 'react-native-iap';
import Brain2Icon from "./icons/Brain2Icon";
import {BLACK, MAIN_SECOND} from "../colors";
import {Quicksand_Bold, Quicksand_Regular} from "../fonts";
import Toast from "react-native-toast-message";
import {useAddXP} from "../queries/user";
import MainContext from "../navigation/MainContext";

const productIds = [
    'low_01',
    'medium_01',
    'high_01',
];

const screenWidth = Dimensions.get('window').width;
const donationOptionWidth = (screenWidth - 60) / 3;
type ProductType = Product;

const DonationModal = ({isVisible, onClose, refetch}: any) => {
    const {userId} = useContext(MainContext);
    const [products, setProducts] = useState<ProductType[]>([]);

    const { mutate: addXP } = useAddXP();


    useEffect(() => {
        const loadProducts = async () => {
            try {
                await initConnection();
                if (Platform.OS === 'android') {
                    flushFailedPurchasesCachedAsPendingAndroid();
                    const products = await getProducts({ skus: productIds });
                    console.log('products', products);
                    setProducts(products);
                }
            } catch (err) {
                console.warn(err);
            }
        };

        if (isVisible) {
            loadProducts();
        }

        return () => {
            endConnection();
        };
    }, [isVisible]);


    const handleDonationPress = async (productId: any) => {
        try {
            const purchaseResult = await requestPurchase(productId);
            console.log(purchaseResult);
            if (userId) {
                addXP({ userId, xpAmount: Number((products[productId] as any).name) }, {
                onSuccess: () => {
                    refetch();
                    Toast.show({
                        type: 'success',
                        text1: 'Purchase and XP Add Successful',
                        text2: `Your purchase was successful and you've been awarded ${Number((products[productId] as any).name)} XP!`
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
            console.warn(error);
            Toast.show({
                type: 'error',
                text1: 'Purchase Failed',
                text2: 'Something went wrong with your purchase.'
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
                        {products.sort((a, b) => {
                            const nameA = parseInt(a.title, 10);
                            const nameB = parseInt(b.title, 10);
                            return nameA - nameB;
                        }).map((product) => (
                            <TouchableOpacity
                                key={product.productId} // Уникальный ключ здесь
                                style={styles.donationOption}
                                onPress={() => handleDonationPress(product.productId)}
                            >
                                <Image source={{uri: 'https://d3vnk4nlqgkldn.cloudfront.net/donat_images/small.png' }} style={styles.logo} />
                                <View style={{ flexDirection: "row", marginVertical: -4 }}>
                                    <Text style={styles.textCount}>{(product as any).name}</Text>
                                    <View style={{ transform: [{ scale: 0.6 }], marginLeft: -4 }}>
                                        <Brain2Icon size={100} color={BLACK}/>
                                    </View>
                                </View>
                                <Text style={styles.textPrice}>{product.localizedPrice}</Text>
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