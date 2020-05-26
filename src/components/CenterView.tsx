import React from 'react';
import { View } from 'react-native';

interface CenterViewProps {}

export const CenterView: React.FC<CenterViewProps> = ({ children }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </View>
  );
};
