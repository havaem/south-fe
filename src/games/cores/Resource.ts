import { SPRITES } from "../assets/sprites";

export class Resource {
    toLoad: { [key: string]: string };
    images: { [key: string]: { image: HTMLImageElement; isLoaded: boolean } };
    constructor() {
        // Everything we plan to download
        this.toLoad = {
            //*HEROS
            //--Alex
            heroAlex: SPRITES.HEROS.ALEX,
            heroBob: SPRITES.HEROS.BOB,
            heroAmelia: SPRITES.HEROS.AMELIA,
            heroScott: SPRITES.HEROS.SCOTT,
            //* MAPS
            //--Dining Room
            mapDiningRoomLower: SPRITES.MAPS.DINING_ROOM.lowerSrc,
            mapDiningRoomUpper: SPRITES.MAPS.DINING_ROOM.upperSrc,
            //* SHADOWS
            shadowHero: SPRITES.SHADOWS.HERO,
        };

        // A bucket to keep all of our images
        this.images = {};

        // Load each image
        Object.keys(this.toLoad).forEach((key) => {
            const img = new Image();
            img.src = this.toLoad[key];
            this.images[key] = {
                image: img,
                isLoaded: false,
            };
            img.onload = () => {
                this.images[key].isLoaded = true;
            };
        });
    }
    getImage(src: string) {
        const key = Object.keys(this.toLoad).find((key) => this.toLoad[key] === src);
        if (!key) return null;
        return this.images[key];
    }
    pushImage(key: string, src: string) {
        if (this.images[key]) return;

        const img = new Image();
        img.src = src;
        this.images[key] = {
            image: img,
            isLoaded: false,
        };
        img.onload = () => {
            this.images[key].isLoaded = true;
        };
        this.toLoad[key] = src;
    }
}

export const resources = new Resource();
