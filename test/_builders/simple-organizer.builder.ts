import { IBuilder } from './_interfaces/builder.i';
import { SimpleOrganizer } from 'tidyfolders/src/simple-organizer';

export class SimpleOrganizerBuilder implements IBuilder<SimpleOrganizer> {

    public build(): SimpleOrganizer {
        return new SimpleOrganizer();
    }

}
