/** Event emitter class. */
export declare class EventEmitter {
    #private;
    static EMPTY: EventEmitter;
    private readonly events;
    private readonly handlersTimeout;
    get id(): string;
    constructor(id: string, asyncDelay?: number);
    emit(event: string, data?: any): void;
    on(event: string, handler: (data?: any) => void): void;
    off(event: string, handler: (data?: any) => void): void;
}
//# sourceMappingURL=EventEmitter.d.ts.map