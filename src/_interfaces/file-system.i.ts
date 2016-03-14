import { DirectoryModel } from '../directory-model';

export interface IFileSystem {

    getAllDirectories(path: string): Array<DirectoryModel>;

}
