///<reference path="../typings/main.d.ts"/>

import { SimpleOrganizer } from 'tidyfolders/simple-organizer';
import { DirectoryModel } from 'tidyfolders/directory-model';

import * as test from 'tape';
import { DirectoryModelBuilder } from './_builders/directory-model.builder';

test('directory "james" returns "j"', t => {
    let directoryName = 'james';
    let expectedContainingDirectory = 'j';

    t.plan(1);

    let organizer = new SimpleOrganizer();
    let model = new DirectoryModelBuilder().withName(directoryName).build();

    t.equal(organizer.getContainingDirectory(model), expectedContainingDirectory);
});

test('directory "JAMES" returns "j"', t => {
    let directoryName = 'JAMES';
    let expectedContainingDirectory = 'j';

    t.plan(1);

    let organizer = new SimpleOrganizer();
    let model = new DirectoryModelBuilder().withName(directoryName).build();

    t.equal(organizer.getContainingDirectory(model), expectedContainingDirectory);
});

test('directory "apple" returns "a"', t => {
    let directoryName = 'apple';
    let expectedContainingDirectory = 'a';

    t.plan(1);

    let organizer = new SimpleOrganizer();
    let model = new DirectoryModelBuilder().withName(directoryName).build();

    t.equal(organizer.getContainingDirectory(model), expectedContainingDirectory);
});

test('directory "APPLE" returns "a"', t => {
    let directoryName = 'APPLE';
    let expectedContainingDirectory = 'a';

    t.plan(1);

    let organizer = new SimpleOrganizer();
    let model = new DirectoryModelBuilder().withName(directoryName).build();

    t.equal(organizer.getContainingDirectory(model), expectedContainingDirectory);
});
