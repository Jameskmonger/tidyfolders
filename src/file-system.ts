///<reference path="../typings/main.d.ts"/>

import { IFileSystem } from './_interfaces/file-system.i';
import { DirectoryModel } from './directory-model';

import * as fs from 'fs';
import * as NodePathLibrary from 'path';

export class FileSystem implements IFileSystem {

    public getAllDirectories(path: string): Array<DirectoryModel> {
        let files = fs.readdirSync(path);

        let directories = files.filter((file) => {
            let fullPath = NodePathLibrary.join(path, file);
            
            return fs.statSync(fullPath).isDirectory();
        });

        return directories.map(f => new DirectoryModel(f));
    }

}
