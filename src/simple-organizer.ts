import { IOrganizer } from './_interfaces/organizer.i';
import { DirectoryModel } from './directory-model';

export class SimpleOrganizer implements IOrganizer {

    public getContainingDirectory(dir: DirectoryModel): string {
        return 'j';
    }

}
