// screens/RoomsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { websocketService } from '../../../services/websocket';

const RoomScreen = ({ room, onToggle }) => {
  const [isLampOn, setIsLampOn] = useState(false);

  // Listen for WebSocket updates
  useEffect(() => {
    // You could set up a listener here if you want to sync state across devices
    // This would require enhancing the websocketService to support callbacks/events
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  const toggleLamp = async () => {
    try {
      // Replace with actual IoT API call
      const newState = !isLampOn;
      
      // Handle all rooms
      if (room === 'Living Room' || room === 'Bedroom' || room === 'Kitchen') {
        websocketService.sendToggleState(newState, room);
        onToggle?.(newState); // Call the onToggle callback if provided
      } else {
        console.log(`Toggled ${room} lamp to ${newState ? 'ON' : 'OFF'} (local only)`);
      }
      
      setIsLampOn(newState);
    } catch (error) {
      console.error('Error controlling lamp:', error);
    }
  };

  const getIconName = (roomName) => {
    switch (roomName) {
      case 'Living Room':
        return 'sofa';
      case 'Bedroom':
        return 'bed';
      case 'Kitchen':
        return 'restaurant';
      default:
        return 'lightbulb';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <MaterialIcons
          name={getIconName(room)}
          size={40}
          color={isLampOn ? '#00ffff' : '#666'}
        />
        <MaterialIcons
          name={isLampOn ? 'lightbulb' : 'lightbulb-outline'}
          size={40}
          color={isLampOn ? '#00ffff' : '#666'}
        />
        <Text style={styles.roomName}>{room}</Text>
        <TouchableOpacity
          style={[styles.button, isLampOn && styles.buttonActive]}
          onPress={toggleLamp}>
          <Text style={styles.buttonText}>
            {isLampOn ? 'TURN OFF' : 'TURN ON'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  roomName: {
    color: 'white',
    fontSize: 20,
    marginVertical: 15,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonActive: {
    backgroundColor: '#00ffff',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default RoomScreen;
