import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AudioPlayer, createAudioPlayer, setAudioModeAsync } from 'expo-audio';
import Screen from '../../components/Screen';
import Pitch, { Track } from '../../components/User/Pitch';

const styles = StyleSheet.create({ container: { flex: 1, alignItems: 'center' } });

const imports: Record<string, number> = {
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
};

const tracks: Array<Track> = [
  { key: 'english', name: 'English', flag: 'GB' },
  { key: 'arabic', name: 'عرب', flag: 'AR' },
  { key: 'eastern', name: 'عرب', flag: 'AR' },
  { key: 'russian', name: 'русский', flag: 'RU' },
  { key: 'pashto', name: 'پښتو', flag: 'AF' },
  { key: 'dari', name: 'دری', flag: 'AF' },
  { key: 'ukrainian', name: 'український', flag: 'UA' },
  { key: 'romanian', name: 'Română', flag: 'RO' },
  { key: 'albanian', name: 'shqip', flag: 'AL' },
  { key: 'peul', name: 'Poular ', flag: 'SN' },
  { key: 'spanish', name: 'Español', flag: 'ES' },
  { key: 'pakistan', name: 'اُردُو', flag: 'PK' },
  { key: 'somalia', name: 'اف سومالى', flag: 'SO' },
  { key: 'srilanka', name: 'தமிழ்', flag: 'LK' },
  { key: 'tigrinya', name: 'ትግርኛ', flag: 'ET' },
];

const PitchesScreen: React.FC = () => {
  const playerRef = React.useRef<AudioPlayer | null>(null);
  const [currentTrack, setCurrentTrack] = React.useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);

  const releaseCurrentPlayer = React.useCallback(() => {
    if (playerRef.current) {
      playerRef.current.pause();
      playerRef.current.remove();
      playerRef.current = null;
    }
    setCurrentTrack(null);
    setIsPlaying(false);
  }, []);

  // Stop and release the player when the screen loses focus
  // (navigation back, tab switch, app backgrounding via unmount).
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        releaseCurrentPlayer();
      };
    }, [releaseCurrentPlayer]),
  );

  const playTrack = async (track: Track) => {
    try {
      releaseCurrentPlayer();
      await setAudioModeAsync({ playsInSilentMode: true });
      const player = createAudioPlayer(imports[track.key]);
      player.play();
      playerRef.current = player;
      setCurrentTrack(track);
      setIsPlaying(true);
    } catch (error) {
      setIsPlaying(false);
    }
  };

  const stopTrack = async () => {
    releaseCurrentPlayer();
  };

  const pauseTrack = async () => {
    const player = playerRef.current;
    if (!player) return;
    if (isPlaying) {
      player.pause();
      setIsPlaying(false);
    } else {
      player.play();
      setIsPlaying(true);
    }
  };

  return (
    <Screen>
      <ScrollView>
        <View style={styles.container}>
          {tracks.map((track: Track) => (
            <Pitch
              key={track.key}
              track={track}
              isStarted={currentTrack?.key === track.key}
              isPlaying={isPlaying}
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
