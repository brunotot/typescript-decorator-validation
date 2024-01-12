var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _EventEmitter_id, _EventEmitter_asyncDelay;
/** Event emitter class. */
export class EventEmitter {
    get id() {
        return __classPrivateFieldGet(this, _EventEmitter_id, "f");
    }
    constructor(id, asyncDelay = 500) {
        _EventEmitter_id.set(this, void 0);
        _EventEmitter_asyncDelay.set(this, void 0);
        this.events = new Map();
        this.handlersTimeout = new Map();
        __classPrivateFieldSet(this, _EventEmitter_id, id, "f");
        __classPrivateFieldSet(this, _EventEmitter_asyncDelay, asyncDelay, "f");
    }
    emit(event, data) {
        const handlers = this.events.get(event);
        if (handlers) {
            handlers.forEach(handler => {
                const handlerKey = `${event}-${handler.toString()}`;
                const existingTimeout = this.handlersTimeout.get(handlerKey);
                if (existingTimeout) {
                    clearTimeout(existingTimeout);
                }
                const timeout = setTimeout(() => {
                    handler(data);
                }, __classPrivateFieldGet(this, _EventEmitter_asyncDelay, "f"));
                this.handlersTimeout.set(handlerKey, timeout);
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
                const handlerKey = `${event}-${handler.toString()}`;
                const existingTimeout = this.handlersTimeout.get(handlerKey);
                if (existingTimeout) {
                    clearTimeout(existingTimeout);
                    this.handlersTimeout.delete(handlerKey);
                }
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
_EventEmitter_id = new WeakMap(), _EventEmitter_asyncDelay = new WeakMap();
EventEmitter.EMPTY = new EventEmitter("EMPTY");
