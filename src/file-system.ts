///<reference path="../typings/main.d.ts"/>

import { IFileSystem } from './_interfaces/file-system.i';
import { DirectoryModel } from './directory-model';

import * as fs from 'fs';

export class FileSystem implements IFileSystem {

    public getAllDirectories(path: string): Array<DirectoryModel> {
        let files = fs.readdirSync(path).filter((file) => {
            return fs.statSync(file).isDirectory();
        });

        return files.map(f => new DirectoryModel(f));
    }

}
