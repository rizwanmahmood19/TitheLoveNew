import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons,AntDesign } from '@expo/vector-icons';

import Colors from '../../constant/Colors';

const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons,AntDesign}
      iconSize={23}
      color={Colors.white}
    />
  );
};

export default CustomHeaderButton;
