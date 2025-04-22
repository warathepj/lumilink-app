class WebSocketService {
  private ws: WebSocket | null = null;
  private isConnected: boolean = false;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private reconnectAttempts: number = 0;
  private readonly MAX_RECONNECT_ATTEMPTS = 5;

  connect() {
    try {
      // Change port from 8085 to 8086 to connect to test server
      this.ws = new WebSocket('ws://localhost:8086');
      
      this.ws.onopen = () => {
        console.log('WebSocket connected to test server');
        this.isConnected = true;
        this.reconnectAttempts = 0;
      };
      
      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('WebSocket message received:', data);
          
          if (data.type === 'TOGGLE_UPDATE') {
            console.log('Device state updated:', data.value);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.ws.onclose = () => {
        this.isConnected = false;
        console.log('WebSocket connection closed');
        this.attemptReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.isConnected = false;
      };
    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
      this.isConnected = false;
      this.attemptReconnect();
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.MAX_RECONNECT_ATTEMPTS) {
      this.reconnectTimeout = setTimeout(() => {
        console.log('Attempting to reconnect...');
        this.reconnectAttempts++;
        this.connect();
      }, 2000);
    }
  }

  sendToggleState(isOn: boolean, room: string = 'Living Room') {
    if (!this.isConnected || !this.ws) {
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
      
      this.ws.send(JSON.stringify(message));
      console.log('Sent toggle state to test server:', message);
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

// Create a singleton instance
export const websocketService = new WebSocketService();

// Connect when the service is imported
websocketService.connect();

