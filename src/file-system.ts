import { IFileSystem } from './_interfaces/file-system.i';
import { DirectoryModel } from './directory-model';

export class FileSystem implements IFileSystem {

    public getAllDirectories(path: string): Array<DirectoryModel> {
        return [];
    }

}
