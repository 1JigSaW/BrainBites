import {SafeAreaView} from "react-native";
import OnboardingScreenLaunch from "../../components/OnboardingScreenLaunch";
import {BACKGROUND} from "../../colors";
import {StackScreenProps} from "@react-navigation/stack";
import {OnboardingStackParamList} from "../../navigation/OnboardingNavigator";

type Props = StackScreenProps<OnboardingStackParamList, 'Launch1Screen'>;

const Launch1Screen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND }}>
      <OnboardingScreenLaunch
        imageUri="https://your-image-url.com/image1.jpg"
        title="Discover a world of new knowledge"
        text="Start each day with a dose of inspiring knowledge that will broaden your horizons and enrich your mind"
        onNext={() => navigation.navigate('Launch2Screen')}
      />
    </SafeAreaView>
  );
};

export default Launch1Screen;