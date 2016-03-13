import { DirectoryModel } from '../directory-model';

export interface IOrganizer {

    getContainingDirectory(dir: DirectoryModel): string;

}
