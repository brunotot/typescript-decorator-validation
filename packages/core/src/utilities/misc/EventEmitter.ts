export class EventEmitter {
  private readonly events: Map<string, Array<(data?: any) => void>>;

  constructor() {
    this.events = new Map();
  }

  emit(event: string, data?: any): void {
    const handlers = this.events.get(event);
    if (handlers) {
      handlers.forEach(handler => {
        handler(data);
      });
    }
  }

  on(event: string, handler: (data?: any) => void): void {
    const handlers = this.events.get(event) ?? [];
    handlers.push(handler);
    this.events.set(event, handlers);
  }

  off(event: string, handler: (data?: any) => void): void {
    const handlers = this.events.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index !== -1) {
        handlers.splice(index, 1);
      }
      if (handlers.length === 0) {
        this.events.delete(event);
      } else {
        this.events.set(event, handlers);
      }
    }
  }
}
