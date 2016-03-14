///<reference path="../typings/main.d.ts"/>

import * as test from 'tape';
import { SimpleOrganizer } from 'tidyfolders/simple-organizer';
import { DirectoryModel } from 'tidyfolders/directory-model';

let organizer = new SimpleOrganizer();

test('directory "james" returns "j"', t => {
    t.plan(1);

    let model = new DirectoryModel();
    model.name = 'james';

    t.equal(organizer.getContainingDirectory(model), 'j');

});
