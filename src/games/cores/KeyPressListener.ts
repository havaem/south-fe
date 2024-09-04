export class KeyPressListener {
    key: string;
    callback: Function;
    keydownFunction: (event: KeyboardEvent) => void;
    keyupFunction: (event: KeyboardEvent) => void;
    constructor(key: string, callback: Function) {
        let keySafe = true;
        this.key = key;
        this.callback = callback;
        this.keydownFunction = function (event) {
            if (event.key === key) {
                if (keySafe) {
                    keySafe = false;
                    callback();
                }
            }
        };
        this.keyupFunction = function (event) {
            if (event.key === key) {
                keySafe = true;
            }
        };
        document.addEventListener("keydown", this.keydownFunction);
        document.addEventListener("keyup", this.keyupFunction);
    }
    remove() {
        document.removeEventListener("keydown", this.keydownFunction);
        document.removeEventListener("keyup", this.keyupFunction);
    }
}
