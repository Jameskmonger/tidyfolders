import { IBuilder } from './_interfaces/builder.i';
import { DirectoryModel } from 'tidyfolders/directory-model';

export class DirectoryModelBuilder implements IBuilder<DirectoryModel> {

    private _name;

    public build(): DirectoryModel {
        let model = new DirectoryModel();

        model.name = this._name;

        return model;
    }

    public withName(name: string): DirectoryModelBuilder {
        this._name = name;
        return this;
    }

}
