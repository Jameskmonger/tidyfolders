import { IBuilder } from './_interfaces/builder.i';
import { DirectoryModel } from 'tidyfolders/directory-model';

export class DirectoryModelBuilder implements IBuilder<DirectoryModel> {

    private _name;

    public build(): DirectoryModel {
        return new DirectoryModel(this._name);
    }

    public withName(name: string): DirectoryModelBuilder {
        this._name = name;
        return this;
    }

}
