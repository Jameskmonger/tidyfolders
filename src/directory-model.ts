export class DirectoryModel {

    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    public getName(): string {
        return this._name;
    }

}
