import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  flag: { height: 20, width: 32 },
});

interface Props {
  code: string;
}

const flags = {
    AF: require('../../images/flags/AF.png'),
    AL: require('../../images/flags/AL.png'),
    AR: require('../../images/flags/AR.png'),
    DE: require('../../images/flags/DE.png'),
    ES: require('../../images/flags/ES.png'),
    ET: require('../../images/flags/ET.png'),
    FR: require('../../images/flags/FR.png'),
    GB: require('../../images/flags/GB.png'),
    IT: require('../../images/flags/IT.png'),
    LK: require('../../images/flags/LK.png'),
    PK: require('../../images/flags/PK.png'),
    PT: require('../../images/flags/PT.png'),
    RO: require('../../images/flags/RO.png'),
    RU: require('../../images/flags/RU.png'),
    SN: require('../../images/flags/SN.png'),
    SO: require('../../images/flags/SO.png'),
    UA: require('../../images/flags/UA.png'),
  };


const Flag: React.FC<Props> = ({ code }) => {
    const flag = flags[code]; 
    if (!flag) {
        return null;
    }

    return <Image source={flag} style={styles.flag} />;
}

export default Flag;
