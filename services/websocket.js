// WebSocket service for IoT device communication
class WebSocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectTimeout = null;
  }

  connect() {
    try {
      // If accessing the web app via localhost
      this.socket = new WebSocket('ws://localhost:8085');
      
      // OR if accessing via IP address (for testing on other devices)
      // this.socket = new WebSocket('ws://YOUR_COMPUTER_IP:8085');
      
      this.socket.onopen = () => {
        console.log('WebSocket connected');
        this.isConnected = true;
        this.reconnectAttempts = 0;
      };
      
      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('WebSocket message received:', data);
          
          // Handle different message types here
          if (data.type === 'TOGGLE_UPDATE') {
            // You can dispatch to a state management system here if needed
            console.log('Device state updated:', data.value);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
      
      this.socket.onclose = () => {
        console.log('WebSocket connection closed');
        this.isConnected = false;
        this.attemptReconnect();
      };
      
      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.isConnected = false;
      };
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
      this.attemptReconnect();
    }
  }

  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      
      this.reconnectTimeout = setTimeout(() => {
        this.connect();
      }, 3000); // Try to reconnect after 3 seconds
    } else {
      console.log('Max reconnect attempts reached');
    }
  }

  sendToggleState(isOn, room = 'Living Room') {
    if (!this.isConnected) {
      console.warn('WebSocket not connected. Attempting to connect...');
      this.connect();
      return;
    }
    
    try {
      const message = {
        type: 'TOGGLE_SWITCH',
        value: isOn,
        room: room,
        timestamp: new Date().toISOString()
      };
      
      this.socket.send(JSON.stringify(message));
      console.log('Sent toggle state:', message);
    } catch (error) {
      console.error('Error sending WebSocket message:', error);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
    
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
    
    this.isConnected = false;
    console.log('WebSocket disconnected');
  }
}

// Create a singleton instance
export const websocketService = new WebSocketService();

// Connect when the service is imported
websocketService.connect();