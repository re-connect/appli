import * as React from 'react';
import { Animated, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { FullScreenImageScreenProps } from '../../routing/routes/types/Document';
import DocumentContext from '../../context/DocumentContext';
import { findNestedDocument } from '../../helpers/documentsHelper';
import FullScreenImage from '../../components/Documents/FullScreenImage';
import PdfComponent from '../../components/UI/Pdf';
import FullScreenImageActions from '../../components/Documents/Components/FullScreenImageActions';

const FullScreenImageScreen: React.FC<FullScreenImageScreenProps> = ({ route }) => {
  const { id } = route.params;
  const { list } = React.useContext(DocumentContext);
  const document = findNestedDocument(!list ? [] : list, id);

  const xValue = new Animated.Value(0);
  xValue.addListener(() => {return});
  const yValue = new Animated.Value(0);
  yValue.addListener(() => {return});
  const translateX = React.useRef(xValue).current;
  const translateY = React.useRef(yValue).current;
  const panref = React.useRef(null);
  const pinchref = React.useRef(null);
  const onPanEvent = Animated.event([{ nativeEvent: { translationX: translateX, translationY: translateY } }], { useNativeDriver: true });

  if (!document) {
    return null;
  }

  if (document.extension === 'pdf') {
    return <View style={{ flex: 1 }}>
      <FullScreenImageActions document={document} />
      {document.url && <PdfComponent uri={document.url} />}
    </View>
  }

  return (
    <PanGestureHandler
      onGestureEvent={onPanEvent}
      ref={panref}
      simultaneousHandlers={[pinchref]}
      failOffsetX={[-1000, 1000]}
      shouldCancelWhenOutside      
    >
      <Animated.View>
        <FullScreenImageActions document={document} />
        <FullScreenImage document={document} pinchref={pinchref} panref={panref} translateX={translateX} translateY={translateY} />
      </Animated.View>
    </PanGestureHandler>

  );
};

export default FullScreenImageScreen;
