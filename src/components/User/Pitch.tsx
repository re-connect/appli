import * as React from 'react';
import { useTranslation } from 'react-i18next';
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

const Pitch: React.FC<Props> = ({ track, play, pause, stop, isPlaying, isStarted }) => {
  const { t } = useTranslation();
  const label = (key: string): string => `${t(key)} ${capitalize(track.name)}`;
  return (
    <View style={styles.item}>
      <View style={styles.text}>
        <Flag code={track.flag} />
        <Separator width={1} />
        <Text>{capitalize(track.name)}</Text>
      </View>
      <View style={styles.actions}>
        {isStarted ?
          <>
            <IconButton iconName='stop' onPress={() => stop(track)} accessibilityLabel={label('a11y_stop')} />
            <IconButton iconName={ isPlaying ? 'pause' : 'play'} onPress={() => pause(track)} accessibilityLabel={label(isPlaying ? 'a11y_pause' : 'a11y_play')} />
          </>
          : <IconButton iconName='play' onPress={() => play(track)} accessibilityLabel={label('a11y_play')} />
        }
      </View>
    </View>
  );
};

export default Pitch;
