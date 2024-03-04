import {SafeAreaView} from "react-native";
import OnboardingScreenLaunch from "../../components/OnboardingScreenLaunch";
import {BACKGROUND} from "../../colors";
import {StackScreenProps} from "@react-navigation/stack";
import {OnboardingStackParamList} from "../../navigation/OnboardingNavigator";

type Props = StackScreenProps<OnboardingStackParamList, 'Launch3Screen'>;

const Launch3Screen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND }}>
      <OnboardingScreenLaunch
        imageUri="https://your-image-url.com/image1.jpg"
        title="Personalize your learning path"
        text="Choose the topics and categories that interest you the most and create a personalized learning path"
        onNext={() => navigation.navigate('UsernameScreen')}
      />
    </SafeAreaView>
  );
};

export default Launch3Screen;