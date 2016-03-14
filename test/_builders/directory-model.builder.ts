import { DirectoryModel } from 'tidyfolders/directory-model';

export class DirectoryModelBuilder {

    private _name;

    public build(): DirectoryModel {
        return new DirectoryModel();
    }

    public withName(name: string): DirectoryModelBuilder {
        this._name = name;
        return this;
    }

}
