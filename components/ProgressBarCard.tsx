import {Dimensions, StyleSheet, View} from "react-native";
import {MAIN_SECOND, SECONDARY_SECOND, WHITE} from "../colors";


const { width } = Dimensions.get('window');
const ProgressBarCard = ({ progress }: any) => {
  const progressBarWidth = progress * (width - 60);

  return (
    <View style={styles.progressBarBackground}>
      <View style={[styles.progressBarFill, { width: progressBarWidth }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarBackground: {
    backgroundColor: WHITE,
    borderRadius: 20,
    overflow: 'hidden',
    width: width - 65,
    height: 30,
    borderWidth: 7,
    borderColor: MAIN_SECOND,
  },
  progressBarFill: {
    backgroundColor: SECONDARY_SECOND,
    height: '100%',
    borderRadius: 10,
  },
});

export default ProgressBarCard;