import { DirectoryModel } from '../directory-model';

export interface IFileSystem {

    moveDirectory(directory: DirectoryModel, containingFolder: string): void;

    getAllDirectories(path: string): Array<DirectoryModel>;

}
