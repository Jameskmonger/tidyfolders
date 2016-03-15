import { IFileSystem } from './_interfaces/file-system.i';
import { IOrganizer } from './_interfaces/organizer.i';

export class TidyFoldersManager {

    constructor(
        fileSystem: IFileSystem,
        organizer: IOrganizer
    ) {
        if (fileSystem === null || fileSystem === undefined) {
            throw Error("Dependency 'fileSystem' was null or undefined.");
        }
    }

}
