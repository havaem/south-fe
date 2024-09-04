/* eslint-disable @typescript-eslint/no-explicit-any */

class Events {
    callbacks: {
        id: number;
        eventName: string;
        caller: any;
        callback: Function;
    }[] = [];
    nextId = 0;

    // emit event
    emit(eventName: string, value?: any) {
        this.callbacks.forEach((stored) => {
            if (stored.eventName === eventName) {
                stored.callback(value);
            }
        });
    }

    // subscribe to something happening
    on(eventName: string, caller: any, callback: Function) {
        this.nextId += 1;
        this.callbacks.push({
            id: this.nextId,
            eventName,
            caller,
            callback,
        });
        return this.nextId;
    }

    // remove the subscription
    // off(id: number) {
    // 	this.callbacks = this.callbacks.filter((stored) => stored.id !== id);
    // }
    off(eventName: string) {
        this.callbacks = this.callbacks.filter((stored) => stored.eventName !== eventName);
    }

    unsubscribe(caller: any) {
        this.callbacks = this.callbacks.filter((stored) => stored.caller !== caller);
    }
}

export const events = new Events();
