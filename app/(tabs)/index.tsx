// App.js
import * as React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import RoomsScreen from './screens/RoomsScreen';
import { ToggleSwitchMessage } from '../../types/toggle';
import { websocketService } from '../../services/websocket';

export default function TabOneScreen() {
  const handleLivingRoomToggle = (isOn: boolean) => {
    // Create message following ToggleSwitchMessage interface
    const toggleMessage: ToggleSwitchMessage = {
      type: 'TOGGLE_SWITCH',
      value: isOn,
      room: 'Living Room',
      timestamp: new Date().toISOString()
    };
    
    // Log the message to console
    console.log('Toggle Message:', toggleMessage);
    console.log(`Living Room light turned ${isOn ? 'ON' : 'OFF'}`);

    // Use the websocketService instead of direct WebSocket connection
    websocketService.sendToggleState(isOn, 'Living Room');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1a1a1a" barStyle="light-content" />
      <RoomsScreen room="Living Room" onToggle={handleLivingRoomToggle} />
      <RoomsScreen room="Bedroom" />
      <RoomsScreen room="Kitchen" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
});






