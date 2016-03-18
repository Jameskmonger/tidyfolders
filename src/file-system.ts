///<reference path="../typings/main.d.ts"/>

import { IFileSystem } from './_interfaces/file-system.i';
import { DirectoryModel } from './directory-model';

import * as NodeFSLibrary from 'fs';
import * as NodePathLibrary from 'path';

export class FileSystem implements IFileSystem {

    constructor(moveDir: (target: string, into: string) => void) {
        
    }

    public getAllDirectories(path: string): Array<DirectoryModel> {
        let files = NodeFSLibrary.readdirSync(path);

        let directories = files.filter((file) => {
            let fullPath = NodePathLibrary.join(path, file);

            return NodeFSLibrary.statSync(fullPath).isDirectory();
        });

        return directories.map(f => new DirectoryModel(f));
    }

}
