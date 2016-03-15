///<reference path="../../typings/main.d.ts"/>

import { IBuilder } from './_interfaces/builder.i';
import { FileSystem } from 'tidyfolders/file-system';

import * as proxyquire from 'proxyquire';

export class FileSystemBuilder implements IBuilder<FileSystem> {

    public build(): FileSystem {
        let nodeFsStub = {
            readdirSync: (path: string) => [],
            statSync: (path: string) => {
                return {
                    isDirectory: () => {
                        return true;
                    }
                };
            }
        };

        let ProxiedFileSystem = proxyquire('tidyfolders/file-system', {'fs': nodeFsStub}).FileSystem;

        return new ProxiedFileSystem();
    }

}
