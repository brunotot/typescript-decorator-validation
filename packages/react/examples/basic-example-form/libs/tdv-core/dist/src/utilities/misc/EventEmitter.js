export class EventEmitter {
    constructor() {
        this.events = new Map();
    }
    emit(event, data) {
        const handlers = this.events.get(event);
        if (handlers) {
            handlers.forEach(handler => {
                handler(data);
            });
        }
    }
    on(event, handler) {
        var _a;
        const handlers = (_a = this.events.get(event)) !== null && _a !== void 0 ? _a : [];
        handlers.push(handler);
        this.events.set(event, handlers);
    }
    off(event, handler) {
        const handlers = this.events.get(event);
        if (handlers) {
            const index = handlers.indexOf(handler);
            if (index !== -1) {
                handlers.splice(index, 1);
            }
            if (handlers.length === 0) {
                this.events.delete(event);
            }
            else {
                this.events.set(event, handlers);
            }
        }
    }
}
