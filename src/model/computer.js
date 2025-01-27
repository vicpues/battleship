import Player from "./player";

export default class Computer extends Player {
    constructor(...args) {
        super(...args);
    }

    get isComputer() {
        return true;
    }
}
