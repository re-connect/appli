import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Screen from '../../components/Screen';
import { Audio } from 'expo-av';
import Pitch, { Track } from '../../components/User/Pitch';
import { SoundObject } from 'expo-av/build/Audio';

const styles = StyleSheet.create({ container: { flex: 1, alignItems: 'center' } });

const imports = {
  english: require('../../../assets/audio/english.mp3'),
  arabic: require('../../../assets/audio/arabic.mp3'),
  eastern: require('../../../assets/audio/eastern.mp3'),
  russian: require('../../../assets/audio/russian.mp3'),
  pashto: require('../../../assets/audio/pashto.mp3'),
  dari: require('../../../assets/audio/dari.mp3'),
  ukrainian: require('../../../assets/audio/ukrainian.mp3'),
  romanian: require('../../../assets/audio/romanian.mp3'),
  albanian: require('../../../assets/audio/albanian.mp3'),
  peul: require('../../../assets/audio/peul.mp3'),
  spanish: require('../../../assets/audio/spanish.mp3'),
  pakistan: require('../../../assets/audio/pakistan.mp3'),
  somalia: require('../../../assets/audio/somalia.mp3'),
  srilanka: require('../../../assets/audio/srilanka.mp3'),
  tigrinya: require('../../../assets/audio/tigrinya.mp3'),
}

const tracks: Array<Track> = [
  { key: 'english', name: 'English', flag: 'GB'},
  { key: 'arabic', name: 'عرب', flag: 'AR'},
  { key: 'eastern', name: 'عرب', flag: 'AR'},
  { key: 'russian', name: 'русский', flag: 'RU'},
  { key: 'pashto', name: 'پښتو', flag: 'AF'},
  { key: 'dari', name: 'دری', flag: 'AF'},
  { key: 'ukrainian', name: 'український', flag: 'UA'},
  { key: 'romanian', name: 'Română', flag: 'RO'},
  { key: 'albanian', name: 'shqip', flag: 'AL'},
  { key: 'peul', name: 'Poular ', flag: 'SN'},
  { key: 'spanish', name: 'Español', flag: 'ES'},
  { key: 'pakistan', name: 'اُردُو', flag: 'PK'},
  { key: 'somalia', name: 'اف سومالى', flag: 'SO'},
  { key: 'srilanka', name: 'தமிழ்', flag: 'LK'},
  { key: 'tigrinya', name: 'ትግርኛ', flag: 'ET'},
];

const getTrackSound = async (key: string): Promise<SoundObject> => {
  return Audio.Sound.createAsync(imports[key]);
}

const PitchesScreen: React.FC = () => {
  const playTrack = async (track: Track) => {
    try {
      const soundObject = getTrackSound(track.key);
      const { sound } = await soundObject;
      console.log('soundObject', soundObject);
      await sound.playAsync();
    } catch (error) {
      console.error(error);
    }
  };

  const stopTrack = async (track: Track) => {
    const soundObject = await getTrackSound(track.key);
    console.log('soundObject', soundObject);
    await soundObject.sound.stopAsync();
  };

  const pauseTrack = async (track: Track) => {
    const soundObject = await getTrackSound(track.key);
    console.log('soundObject', soundObject);
    await soundObject.sound.pauseAsync();
  };

  return (
    <Screen>
      <ScrollView>
        <View style={styles.container}>
          {tracks.map((track: Track) => (
            <Pitch
              key={track.key}
              track={track}
              play={playTrack}
              pause={pauseTrack}
              stop={stopTrack}
            />
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
};

export default PitchesScreen;
