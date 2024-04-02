import React, {useState} from 'react';
import {Modal, View, TouchableOpacity, StyleSheet, ScrollView, Image, Text, Dimensions} from 'react-native';
import {Quicksand_Bold, Quicksand_Regular} from "../fonts";
import {BLACK, MAIN_SECOND} from "../colors";
import Brain2Icon from "./icons/Brain2Icon";
import WebView from "react-native-webview";

const screenWidth = Dimensions.get('window').width;
const donationOptionWidth = (screenWidth - 60) / 3;

const DonationModal = ({ isVisible, onClose }: any) => {
    const [showPaymentWebView, setShowPaymentWebView] = useState(false);
    const [paymentUrl, setPaymentUrl] = useState('');

    const handleDonationPress = (url: React.SetStateAction<string>) => {
      setPaymentUrl(url);
      setShowPaymentWebView(true);
    };

    if (showPaymentWebView) {
      return (
        <WebView
          source={{ uri: paymentUrl }}
          onNavigationStateChange={(navState: { url: string | string[]; }) => {
            if (navState.url.includes('success')) {
              setShowPaymentWebView(false);

            }
          }}
        />
      );
    }

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
                        <TouchableOpacity style={styles.donationOption}>
                            <Image source={{uri: 'https://d3vnk4nlqgkldn.cloudfront.net/donat_images/small.png' }} style={styles.logo} />
                            <View style={{ flexDirection: "row", marginVertical: -4 }}>
                                <Text style={styles.textCount}>200</Text>
                                <View style={{ transform: [{ scale: 0.6 }], marginLeft: -4 }}>
                                    <Brain2Icon size={100} color={BLACK}/>
                                </View>
                            </View>

                            <Text style={styles.textPrice}>0.99$</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.donationOption}>
                            <Image source={{uri: 'https://d3vnk4nlqgkldn.cloudfront.net/donat_images/medium.png' }} style={styles.logo} />
                            <View style={{flexDirection: "row", marginVertical: -4}}>
                                <Text style={styles.textCount}>600</Text>
                                <View style={{ transform: [{ scale: 0.6 }], marginLeft: -4  }}>
                                    <Brain2Icon size={100} color={BLACK}/>
                                </View>
                            </View>
                            <Text style={styles.textPrice}>2.49$</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.donationOption}>
                            <Image source={{uri: 'https://d3vnk4nlqgkldn.cloudfront.net/donat_images/huge.png' }} style={styles.logo} />
                            <View style={{flexDirection: "row", marginVertical: -4}}>
                                <Text style={styles.textCount}>1800</Text>
                                <View style={{ transform: [{ scale: 0.6 }], marginLeft: -4  }}>
                                    <Brain2Icon size={100} color={BLACK}/>
                                </View>
                            </View>
                            <Text style={styles.textPrice}>6.99$</Text>
                        </TouchableOpacity>
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