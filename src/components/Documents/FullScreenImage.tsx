import * as React from 'react';
import { Animated, Dimensions } from 'react-native';
import { PinchGestureHandler } from 'react-native-gesture-handler';
import { useShowDocument } from '../../hooks/DocumentsHooks';
import { DocumentInterface } from '../../types/Documents';
const { height } = Dimensions.get('window');

interface Props {
  document: DocumentInterface;
  pinchref: React.MutableRefObject<Animated.Value>,
  panref: React.MutableRefObject<Animated.Value>,
  translateX: Animated.Value,
  translateY: Animated.Value,
}

const FullScreenImage: React.FC<Props> = ({ document, pinchref, panref, translateX, translateY }) => {
  const { documentUrl } = useShowDocument(document.id);
  const scaleValue = new Animated.Value(1);
  scaleValue.addListener(() => {return});
  const scale = React.useRef(scaleValue).current;
  const onPinchEvent = Animated.event([{ nativeEvent: { scale } }], { useNativeDriver: true });
  
  if (!documentUrl) {
    return null;
  }

  return <PinchGestureHandler ref={pinchref} onGestureEvent={onPinchEvent} simultaneousHandlers={[panref]} onHandlerStateChange={onPinchEvent}>
    <Animated.Image
      style={{ height: height, resizeMode: 'contain', transform: [{ scale }, { translateX }, { translateY }] }}
      source={{ uri: documentUrl }} 
    />
  </PinchGestureHandler>
};

export default FullScreenImage;
