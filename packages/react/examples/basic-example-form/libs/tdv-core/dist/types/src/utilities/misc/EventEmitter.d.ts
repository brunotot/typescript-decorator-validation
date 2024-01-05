import TdvCoreApi from "../../index";
/**
 * Event emitter class.
 */
export declare class EventEmitter {
    #private;
    static EMPTY: TdvCoreApi.Utilities.EventEmitter;
    private readonly events;
    private readonly handlersTimeout;
    get id(): string;
    constructor(id: string);
    emit(event: string, data?: any): void;
    on(event: string, handler: (data?: any) => void): void;
    off(event: string, handler: (data?: any) => void): void;
}
//# sourceMappingURL=EventEmitter.d.ts.map