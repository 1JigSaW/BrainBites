import {SafeAreaView} from "react-native";
import OnboardingScreenLaunch from "../../components/OnboardingScreenLaunch";
import {BACKGROUND} from "../../colors";
import {StackScreenProps} from "@react-navigation/stack";
import {OnboardingStackParamList} from "../../navigation/OnboardingNavigator";

type Props = StackScreenProps<OnboardingStackParamList, 'Launch2Screen'>;

const Launch2Screen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND }}>
      <OnboardingScreenLaunch
        imageUri="https://d3vnk4nlqgkldn.cloudfront.net/onboarding/2.webp"
        title="Challenge yourself with exciting quizzes"
        text="Test your knowledge and skills with our interactive quizzes"
        onNext={() => navigation.navigate('Launch3Screen')}
      />
    </SafeAreaView>
  );
};

export default Launch2Screen;