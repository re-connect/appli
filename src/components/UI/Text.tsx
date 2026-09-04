import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextProps } from 'react-native';
import { colors } from '../../style';

const TranslatedText: React.FC<TextProps> = props => {
  const { t } = useTranslation();
  if (!props.children) {
    return null;
  }
  const text = props.children;
  if (!(typeof text === 'string' || text instanceof String)) {
    return null;
  }
  const stringText = text as string;
  const style = props.style ?? { color: colors.darkGray };
  return (
    <Text {...props} style={style}>
      {stringText.includes(':') ? stringText : t(stringText)}
    </Text>
  );
};

export default TranslatedText;
