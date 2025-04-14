import { Animated, Pressable, StyleSheet } from 'react-native';
import { useEffect, useRef } from 'react';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface ToggleSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

export function ToggleSwitch({ value, onValueChange, disabled = false }: ToggleSwitchProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const translateX = useRef(new Animated.Value(value ? 66 : 0)).current; // Increased translation

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: value ? 66 : 0, // Increased translation
      useNativeDriver: true,
      bounciness: 4,
    }).start();
  }, [value, translateX]);

  const toggleSwitch = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  return (
    <Pressable
      onPress={toggleSwitch}
      style={[
        styles.track,
        {
          backgroundColor: value
            ? Colors[colorScheme].tint
            : Colors[colorScheme].tabIconDefault,
          opacity: disabled ? 0.5 : 1,
        },
      ]}>
      <Animated.View
        style={[
          styles.thumb,
          {
            backgroundColor: Colors[colorScheme].background,
            transform: [{ translateX }],
          },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 144, // 48 * 3
    height: 78, // 26 * 3
    borderRadius: 39, // 13 * 3
    justifyContent: 'center',
    padding: 6, // 2 * 3
  },
  thumb: {
    width: 66, // 22 * 3
    height: 66, // 22 * 3
    borderRadius: 33, // 11 * 3
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6, // Increased shadow
    },
    shadowOpacity: 0.25,
    shadowRadius: 11.52, // 3.84 * 3
    elevation: 15, // Increased elevation
  },
});
