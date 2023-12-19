export declare class EventEmitter {
    private readonly events;
    constructor();
    emit(event: string, data?: any): void;
    on(event: string, handler: (data?: any) => void): void;
    off(event: string, handler: (data?: any) => void): void;
}
//# sourceMappingURL=EventEmitter.d.ts.map