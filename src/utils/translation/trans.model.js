export default class Translation {
    constructor(lang) {
        this._lang = lang;
        this.file = require(`./lang/${this._lang}.json`);
    }

    getTranslation(expression) {
        return this.file[expression];
    }
}