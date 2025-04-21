// Toggle Message Types
export type ToggleSource = 'websocket' | 'mqtt';

export interface BaseToggleMessage {
  type: string;
  value: boolean;
  room: string;
  timestamp: string;
}

// Message sent from app to backend
export interface ToggleSwitchMessage extends BaseToggleMessage {
  type: 'TOGGLE_SWITCH';
}

// Message received from backend as update
export interface ToggleUpdateMessage extends BaseToggleMessage {
  type: 'TOGGLE_UPDATE';
  source: ToggleSource;
}

// Example usage:
const toggleMessage: ToggleSwitchMessage = {
  type: 'TOGGLE_SWITCH',
  value: true,
  room: 'Living Room',
  timestamp: new Date().toISOString()
};

const updateMessage: ToggleUpdateMessage = {
  type: 'TOGGLE_UPDATE',
  value: true,
  room: 'Living Room',
  timestamp: new Date().toISOString(),
  source: 'websocket'
};