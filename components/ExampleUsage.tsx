import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ToggleSwitch } from '@/components/ui/ToggleSwitch';
import { ThemedText } from '@/components/ThemedText';

export function ExampleUsage() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <ThemedText>Toggle Switch Example</ThemedText>
      <ToggleSwitch
        value={isEnabled}
        onValueChange={setIsEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});