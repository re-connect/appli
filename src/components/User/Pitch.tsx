import * as React from 'react';
import { StyleSheet, View } from 'react-native';
// @ts-ignore
import IconButton from '../UI/IconButton';
import Separator from '../UI/Separator';
import Text from '../UI/Text';
import Flag from '../UI/Flag';

const styles = StyleSheet.create({
  item: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8, paddingHorizontal: 16 },
  text: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  actions: { flexDirection: 'row' },
});

export interface Track {
  key: string;
  name: string;
  flag: string;
}

interface Props {
  track: Track;
  play: (track: Track) => void;
  pause: (track: Track) => void;
  stop: (track: Track) => void;
  isPlaying: boolean;
  isStarted: boolean;
}

const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

const Pitch: React.FC<Props> = ({ track, play, pause, stop, isPlaying, isStarted }) => 
  <View style={styles.item}>
    <View style={styles.text}>
      <Flag code={track.flag} />
      <Separator width={1} />
      <Text>{capitalize(track.name)}</Text>
    </View>
    <View style={styles.actions}>
      {isStarted ?
        <>
          <IconButton iconName='stop' onPress={() => stop(track)} />
          <IconButton iconName={ isPlaying ? 'pause' : 'play'} onPress={() => pause(track)} />
        </>
        : <IconButton iconName='play' onPress={() => play(track)} />
      }
    </View>
  </View>

export default Pitch;
