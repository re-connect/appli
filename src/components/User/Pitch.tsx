import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
// @ts-ignore
import Flag from 'react-native-flags';
import ArabLeagueFlag from '../../images/arab-league-flag.png';
import IconButton from '../UI/IconButton';
import Separator from '../UI/Separator';
import Text from '../UI/Text';

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

export interface CurrentTrack {
  key: string | null;
  isStarted: boolean;
  isPlaying: boolean;
}

interface Props {
  track: Track;
  play: (track: Track) => void;
  pause: (track: Track) => void;
  stop: (track: Track) => void;
}

const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

const Pitch: React.FC<Props> = ({ track, play, pause, stop }) => 
  <View style={styles.item}>
    <View style={styles.text}>
      {track.flag === 'AR' ? (
        <Image source={ArabLeagueFlag} style={{ top: 6, height: 20, width: 32 }} />
      ) : (
        <Flag type='flat' code={track.flag} size={32} />
      )}
      <Separator width={1} />
      <Text>{capitalize(track.name)}</Text>
    </View>
    <View style={styles.actions}>
        <IconButton iconName='stop' onPress={() => stop(track)} />
        <IconButton iconName='pause' onPress={() => pause(track)} />
        <IconButton iconName='play' onPress={() => play(track)} />
    </View>
  </View>

export default Pitch;
