import { EEventName } from "../constants/event";
import { events } from "./Events";
import { KeyPressListener } from "./KeyPressListener";

export class TextMessage {
    text: string;
    private onComplete: Function;
    actionListener: KeyPressListener;
    constructor(config: { speaker?: string; text: string; onComplete: Function }) {
        this.text = config.text;
        this.onComplete = config.onComplete;
        this.actionListener = new KeyPressListener("Enter", () => {
            this.done();
            this.actionListener.remove();
        });
    }

    done() {
        this.onComplete();
        this.actionListener.remove();

        events.emit(EEventName.MESSAGE_DONE);
    }
}
