import { IFileSystem } from './_interfaces/file-system.i';
import { IOrganizer } from './_interfaces/organizer.i';

export class TidyFoldersManager {

    private _fileSystem: IFileSystem;
    private _organizer: IOrganizer;

    constructor(
        fileSystem: IFileSystem,
        organizer: IOrganizer
    ) {
        if (fileSystem === null || fileSystem === undefined) {
            throw Error("Dependency 'fileSystem' was null or undefined.");
        }

        if (organizer === null || organizer === undefined) {
            throw Error("Dependency 'organizer' was null or undefined.");
        }

        this._fileSystem = fileSystem;
        this._organizer = organizer;
    }

    public organizeFolder(path: string): void {
        if (path === null || path === undefined) {
            throw Error("path cannot be null or undefined.");
        }
    }

}
