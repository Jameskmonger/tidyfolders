import { IFileSystem } from './_interfaces/file-system.i';

export class TidyFoldersManager {

    constructor(
        fileSystem: IFileSystem
    ) {
        if (fileSystem === null || fileSystem === undefined) {
            throw Error("Dependency 'fileSystem' was null or undefined.");
        }
    }

}
