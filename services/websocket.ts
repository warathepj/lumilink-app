import { ToggleSwitchMessage, ToggleUpdateMessage } from '../types/toggle';

class WebSocketService {
  private ws: WebSocket | null = null;
  private isConnected: boolean = false;
  private reconnectAttempts: number = 0;
  private reconnectTimeout: NodeJS.Timeout | null = null;

  connect() {
    try {
      this.ws = new WebSocket('ws://localhost:8085');
      
      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.isConnected = true;
        this.reconnectAttempts = 0;
      };
      
      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as ToggleUpdateMessage;
          console.log('WebSocket message received:', data);
          
          if (data.type === 'TOGGLE_UPDATE') {
            console.log('Device state updated:', data.value);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
    } catch (error) {
      console.error('WebSocket connection error:', error);
    }
  }

  sendToggleState(isOn: boolean, room: string = 'Living Room') {
    if (!this.isConnected) {
      console.warn('WebSocket not connected. Attempting to connect...');
      this.connect();
      return;
    }
    
    try {
      const message: ToggleSwitchMessage = {
        type: 'TOGGLE_SWITCH',
        value: isOn,
        room: room,
        timestamp: new Date().toISOString()
      };
      
      this.ws?.send(JSON.stringify(message));
      console.log('Sent toggle state:', message);
    } catch (error) {
      console.error('Error sending WebSocket message:', error);
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
    
    this.isConnected = false;
    console.log('WebSocket disconnected');
  }
}

export const websocketService = new WebSocketService();
