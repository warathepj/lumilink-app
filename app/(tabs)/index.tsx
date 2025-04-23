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

  const handleBedroomToggle = (isOn: boolean) => {
    // Create message following ToggleSwitchMessage interface
    const toggleMessage: ToggleSwitchMessage = {
      type: 'TOGGLE_SWITCH',
      value: isOn,
      room: 'Bedroom',
      timestamp: new Date().toISOString()
    };
    
    // Log the message to console
    console.log('Toggle Message:', toggleMessage);
    console.log(`Bedroom light turned ${isOn ? 'ON' : 'OFF'}`);
    websocketService.sendToggleState(isOn, 'Bedroom');
  };

  const handleKitchenToggle = (isOn: boolean) => {
    const toggleMessage: ToggleSwitchMessage = {
      type: 'TOGGLE_SWITCH',
      value: isOn,
      room: 'Kitchen',
      timestamp: new Date().toISOString()
    };
    
    console.log('Toggle Message:', toggleMessage);
    console.log(`Kitchen light turned ${isOn ? 'ON' : 'OFF'}`);
    websocketService.sendToggleState(isOn, 'Kitchen');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1a1a1a" barStyle="light-content" />
      <RoomsScreen room="Living Room" onToggle={handleLivingRoomToggle} />
      <RoomsScreen room="Bedroom" onToggle={handleBedroomToggle} />
      <RoomsScreen room="Kitchen" onToggle={handleKitchenToggle} />
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








