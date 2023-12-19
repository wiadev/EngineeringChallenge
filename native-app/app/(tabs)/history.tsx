import {StyleSheet} from 'react-native';

import {Text, View} from '../../components/Themed';
import { useGetDataPointsQuery, useGetScoresQuery } from '../../store/features/api/apiSlice';

export default function TabHistoryScreen() {
  const { data: dataPoints } = useGetDataPointsQuery({});
  const { data: scores } = useGetScoresQuery({});
  return (
    <View style={styles.container}>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
});
