class WebSocketService {
  private ws: WebSocket | null = null;
  private readonly url = 'ws://localhost:8081';

  connect() {
    if (!this.ws || this.ws.readyState === WebSocket.CLOSED) {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log('Connected to WebSocket');
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Received message:', data);
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      this.ws.onclose = () => {
        console.log('Disconnected from WebSocket');
        // Attempt to reconnect after 5 seconds
        setTimeout(() => this.connect(), 5000);
      };
    }
  }

  sendToggleState(value: boolean) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: 'TOGGLE_SWITCH',
        value,
        timestamp: new Date().toISOString()
      }));
    } else {
      console.warn('WebSocket is not connected');
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export const websocketService = new WebSocketService();