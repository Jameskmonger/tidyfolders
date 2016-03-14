///<reference path="../typings/main.d.ts"/>

import { SimpleOrganizer } from 'tidyfolders/simple-organizer';
import { DirectoryModel } from 'tidyfolders/directory-model';

import * as test from 'tape';
import { DirectoryModelBuilder } from './_builders/directory-model.builder';

test('directory "james" returns "j"', t => {
    let directoryName = 'james';

    t.plan(1);

    let organizer = new SimpleOrganizer();
    let model = new DirectoryModelBuilder().withName(directoryName).build();

    t.equal(organizer.getContainingDirectory(model), 'j');
});

test('directory "JAMES" returns "j"', t => {
    let directoryName = 'JAMES';

    t.plan(1);

    let organizer = new SimpleOrganizer();
    let model = new DirectoryModelBuilder().withName(directoryName).build();

    t.equal(organizer.getContainingDirectory(model), 'j');
});
