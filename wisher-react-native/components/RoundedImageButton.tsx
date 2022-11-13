import * as React from 'react';
import {
  TextStyle,
  Text,
  Image,
  ViewStyle,
  ImageStyle,
  TextInputProps,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import colors from '../constants/colors';

const CONTAINER: ViewStyle = {
  height: 50,
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 2,
  borderColor: colors.black,
  borderRadius: 30,
  paddingHorizontal: 5,
  marginTop: 20,
};

const INPUT_LOGO_STYLE: ImageStyle = {
  height: 40,
  width: 40,
  marginRight: 5,
};
const INPUT_IMG_RADIUS: ImageStyle = {
  borderRadius: 20
}

const TEXT: TextStyle = {
  flex: 1,
  overflow: 'scroll',
  color: colors.black,
  fontSize: 16,
  //   fontFamily: '',
};

export interface RoundedImageButtonProps {
  style?: ViewStyle;
  logoStyle?: ImageStyle;
  textStyle?: TextStyle;
  text?: string;
  logo: ImageSourcePropType;
  onPress?: any;
  image?: string
}

const RoundedImageButton = React.forwardRef(function RoundedImageButton(
  props: RoundedImageButtonProps & TextInputProps,
  ref: any,
) {
  const { style, logoStyle, textStyle, text, onPress, image } = props;

  return (
    <TouchableOpacity style={[CONTAINER, style]} onPress={onPress}>
      {
        image ? <Image
          source={{ uri: image }}
          style={[INPUT_LOGO_STYLE, logoStyle, INPUT_IMG_RADIUS]}
          resizeMode="cover"
        />
          :
          <Image
            source={props.logo}
            style={[INPUT_LOGO_STYLE, logoStyle]}
            resizeMode="cover"
          />
      }
      <Text style={[TEXT, textStyle, { fontSize: 14 }]}>{text}</Text>
    </TouchableOpacity>
  );
});

export default RoundedImageButton;
